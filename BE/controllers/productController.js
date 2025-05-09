const Product = require("../models/Product");

// Get all products
exports.getAllProducts = async (req, res) => {
  try {
    const products = await Product.getAll();
    res.json({
      success: true,
      data: products,
    });
  } catch (error) {
    console.error("Error getting products:", error);
    res.status(500).json({
      success: false,
      message: "Failed to retrieve products",
    });
  }
};

// Get product by ID
exports.getProductById = async (req, res) => {
  try {
    const { id } = req.params;
    const product = await Product.getById(id);

    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }

    res.json({
      success: true,
      data: product,
    });
  } catch (error) {
    console.error("Error getting product:", error);
    res.status(500).json({
      success: false,
      message: "Failed to retrieve product",
    });
  }
};

// Create new product
exports.createProduct = async (req, res) => {
  try {
    const {
      article_number,
      name,
      in_price,
      price,
      unit,
      in_stock,
      description,
    } = req.body;

    // Validate required fields
    if (!article_number || !name || !price || !unit) {
      return res.status(400).json({
        success: false,
        message: "Article number, name, price, and unit are required",
      });
    }

    const productData = {
      article_number,
      name,
      in_price: in_price || 0,
      price,
      unit,
      in_stock: in_stock || 0,
      description: description || "",
    };

    const newProduct = await Product.create(productData);

    res.status(201).json({
      success: true,
      data: newProduct,
    });
  } catch (error) {
    console.error("Error creating product:", error);
    res.status(500).json({
      success: false,
      message: "Failed to create product",
    });
  }
};

// Update product
exports.updateProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const {
      article_number,
      name,
      in_price,
      price,
      unit,
      in_stock,
      description,
    } = req.body;

    // Check if product exists
    const existingProduct = await Product.getById(id);
    if (!existingProduct) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }

    // Validate required fields
    if (!article_number || !name || !price || !unit) {
      return res.status(400).json({
        success: false,
        message: "Article number, name, price, and unit are required",
      });
    }

    const productData = {
      article_number,
      name,
      in_price: in_price || 0,
      price,
      unit,
      in_stock: in_stock || 0,
      description: description || "",
    };

    const updatedProduct = await Product.update(id, productData);

    res.json({
      success: true,
      data: updatedProduct,
    });
  } catch (error) {
    console.error("Error updating product:", error);
    res.status(500).json({
      success: false,
      message: "Failed to update product",
    });
  }
};

// Delete product
exports.deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;

    // Check if product exists
    const existingProduct = await Product.getById(id);
    if (!existingProduct) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }

    await Product.delete(id);

    res.json({
      success: true,
      message: "Product deleted successfully",
    });
  } catch (error) {
    console.error("Error deleting product:", error);
    res.status(500).json({
      success: false,
      message: "Failed to delete product",
    });
  }
};
