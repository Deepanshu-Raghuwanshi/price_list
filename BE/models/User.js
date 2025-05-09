const { Pool } = require("pg");
const bcrypt = require("bcrypt");
require("dotenv").config();

const pool = new Pool({
  connectionString: process.env.DB_CONNECTION_STRING,
  ssl: {
    rejectUnauthorized: false,
  },
});

class User {
  static async createTable() {
    const createTableQuery = `
      CREATE TABLE IF NOT EXISTS users (
        id SERIAL PRIMARY KEY,
        username VARCHAR(100) UNIQUE NOT NULL,
        password VARCHAR(255) NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `;

    try {
      await pool.query(createTableQuery);
      console.log("Users table created successfully");
    } catch (error) {
      console.error("Error creating users table:", error);
      throw error;
    }
  }

  static async findByUsername(username) {
    try {
      const query = "SELECT * FROM users WHERE username = $1";
      const { rows } = await pool.query(query, [username]);
      return rows[0];
    } catch (error) {
      console.error("Error finding user:", error);
      throw error;
    }
  }

  static async create(username, password) {
    try {
      // Hash the password
      const saltRounds = 10;
      const hashedPassword = await bcrypt.hash(password, saltRounds);

      const query =
        "INSERT INTO users (username, password) VALUES ($1, $2) RETURNING *";
      const { rows } = await pool.query(query, [username, hashedPassword]);
      return rows[0];
    } catch (error) {
      console.error("Error creating user:", error);
      throw error;
    }
  }

  static async validatePassword(user, password) {
    return bcrypt.compare(password, user.password);
  }
}

module.exports = User;
