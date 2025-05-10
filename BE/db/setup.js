const User = require("../models/User");
const Product = require("../models/Product");
const Translation = require("../models/Translation");

async function seedSampleProducts() {
  try {
    // Check if products already exist
    const existingProducts = await Product.getAll();

    console.log("Creating 30 sample products...");

    // Sample product categories and names
    const categories = [
      "Electronics",
      "Office Supplies",
      "Furniture",
      "Tools",
      "Kitchen",
    ];
    const productTypes = [
      ["Laptop", "Smartphone", "Tablet", "Monitor", "Keyboard", "Mouse"],
      ["Pen", "Notebook", "Stapler", "Paper", "Folder", "Binder"],
      ["Chair", "Desk", "Bookshelf", "Cabinet", "Table", "Sofa"],
      ["Hammer", "Screwdriver", "Drill", "Saw", "Wrench", "Pliers"],
      ["Blender", "Toaster", "Microwave", "Kettle", "Mixer", "Oven"],
    ];

    const units = ["pcs", "box", "set", "kg", "m"];

    // Create 30 sample products
    for (let i = 1; i <= 30; i++) {
      const categoryIndex = Math.floor(Math.random() * categories.length);
      const category = categories[categoryIndex];
      const productTypeList = productTypes[categoryIndex];
      const productType =
        productTypeList[Math.floor(Math.random() * productTypeList.length)];

      const articleNumber = `ART-${category.substring(0, 3).toUpperCase()}-${
        1000 + i
      }`;
      const name = `${category} ${productType} ${i}`;
      const inPrice = parseFloat((Math.random() * 500 + 50).toFixed(2));
      const price = parseFloat(
        (inPrice * (1 + Math.random() * 0.5 + 0.2)).toFixed(2)
      ); // 20-70% markup
      const unit = units[Math.floor(Math.random() * units.length)];
      const inStock = Math.floor(Math.random() * 100);
      const description = `High-quality ${productType.toLowerCase()} for ${category.toLowerCase()} use. Product ID: ${i}`;

      await Product.create({
        article_number: articleNumber,
        name,
        in_price: inPrice,
        price,
        unit,
        in_stock: inStock,
        description,
      });
    }

    console.log("Successfully created 30 sample products");
  } catch (error) {
    console.error("Error creating sample products:", error);
    throw error;
  }
}

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

    // Seed 30 sample products
    await seedSampleProducts();

    console.log("Database setup completed successfully");
  } catch (error) {
    console.error("Database setup failed:", error);
    process.exit(1);
  }
}

module.exports = setupDatabase;
