const bcrypt = require("bcryptjs");
const User = require("../models/user.model");
const AppError = require("../utils/AppError");
const generateToken = require("../utils/generateToken");

const registerUser = async ({ name, email, password }) => {
  const normalizedEmail = email.toLowerCase().trim();

  const existingUser = await User.findOne({ email: normalizedEmail });
  if (existingUser) throw new AppError("Email already registered", 409);

  const hashedPassword = await bcrypt.hash(password, 12);
  const user = await User.create({
    name,
    email: normalizedEmail,
    password: hashedPassword,
  });

  const token = generateToken(user);
  return {
    token,
    user: { id: user._id, name: user.name, email: user.email, role: user.role },
  };
};

const loginUser = async ({ email, password }) => {
  const normalizedEmail = email.toLowerCase().trim();

  const user = await User.findOne({ email: normalizedEmail }).select("+password");
  if (!user) throw new AppError("Invalid email or password", 401);

  const isPasswordCorrect = await bcrypt.compare(password, user.password);
  if (!isPasswordCorrect) throw new AppError("Invalid email or password", 401);

  const token = generateToken(user);
  return {
    token,
    user: { id: user._id, name: user.name, email: user.email, role: user.role },
  };
};

/**
 * Update logged-in user's name (and optionally password).
 * Email/role changes are NOT allowed through this endpoint.
 */
const updateProfile = async (userId, { name, currentPassword, newPassword }) => {
  const user = await User.findById(userId).select("+password");
  if (!user) throw new AppError("User not found", 404);

  // Update name if provided
  if (name) {
    const trimmed = name.trim();
    if (trimmed.length < 2 || trimmed.length > 50)
      throw new AppError("Name must be between 2 and 50 characters", 400);
    user.name = trimmed;
  }

  // Update password only when both fields are supplied
  if (currentPassword || newPassword) {
    if (!currentPassword || !newPassword)
      throw new AppError("Both current and new password are required", 400);

    const isCorrect = await bcrypt.compare(currentPassword, user.password);
    if (!isCorrect) throw new AppError("Current password is incorrect", 401);

    if (newPassword.length < 6)
      throw new AppError("New password must be at least 6 characters", 400);

    user.password = await bcrypt.hash(newPassword, 12);
  }

  await user.save();

  return {
    id: user._id,
    name: user.name,
    email: user.email,
    role: user.role,
  };
};

module.exports = { registerUser, loginUser, updateProfile };