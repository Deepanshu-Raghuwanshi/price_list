const express = require("express");
const productController = require("../controllers/productController");
const { authenticateToken } = require("../controllers/authController");

const router = express.Router();

// Apply authentication middleware to all product routes
router.use(authenticateToken);

// Product routes
router.get("/", productController.getAllProducts);
router.get("/:id", productController.getProductById);
router.post("/", productController.createProduct);
router.put("/:id", productController.updateProduct);
router.delete("/:id", productController.deleteProduct);

module.exports = router;
