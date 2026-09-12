const express = require("express");
const authController = require("../controllers/auth.controllers");
const asyncHandler = require("../middleware/asyncHandler");
const { validateRegister, validateLogin } = require("../validators/auth.validator");
const protect = require("../middleware/auth.middleware");

const router = express.Router();

router.post("/register", validateRegister, asyncHandler(authController.register));
router.post("/login", validateLogin, asyncHandler(authController.login));

// Protected — logged-in user updates their own profile
router.patch("/me", protect, asyncHandler(authController.updateProfile));

module.exports = router;
