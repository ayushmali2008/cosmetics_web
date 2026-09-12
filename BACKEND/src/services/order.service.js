const mongoose = require("mongoose");

const Order = require("../models/order.model");
const Product = require("../models/product.model");
const User = require("../models/user.model");
const { sendOrderConfirmationEmail } = require("./email.service");
const AppError = require("../utils/AppError");

const VALID_COUPONS = {
  SAVE10: {
    type: "percent",
    value: 10,
    minOrder: 50,
  },

  SAVE20: {
    type: "percent",
    value: 20,
    minOrder: 100,
  },

  FLAT50: {
    type: "flat",
    value: 50,
    minOrder: 200,
  },

  FIRST25: {
    type: "percent",
    value: 25,
    minOrder: 0,
  },
};

const VALID_STATUSES = [
  "pending",
  "confirmed",
  "shipped",
  "delivered",
  "cancelled",
];

/* =========================================================
   COUPON HELPERS
========================================================= */

const normalizeCoupon = (couponCode) => {
  if (!couponCode) {
    return {
      couponCode: null,
      discount: 0,
    };
  }

  const normalized = String(couponCode)
    .trim()
    .toUpperCase();

  if (!VALID_COUPONS[normalized]) {
    throw new AppError("Invalid coupon code", 400);
  }

  return {
    couponCode: normalized,
    rule: VALID_COUPONS[normalized],
  };
};

const calculateCouponDiscount = (subtotal, couponCode) => {
  const normalized = normalizeCoupon(couponCode);

  if (!normalized.couponCode) {
    return 0;
  }

  const { rule } = normalized;

  if (subtotal < rule.minOrder) {
    throw new AppError(
      `Minimum order of ₹${rule.minOrder} required for coupon ${normalized.couponCode}`,
      400
    );
  }

  if (rule.type === "flat") {
    return Number(rule.value.toFixed(2));
  }

  return Number(
    ((subtotal * rule.value) / 100).toFixed(2)
  );
};

/* =========================================================
   ORDER ITEM VALIDATION
========================================================= */

const validateOrderItems = (items) => {
  if (!Array.isArray(items) || items.length === 0) {
    throw new AppError(
      "Order must contain at least one item",
      400
    );
  }

  return items.map((item) => {
    if (!item || !item.productId) {
      throw new AppError(
        "Each item must include a valid productId",
        400
      );
    }

    const quantity = Number(item.quantity);

    if (
      !Number.isInteger(quantity) ||
      quantity <= 0 ||
      quantity > 50
    ) {
      throw new AppError(
        "Each product quantity must be a valid integer between 1 and 50",
        400
      );
    }

    if (
      !mongoose.Types.ObjectId.isValid(item.productId)
    ) {
      throw new AppError(
        "Invalid product ID",
        400
      );
    }

    return {
      productId: item.productId,
      quantity,
    };
  });
};

/* =========================================================
   CREATE ORDER
========================================================= */

const createOrder = async (
  userId,
  { items, couponCode }
) => {
  // Validate user ID
  if (!mongoose.Types.ObjectId.isValid(userId)) {
    throw new AppError(
      "Invalid user ID",
      400
    );
  }

  // Validate order items
  const validatedItems = validateOrderItems(items);

  const productIds = validatedItems.map(
    (item) => item.productId
  );

  // Get products from database
  const products = await Product.find({
    _id: {
      $in: productIds,
    },
  });

  const productMap = new Map(
    products.map((product) => [
      String(product._id),
      product,
    ])
  );

  // Check all products exist
  if (products.length !== productIds.length) {
    throw new AppError(
      "One or more products were not found",
      404
    );
  }

  /* =====================================================
     CALCULATE SUBTOTAL
  ===================================================== */

  let subtotal = 0;

  for (const item of validatedItems) {
    const product = productMap.get(
      String(item.productId)
    );

    if (!product) {
      throw new AppError(
        "Product not found",
        404
      );
    }

    // Check stock
    if (product.stock < item.quantity) {
      throw new AppError(
        `Insufficient stock for ${product.name}`,
        400
      );
    }

    const itemTotal = Number(
      (
        product.price * item.quantity
      ).toFixed(2)
    );

    subtotal += itemTotal;
  }

  subtotal = Number(
    subtotal.toFixed(2)
  );

  /* =====================================================
     DELIVERY FEE
  ===================================================== */

  const deliveryFee =
    subtotal > 100 ? 0 : 5;

  /* =====================================================
     DISCOUNT
  ===================================================== */

  const discount =
    calculateCouponDiscount(
      subtotal,
      couponCode
    );

  /* =====================================================
     TOTAL
  ===================================================== */

  const total = Number(
    (
      subtotal -
      discount +
      deliveryFee
    ).toFixed(2)
  );

  /* =====================================================
     CREATE ORDER ITEMS SNAPSHOT
  ===================================================== */

  const orderItems = validatedItems.map(
    (item) => {
      const product = productMap.get(
        String(item.productId)
      );

      const itemTotal = Number(
        (
          product.price * item.quantity
        ).toFixed(2)
      );

      return {
        product: item.productId,

        name: product.name,

        image: product.image,

        price: Number(
          product.price.toFixed(2)
        ),

        quantity: item.quantity,

        itemTotal,
      };
    }
  );

  /* =====================================================
     GET USER
  ===================================================== */

  const user = await User.findById(userId);

  if (!user) {
    throw new AppError(
      "User not found",
      404
    );
  }

  /* =====================================================
     CREATE ORDER
  ===================================================== */

  const normalizedCoupon =
    normalizeCoupon(couponCode);

  const order = await Order.create({
    user: userId,

    items: orderItems,

    subtotal,

    deliveryFee,

    discount,

    total,

    couponCode:
      normalizedCoupon.couponCode,

    status: "pending",
  });

  /* =====================================================
     DECREASE STOCK
  ===================================================== */

  await Promise.all(
    validatedItems.map(
      async (item) => {
        await Product.findByIdAndUpdate(
          item.productId,
          {
            $inc: {
              stock: -item.quantity,
            },
          },
          {
            new: true,
          }
        );
      }
    )
  );

  /* =====================================================
     SEND ORDER CONFIRMATION EMAIL
     
     IMPORTANT:
     email: user.email
     
     Iska matlab jis user ne order kiya,
     uske registered email par email jayega.
  ===================================================== */

  try {
    await sendOrderConfirmationEmail({
      email: user.email,

      customerName: user.name,

      orderNumber:
        order.orderNumber || order._id,

      items: order.items,

      subtotal: order.subtotal,

      discount: order.discount,

      deliveryFee: order.deliveryFee,

      total: order.total,
    });

    console.log(
      `Order confirmation email sent to ${user.email}`
    );
  } catch (emailError) {
    /*
      Email fail hone par order fail nahi hoga.
      Order already successfully create ho chuka hai.
    */

    console.error(
      "Order email failed:",
      emailError.message
    );
  }

  return order;
};

