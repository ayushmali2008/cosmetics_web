const authService = require("../services/auth.service");

const register = async (req, res) => {
  const result = await authService.registerUser(req.body);
  res.status(201).json({
    success: true,
    message: "User registered successfully",
    data: result,
  });
};

const login = async (req, res) => {
  const result = await authService.loginUser(req.body);
  res.status(200).json({
    success: true,
    message: "Login successful",
    data: result,
  });
};

const updateProfile = async (req, res) => {
  const result = await authService.updateProfile(req.user.id, req.body);
  res.status(200).json({
    success: true,
    message: "Profile updated successfully",
    data: result,
  });
};

module.exports = {
  register,
  login,
  updateProfile,
};