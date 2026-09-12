import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { post } from "../../services/api";
import { useToast } from "../../components/common/Toast/Toast.jsx";
import "./CheckoutPage.css";

const AVAILABLE_COUPONS = [
  {
    code: "SAVE10",
    discount: 10,
    minOrder: 50,
    type: "percent",
    description: "10% off on orders above ₹50",
  },
  {
    code: "SAVE20",
    discount: 20,
    minOrder: 100,
    type: "percent",
    description: "20% off on orders above ₹100",
  },
  {
    code: "FLAT50",
    discount: 50,
    minOrder: 200,
    type: "flat",
    description: "Flat ₹50 off on orders above ₹200",
  },
  {
    code: "FIRST25",
    discount: 25,
    minOrder: 0,
    type: "percent",
    description: "25% off for first order",
  },
];

const getCart = () => {
  try {
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    return Array.isArray(cart)
      ? cart.map((item) => ({
        ...item,
        id: item.id || item._id || item.productId,
        _id: item._id || item.id || item.productId,
        productId: item.productId || item._id || item.id,
      }))
      : [];
  } catch {
    return [];
  }
};

const getCartProductId = (item) => item?.productId || item?._id || item?.id;

const isValidMongoId = (value) => /^[0-9a-fA-F]{24}$/.test(String(value || ""));

const CheckoutPage = () => {
  const navigate = useNavigate();
  const { user, isAuthenticated } = useAuth();
  const toast = useToast();
  const [cartItems, setCartItems] = useState([]);
  const [couponCode, setCouponCode] = useState("");
  const [appliedCoupon, setAppliedCoupon] = useState(null);
  const [placingOrder, setPlacingOrder] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/login");
      return;
    }

    const items = getCart();
    setCartItems(items);
  }, [isAuthenticated, navigate]);

  const subtotal = useMemo(
    () =>
      cartItems.reduce(
        (sum, item) =>
          sum + Number(item.price || 0) * Number(item.quantity || 0),
        0,
      ),
    [cartItems],
  );

  const discount = useMemo(() => {
    if (!appliedCoupon) return 0;
    if (appliedCoupon.type === "flat") {
      return appliedCoupon.discount;
    }
    return (subtotal * appliedCoupon.discount) / 100;
  }, [appliedCoupon, subtotal]);

  const deliveryFee = subtotal > 100 ? 0 : 5;
  const total = subtotal - discount + deliveryFee;

  const handleCouponApply = () => {
    const code = couponCode.trim().toUpperCase();
    if (!code) {
      toast.error("Please enter a coupon code.");
      return;
    }

    const coupon = AVAILABLE_COUPONS.find((item) => item.code === code);
    if (!coupon) {
      toast.error("Invalid coupon code.");
      return;
    }

    if (subtotal < coupon.minOrder) {
      toast.error(
        `Minimum order of ₹${coupon.minOrder} required for ${coupon.code}.`,
      );
      return;
    }

    setAppliedCoupon(coupon);
    setError("");
    setCouponCode("");
    toast.success(`Coupon ${coupon.code} applied!`);
  };

  const handlePlaceOrder = async () => {
    if (!cartItems.length) {
      setError("Your cart is empty.");
      return;
    }

    if (!isAuthenticated) {
      navigate("/login");
      return;
    }

    const invalidItem = cartItems.find(
      (item) => !isValidMongoId(getCartProductId(item)),
    );

    if (invalidItem) {
      setError(
        "Your cart contains an invalid product ID. Remove the old dummy item before checkout.",
      );
      return;
    }

    setPlacingOrder(true);
    setError("");

    try {
      const payload = {
        items: cartItems.map((item) => ({
          productId: getCartProductId(item),
          quantity: Number(item.quantity || 1),
        })),
        couponCode: appliedCoupon?.code || "",
      };

      const response = await post("/orders", payload);
      const order = response?.data || response;
      localStorage.setItem("cart", JSON.stringify([]));
      toast.success("Order placed successfully!");
      navigate("/order-confirmation", { state: { order } });
    } catch (err) {
      setError(err.message || "Unable to place order. Please try again.");
    } finally {
      setPlacingOrder(false);
    }
  };

  if (!isAuthenticated) {
    return null;
  }

  return (
    <div className="checkout-page">
      <div className="checkout-container">
        <div className="checkout-header">
          <p className="eyebrow">Checkout</p>
          <h1>Complete your order</h1>
        </div>

        <div className="checkout-grid">
          <div className="checkout-card">
            <h3>Customer details</h3>
            <div className="checkout-user-card">
              <div>
                <span className="label">Name</span>
                <strong>{user?.name || "Guest"}</strong>
              </div>
              <div>
                <span className="label">Email</span>
                <strong>{user?.email || "Not available"}</strong>
              </div>
            </div>

            <h3>Order summary</h3>
            <div className="checkout-items">
              {cartItems.length === 0 ? (
                <p className="empty-checkout">Your cart is empty.</p>
              ) : (
                cartItems.map((item) => (
                  <div
                    className="checkout-item"
                    key={item.id || item.productId}
                  >
                    <img src={item.image} alt={item.title || item.name} />
                    <div className="checkout-item-copy">
                      <strong>{item.title || item.name}</strong>
                      <span>Qty: {item.quantity}</span>
                      <span>₹{Number(item.price || 0).toFixed(2)} each</span>
                    </div>
                    <span className="checkout-item-total">
                      ₹
                      {(
                        Number(item.price || 0) * Number(item.quantity || 0)
                      ).toFixed(2)}
                    </span>
                  </div>
                ))
              )}
            </div>
          </div>

          <div className="checkout-card summary-card">
            <h3>Price summary</h3>

            <div className="summary-row">
              <span>Subtotal</span>
              <span>₹{subtotal.toFixed(2)}</span>
            </div>

            {appliedCoupon && (
              <div className="summary-row discount-row">
                <span>Discount ({appliedCoupon.code})</span>
                <span>-₹{discount.toFixed(2)}</span>
              </div>
            )}

            <div className="summary-row">
              <span>Delivery fee</span>
              <span>
                {deliveryFee === 0 ? "FREE" : `₹${deliveryFee.toFixed(2)}`}
              </span>
            </div>

            <div className="summary-divider" />

            <div className="summary-row total-row">
              <span>Total</span>
              <span>₹{total.toFixed(2)}</span>
            </div>

            <div className="coupon-box">
              <input
                type="text"
                placeholder="Enter coupon code"
                value={couponCode}
                onChange={(event) =>
                  setCouponCode(event.target.value.toUpperCase())
                }
              />
              <button type="button" onClick={handleCouponApply}>
                Apply
              </button>
            </div>

            <div className="coupon-list">
              {AVAILABLE_COUPONS.map((coupon) => (
                <button
                  type="button"
                  key={coupon.code}
                  className="coupon-chip"
                  onClick={() => {
                    if (subtotal < coupon.minOrder) {
                      toast.error(
                        `Minimum order of ₹${coupon.minOrder} required for ${coupon.code}.`,
                      );
                      return;
                    }
                    setAppliedCoupon(coupon);
                    setCouponCode("");
                    toast.success(`Coupon ${coupon.code} applied!`);
                  }}
                >
                  {coupon.code}
                </button>
              ))}
            </div>

            {error && <div className="checkout-error">{error}</div>}

            <button
              type="button"
              className="checkout-action-btn"
              onClick={handlePlaceOrder}
              disabled={placingOrder || cartItems.length === 0}
            >
              {placingOrder ? "Placing order..." : "Place Order"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;
