const productService = require("../services/product.service");

const createProduct = async (req, res) => {
  const productData = {
    ...req.body,
    image: req.file
      ? `/uploads/${req.file.filename}`
      : undefined,
  };

  const product = await productService.createProduct(productData);

  res.status(201).json({
    success: true,
    message: "Product created successfully",
    data: product,
  });
};

const getProducts = async (req, res) => {
  const result = await productService.getProducts(req.query);

  res.status(200).json({
    success: true,
    message: "Products fetched successfully",
    data: result.products,
    pagination: result.pagination,
  });
};

const getProductById = async (req, res) => {
  const product = await productService.getProductById(req.params.id);

  res.status(200).json({
    success: true,
    message: "Product fetched successfully",
    data: product,
  });
};

const updateProduct = async (req, res) => {
  const productData = {
    ...req.body,
  };

  if (req.file) {
    productData.image = `/uploads/${req.file.filename}`;
  }

  const product = await productService.updateProduct(
    req.params.id,
    productData
  );

  res.status(200).json({
    success: true,
    message: "Product updated successfully",
    data: product,
  });
};

const deleteProduct = async (req, res) => {
  const product = await productService.deleteProduct(req.params.id);

  res.status(200).json({
    success: true,
    message: "Product deleted successfully",
    data: product,
  });
};

module.exports = {
  createProduct,
  getProducts,
  getProductById,
  updateProduct,
  deleteProduct,
};