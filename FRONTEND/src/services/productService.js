/**
 * Product Service
 * Wraps all product-related API calls against the real backend.
 */

import { get } from "./api";

/**
 * Get products with optional query parameters.
 * Supported params: search, category, brand, minPrice, maxPrice, sort, page, limit
 */
export const getProducts = async (params = {}) => {
  const qs = new URLSearchParams(
    Object.entries(params).filter(([, v]) => v !== undefined && v !== ""),
  ).toString();
  return await get(`/products${qs ? `?${qs}` : ""}`);
};

/**
 * Get single product by MongoDB ObjectId
 */
export const getProductById = async (id) => {
  return await get(`/products/${id}`);
};
