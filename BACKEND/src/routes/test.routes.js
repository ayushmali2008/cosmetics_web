const express = require("express");
const AppError = require("../utils/AppError");
const asyncHandler = require("../middleware/asyncHandler");

const router = express.Router();

router.get(
  "/error",
  asyncHandler(async (req, res) => {
    throw new AppError("This is a test error", 400);
  })
);

module.exports = router;