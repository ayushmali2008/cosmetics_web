const bcrypt = require("bcryptjs");
const dotenv = require("dotenv");

const connectDB = require("../config/db");
const User = require("../models/user.model");

dotenv.config();

const createAdmin = async () => {
  try {
    await connectDB();

    const adminEmail = "admin@gmail.com";
    const adminPassword = "Admin@123";

    const existingAdmin = await User.findOne({
      email: adminEmail,
    });

    if (existingAdmin) {
      if (existingAdmin.role === "admin") {
        console.log("Admin already exists.");
        process.exit(0);
      }

      existingAdmin.role = "admin";
      await existingAdmin.save();

      console.log("Existing user promoted to admin.");
      process.exit(0);
    }

    const hashedPassword = await bcrypt.hash(adminPassword, 12);

    const admin = await User.create({
      name: "Admin",
      email: adminEmail,
      password: hashedPassword,
      role: "admin",
    });

    console.log("Admin created successfully.");
    console.log("Email:", admin.email);
    console.log("Password:", adminPassword);

    process.exit(0);
  } catch (error) {
    console.error("Failed to create admin:", error.message);
    process.exit(1);
  }
};

createAdmin();

    
// 