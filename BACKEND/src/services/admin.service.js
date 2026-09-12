const User = require("../models/user.model");
const AppError = require("../utils/AppError");

const getAllUsers = async () => {
  const users = await User.find()
    .select("-password")
    .sort({ createdAt: -1 });

  return users;
};

const promoteUserToAdmin = async (userId) => {
  const user = await User.findById(userId);

  if (!user) {
    throw new AppError("User not found", 404);
  }

  if (user.role === "admin") {
    throw new AppError("User is already an admin", 400);
  }

  user.role = "admin";
  await user.save();

  return {
    id: user._id,
    name: user.name,
    email: user.email,
    role: user.role,
  };
};

const removeAdminRole = async (userId) => {
  const user = await User.findById(userId);

  if (!user) {
    throw new AppError("User not found", 404);
  }

  if (user.role !== "admin") {
    throw new AppError("User is not an admin", 400);
  }

  user.role = "user";
  await user.save();

  return {
    id: user._id,
    name: user.name,
    email: user.email,
    role: user.role,
  };
};

module.exports = {
  getAllUsers,
  promoteUserToAdmin,
  removeAdminRole,
};