/* =========================================================
   GET MY ORDERS
========================================================= */

const getMyOrders = async (userId) => {
  return await Order.find({
    user: userId,
  }).sort({
    createdAt: -1,
  });
};

/* =========================================================
   GET ORDER BY ID
========================================================= */

const getOrderById = async (
  orderId,
  userId,
  isAdmin = false
) => {
  if (
    !mongoose.Types.ObjectId.isValid(orderId)
  ) {
    throw new AppError(
      "Invalid order ID",
      400
    );
  }

  const order = await Order.findById(orderId)
    .populate(
      "user",
      "name email"
    )
    .populate(
      "items.product",
      "name image"
    );

  if (!order) {
    throw new AppError(
      "Order not found",
      404
    );
  }

  // Normal user can access only own order
  if (
    !isAdmin &&
    String(order.user._id) !== String(userId)
  ) {
    throw new AppError(
      "You are not allowed to access this order",
      403
    );
  }

  return order;
};

/* =========================================================
   CANCEL ORDER
========================================================= */

const cancelOrder = async (
  userId,
  orderId
) => {
  const order = await Order.findById(
    orderId
  );

  if (!order) {
    throw new AppError(
      "Order not found",
      404
    );
  }

  // Check ownership
  if (
    String(order.user) !== String(userId)
  ) {
    throw new AppError(
      "You are not allowed to cancel this order",
      403
    );
  }

  // Delivered/cancelled cannot be cancelled
  if (
    ["delivered", "cancelled"].includes(
      order.status
    )
  ) {
    throw new AppError(
      "This order cannot be cancelled",
      400
    );
  }

  // Cancel order
  order.status = "cancelled";

  await order.save();

  /* =====================================================
     RESTORE STOCK
  ===================================================== */

  await Promise.all(
    order.items.map(
      async (item) => {
        await Product.findByIdAndUpdate(
          item.product,
          {
            $inc: {
              stock: item.quantity,
            },
          }
        );
      }
    )
  );

  /*
    IMPORTANT:
    Yahan koi email nahi bheja jayega.

    Requirement:
    Sirf order place hone par email.
  */

  return order;
};

/* =========================================================
   GET ALL ORDERS - ADMIN
========================================================= */

const getAllOrders = async () => {
  return await Order.find({})
    .populate(
      "user",
      "name email"
    )
    .sort({
      createdAt: -1,
    });
};

/* =========================================================
   UPDATE ORDER STATUS - ADMIN
========================================================= */

const updateOrderStatus = async (
  orderId,
  status
) => {
  if (
    !VALID_STATUSES.includes(status)
  ) {
    throw new AppError(
      "Invalid order status",
      400
    );
  }

  const order = await Order.findById(
    orderId
  );

  if (!order) {
    throw new AppError(
      "Order not found",
      404
    );
  }

  /* =====================================================
     RESTORE STOCK IF ADMIN CANCELS ORDER
  ===================================================== */

  if (
    status === "cancelled" &&
    order.status !== "cancelled"
  ) {
    await Promise.all(
      order.items.map(
        async (item) => {
          await Product.findByIdAndUpdate(
            item.product,
            {
              $inc: {
                stock: item.quantity,
              },
            }
          );
        }
      )
    );
  }

  // Update status
  order.status = status;

  await order.save();

  /*
    IMPORTANT:
    Status change par koi email nahi jayega.

    Sirf createOrder() ke andar
    confirmation email send hota hai.
  */

  return order;
};

/* =========================================================
   EXPORTS
========================================================= */

module.exports = {
  createOrder,
  getMyOrders,
  getOrderById,
  cancelOrder,
  getAllOrders,
  updateOrderStatus,
};