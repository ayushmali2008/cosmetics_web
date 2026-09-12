const orderService = require("../services/order.service");

const createOrder = async (req, res) => {
  const order = await orderService.createOrder(req.user.id, req.body);

  res.status(201).json({
    success: true,
    message: "Order placed successfully",
    data: order,
  });
};

const getMyOrders = async (req, res) => {
  const orders = await orderService.getMyOrders(req.user.id);

  res.status(200).json({
    success: true,
    message: "Orders fetched successfully",
    data: orders,
  });
};

const getOrderById = async (req, res) => {
  const order = await orderService.getOrderById(
    req.params.id,
    req.user.id,
    req.user.role === "admin",
  );

  res.status(200).json({
    success: true,
    message: "Order fetched successfully",
    data: order,
  });
};

const cancelOrder = async (req, res) => {
  const order = await orderService.cancelOrder(req.user.id, req.params.id);

  res.status(200).json({
    success: true,
    message: "Order cancelled successfully",
    data: order,
  });
};

const getAllOrders = async (req, res) => {
  const orders = await orderService.getAllOrders();

  res.status(200).json({
    success: true,
    message: "All orders fetched successfully",
    data: orders,
  });
};

const updateOrderStatus = async (req, res) => {
  const order = await orderService.updateOrderStatus(
    req.params.id,
    req.body.status,
  );

  res.status(200).json({
    success: true,
    message: "Order status updated successfully",
    data: order,
  });
};

module.exports = {
  createOrder,
  getMyOrders,
  getOrderById,
  cancelOrder,
  getAllOrders,
  updateOrderStatus,
};
