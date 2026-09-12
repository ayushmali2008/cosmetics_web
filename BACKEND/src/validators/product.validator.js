const validateProduct = (req, res, next) => {
  const isUpdate = req.method === "PUT" || req.method === "PATCH";

  const {
    name,
    brand,
    description,
    price,
    originalPrice,
    category,
  } = req.body;

  if (
    !name ||
    !brand ||
    !description ||
    !category
  ) {
    return res.status(400).json({
      success: false,
      message: "Required product fields are missing",
    });
  }

  // Image is required only when creating a new product, not on update
  if (!isUpdate && !req.file) {
    return res.status(400).json({
      success: false,
      message: "Product image is required",
    });
  }

  if (price === undefined || Number(price) < 0) {
    return res.status(400).json({
      success: false,
      message: "Price must be a valid number",
    });
  }

  if (
    originalPrice === undefined ||
    Number(originalPrice) < 0
  ) {
    return res.status(400).json({
      success: false,
      message: "Original price must be a valid number",
    });
  }

  next();
};

module.exports = validateProduct;