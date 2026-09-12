const adminService = require("../services/admin.service");

const getUsers = async (req, res) => {
  const users = await adminService.getAllUsers();

  res.status(200).json({
    success: true,
    data: users,
  });
};

const promoteUser = async (req, res) => {
  const user = await adminService.promoteUserToAdmin(
    req.params.id
  );

  res.status(200).json({
    success: true,
    message: "User promoted to admin successfully",
    data: user,
  });
};

const removeAdmin = async (req, res) => {
  const user = await adminService.removeAdminRole(
    req.params.id
  );

  res.status(200).json({
    success: true,
    message: "Admin role removed successfully",
    data: user,
  });
};

module.exports = {
  getUsers,
  promoteUser,
  removeAdmin,
};