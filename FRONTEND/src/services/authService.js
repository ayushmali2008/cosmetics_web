/**
 * Auth Service
 * All auth calls go through the real backend API.
 * AuthContext (accessToken + user in localStorage) is the single source of truth.
 */

import { post } from "./api";

/**
 * Register a new user
 * @param {{ name: string, email: string, password: string }} data
 * @returns {{ token: string, user: object }}
 */
export const register = async (data) => {
  const response = await post("/auth/register", data);
  return response?.data || response;
};

/**
 * Login an existing user
 * @param {{ email: string, password: string }} credentials
 * @returns {{ token: string, user: object }}
 */
export const login = async (credentials) => {
  const response = await post("/auth/login", credentials);
  return response?.data || response;
};
