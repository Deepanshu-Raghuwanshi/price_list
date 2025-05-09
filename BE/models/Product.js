const { Pool } = require("pg");
require("dotenv").config();

const pool = new Pool({
  connectionString: process.env.DB_CONNECTION_STRING,
  ssl: {
    rejectUnauthorized: false,
  },
});

class Product {
  static async createTable() {
    const createTableQuery = `
      CREATE TABLE IF NOT EXISTS products (
        id SERIAL PRIMARY KEY,
        article_number VARCHAR(100) UNIQUE NOT NULL,
        name VARCHAR(255) NOT NULL,
        in_price DECIMAL(10, 2) NOT NULL,
        price DECIMAL(10, 2) NOT NULL,
        unit VARCHAR(50) NOT NULL,
        in_stock INTEGER NOT NULL DEFAULT 0,
        description TEXT,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `;

    try {
      await pool.query(createTableQuery);
      console.log("Products table created successfully");
    } catch (error) {
      console.error("Error creating products table:", error);
      throw error;
    }
  }

  static async getAll() {
    try {
      const query = "SELECT * FROM products ORDER BY created_at DESC";
      const { rows } = await pool.query(query);
      return rows;
    } catch (error) {
      console.error("Error getting products:", error);
      throw error;
    }
  }

  static async getById(id) {
    try {
      const query = "SELECT * FROM products WHERE id = $1";
      const { rows } = await pool.query(query, [id]);
      return rows[0];
    } catch (error) {
      console.error("Error getting product by ID:", error);
      throw error;
    }
  }

  static async create(productData) {
    try {
      const {
        article_number,
        name,
        in_price,
        price,
        unit,
        in_stock,
        description,
      } = productData;

      const query = `
        INSERT INTO products 
        (article_number, name, in_price, price, unit, in_stock, description) 
        VALUES ($1, $2, $3, $4, $5, $6, $7) 
        RETURNING *
      `;

      const values = [
        article_number,
        name,
        in_price,
        price,
        unit,
        in_stock,
        description,
      ];

      const { rows } = await pool.query(query, values);
      return rows[0];
    } catch (error) {
      console.error("Error creating product:", error);
      throw error;
    }
  }

  static async update(id, productData) {
    try {
      const {
        article_number,
        name,
        in_price,
        price,
        unit,
        in_stock,
        description,
      } = productData;

      const query = `
        UPDATE products 
        SET article_number = $1, 
            name = $2, 
            in_price = $3, 
            price = $4, 
            unit = $5, 
            in_stock = $6, 
            description = $7,
            updated_at = CURRENT_TIMESTAMP
        WHERE id = $8 
        RETURNING *
      `;

      const values = [
        article_number,
        name,
        in_price,
        price,
        unit,
        in_stock,
        description,
        id,
      ];

      const { rows } = await pool.query(query, values);
      return rows[0];
    } catch (error) {
      console.error("Error updating product:", error);
      throw error;
    }
  }

  static async delete(id) {
    try {
      const query = "DELETE FROM products WHERE id = $1 RETURNING *";
      const { rows } = await pool.query(query, [id]);
      return rows[0];
    } catch (error) {
      console.error("Error deleting product:", error);
      throw error;
    }
  }
}

module.exports = Product;
