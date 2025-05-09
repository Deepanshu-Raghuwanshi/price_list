const User = require("../models/User");
const Product = require("../models/Product");
const Translation = require("../models/Translation");

async function setupDatabase() {
  try {
    // Create tables
    await User.createTable();
    await Product.createTable();
    await Translation.createTable();

    // Create a default admin user if it doesn't exist
    const adminUsername = "admin";
    const existingAdmin = await User.findByUsername(adminUsername);

    if (!existingAdmin) {
      await User.create(adminUsername, "admin123");
      console.log("Default admin user created");
    }

    console.log("Database setup completed successfully");
  } catch (error) {
    console.error("Database setup failed:", error);
    process.exit(1);
  }
}

module.exports = setupDatabase;
