const mongoose = require("mongoose");
const Product = require("../models/product.model");
const AppError = require("../utils/AppError");

const createProduct = async (productData) => {
  return await Product.create(productData);
};

const getProducts = async (queryParams) => {
  const {
    search,
    category,
    brand,
    minPrice,
    maxPrice,
    sort,
    page = 1,
    limit = 10,
  } = queryParams;

  // -----------------------------
  // FILTER
  // -----------------------------

  const filter = {};

  // Search by name or brand
  if (search) {
    filter.$or = [
      {
        name: {
          $regex: search,
          $options: "i",
        },
      },
      {
        brand: {
          $regex: search,
          $options: "i",
        },
      },
    ];
  }

  // Category filter
  if (category) {
    filter.category = {
      $regex: category,
      $options: "i",
    };
  }

  // Brand filter
  if (brand) {
    filter.brand = {
      $regex: brand,
      $options: "i",
    };
  }

  // Price filter
  if (minPrice !== undefined || maxPrice !== undefined) {
    filter.price = {};

    if (minPrice !== undefined) {
      filter.price.$gte = Number(minPrice);
    }

    if (maxPrice !== undefined) {
      filter.price.$lte = Number(maxPrice);
    }
  }

  // -----------------------------
  // PAGINATION
  // -----------------------------

  const currentPage = Math.max(Number(page), 1);
  const itemsPerPage = Math.min(Math.max(Number(limit), 1), 100);

  const skip = (currentPage - 1) * itemsPerPage;

  // -----------------------------
  // SORT
  // -----------------------------

  let sortOption = {
    createdAt: -1,
  };

  if (sort === "price_asc") {
    sortOption = {
      price: 1,
    };
  }

  if (sort === "price_desc") {
    sortOption = {
      price: -1,
    };
  }

  if (sort === "name_asc") {
    sortOption = {
      name: 1,
    };
  }

  if (sort === "name_desc") {
    sortOption = {
      name: -1,
    };
  }

  // -----------------------------
  // DATABASE QUERY
  // -----------------------------

  const products = await Product.find(filter)
    .sort(sortOption)
    .skip(skip)
    .limit(itemsPerPage);

  // Total products
  const totalProducts = await Product.countDocuments(filter);

  const totalPages = Math.ceil(totalProducts / itemsPerPage);

  return {
    products,
    pagination: {
      currentPage,
      itemsPerPage,
      totalProducts,
      totalPages,
    },
  };
};

const getProductById = async (productId) => {
  if (!mongoose.Types.ObjectId.isValid(productId)) {
    throw new AppError("Invalid product ID", 400);
  }

  const product = await Product.findById(productId);

  if (!product) {
    throw new AppError("Product not found", 404);
  }

  return product;
};

const updateProduct = async (productId, productData) => {
  if (!mongoose.Types.ObjectId.isValid(productId)) {
    throw new AppError("Invalid product ID", 400);
  }

  const product = await Product.findByIdAndUpdate(
    productId,
    productData,
    {
      new: true,
      runValidators: true,
    }
  );

  if (!product) {
    throw new AppError("Product not found", 404);
  }

  return product;
};

const deleteProduct = async (productId) => {
  if (!mongoose.Types.ObjectId.isValid(productId)) {
    throw new AppError("Invalid product ID", 400);
  }

  const product = await Product.findByIdAndDelete(productId);

  if (!product) {
    throw new AppError("Product not found", 404);
  }

  return product;
};

module.exports = {
  createProduct,
  getProducts,
  getProductById,
  updateProduct,
  deleteProduct,
};