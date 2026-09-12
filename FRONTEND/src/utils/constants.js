/**
 * Application Constants
 */

// Route Paths
export const ROUTES = {
  HOME: "/",
  PRODUCTS: "/products",
  CART: "/cart",
  BAG: "/bag",
  WISHLIST: "/wishlist",
  LOGIN: "/login",
  SIGNUP: "/signup",
  CHECKOUT: "/checkout",
  ORDER_CONFIRMATION: "/order-confirmation",
  ORDERS: "/orders",
  ORDER_DETAILS: "/orders/:id",
  ADMIN: "/admin",
  ADMIN_USERS: "/admin/users",
};

// LocalStorage Keys — must stay in sync with AuthContext
export const LOCAL_STORAGE_KEYS = {
  ACCESS_TOKEN: "accessToken",
  USER: "user",
  CART: "cart",
  WISHLIST: "wishlist",
  THEME: "theme",
};

// Valid coupon codes — must mirror VALID_COUPONS in order.service.js
export const COUPONS = {
  SAVE10: { code: "SAVE10", type: "percent", value: 10, minOrder: 50 },
  SAVE20: { code: "SAVE20", type: "percent", value: 20, minOrder: 100 },
  FLAT50: { code: "FLAT50", type: "flat", value: 50, minOrder: 200 },
  FIRST25: { code: "FIRST25", type: "percent", value: 25, minOrder: 0 },
};

// Pagination
export const ITEMS_PER_PAGE = 12;

// Theme
export const THEMES = {
  LIGHT: "light",
  DARK: "dark",
};

// Toast auto-dismiss duration in ms
export const TOAST_DURATION = 3500;
