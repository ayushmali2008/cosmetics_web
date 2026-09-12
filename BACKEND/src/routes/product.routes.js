const express = require("express");

const productController = require("../controllers/product.controller");
const validateProduct = require("../validators/product.validator");
const asyncHandler = require("../middleware/asyncHandler");
const upload = require("../middleware/upload.middleware");

const protect = require("../middleware/auth.middleware");
const adminOnly = require("../middleware/admin.middleware");

const router = express.Router();

// Admin only
router.post(
  "/",
  protect,
  adminOnly,
  upload.single("image"),
  validateProduct,
  asyncHandler(productController.createProduct)
);

// Public
router.get(
  "/",
  asyncHandler(productController.getProducts)
);

router.get(
  "/:id",
  asyncHandler(productController.getProductById)
);

// Admin only
router.put(
  "/:id",
  protect,
  adminOnly,
  upload.single("image"),
  validateProduct,
  asyncHandler(productController.updateProduct)
);

router.delete(
  "/:id",
  protect,
  adminOnly,
  asyncHandler(productController.deleteProduct)
);

module.exports = router;