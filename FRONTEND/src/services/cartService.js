/**
 * Cart Service
 * Handles shopping cart operations
 */

/**
 * Get cart items from localStorage
 * @returns {Array} - Cart items
 */
const getCartItemId = (item = {}) => item.productId || item._id || item.id;

const normalizeCartItem = (item = {}) => {
  const id = getCartItemId(item);
  return {
    ...item,
    id,
    productId: item.productId || id,
    _id: item._id || id,
  };
};

export const getCart = () => {
  try {
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    return Array.isArray(cart) ? cart.map(normalizeCartItem) : [];
  } catch {
    return [];
  }
};

/**
 * Add product to cart
 * @param {object} product - Product to add
 * @returns {Array} - Updated cart
 */
export const addToCart = (product) => {
  const cart = getCart();
  const productId = product?._id || product?.id;
  const existingItem = cart.find((item) => getCartItemId(item) === productId);

  if (existingItem) {
    existingItem.quantity += 1;
  } else {
    cart.push({
      ...product,
      id: productId,
      productId,
      _id: productId,
      quantity: 1,
    });
  }

  localStorage.setItem("cart", JSON.stringify(cart));
  return cart;
};

/**
 * Remove product from cart
 * @param {number} productId - Product ID to remove
 * @returns {Array} - Updated cart
 */
export const removeFromCart = (productId) => {
  let cart = getCart();
  cart = cart.filter((item) => getCartItemId(item) !== productId);
  localStorage.setItem("cart", JSON.stringify(cart));
  return cart;
};

/**
 * Update product quantity in cart
 * @param {number} productId - Product ID
 * @param {number} quantity - New quantity
 * @returns {Array} - Updated cart
 */
export const updateQuantity = (productId, quantity) => {
  const cart = getCart();
  const item = cart.find((entry) => getCartItemId(entry) === productId);

  if (item) {
    if (quantity <= 0) {
      return removeFromCart(productId);
    }
    item.quantity = quantity;
  }

  localStorage.setItem("cart", JSON.stringify(cart));
  return cart;
};

/**
 * Clear entire cart
 * @returns {Array} - Empty cart
 */
export const clearCart = () => {
  localStorage.setItem("cart", JSON.stringify([]));
  return [];
};

/**
 * Get cart total
 * @returns {number} - Total price
 */
export const getCartTotal = () => {
  const cart = getCart();
  return cart.reduce((total, item) => total + item.price * item.quantity, 0);
};

/**
 * Get cart item count
 * @returns {number} - Total items
 */
export const getCartCount = () => {
  const cart = getCart();
  return cart.reduce((count, item) => count + item.quantity, 0);
};
