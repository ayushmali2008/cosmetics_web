const express = require("express");

const orderController = require("../controllers/order.controller");
const asyncHandler = require("../middleware/asyncHandler");
const protect = require("../middleware/auth.middleware");
const adminOnly = require("../middleware/admin.middleware");

const router = express.Router();

router.get(
  "/admin/all",
  protect,
  adminOnly,
  asyncHandler(orderController.getAllOrders),
);

router.patch(
  "/admin/:id/status",
  protect,
  adminOnly,
  asyncHandler(orderController.updateOrderStatus),
);

router.post("/", protect, asyncHandler(orderController.createOrder));

router.get("/my-orders", protect, asyncHandler(orderController.getMyOrders));

router.get("/:id", protect, asyncHandler(orderController.getOrderById));

router.patch("/:id/cancel", protect, asyncHandler(orderController.cancelOrder));

module.exports = router;
