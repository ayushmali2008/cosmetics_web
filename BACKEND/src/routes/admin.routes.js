const express = require("express");

const adminController = require("../controllers/admin.controller");
const asyncHandler = require("../middleware/asyncHandler");
const protect = require("../middleware/auth.middleware");
const adminOnly = require("../middleware/admin.middleware");

const router = express.Router();

// All admin routes require authentication + admin role
router.use(protect, adminOnly);

// Get all users
router.get(
  "/users",
  asyncHandler(adminController.getUsers)
);

// Promote user to admin
router.patch(
  "/users/:id/promote",
  asyncHandler(adminController.promoteUser)
);

// Remove admin role
router.patch(
  "/users/:id/remove-admin",
  asyncHandler(adminController.removeAdmin)
);

module.exports = router;