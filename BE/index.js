const express = require("express");
const { Pool } = require("pg");
const cors = require("cors");
const dns = require("dns");
require("dotenv").config();

// Import routes
const authRoutes = require("./routes/authRoutes");
const productRoutes = require("./routes/productRoutes");
const translationRoutes = require("./routes/translationRoutes");

// Import database setup
const setupDatabase = require("./db/setup");

const app = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const DB_CONNECTION_STRING = process.env.DB_CONNECTION_STRING;

const pool = new Pool({
  connectionString: DB_CONNECTION_STRING,
  ssl: {
    rejectUnauthorized: false,
  },
  connectionTimeoutMillis: 5000,
  // Additional options for pooler
  max: 20, // Maximum number of clients in the pool
  idleTimeoutMillis: 30000, // How long a client is allowed to remain idle
});

// Improved connection test with retry
async function testConnection() {
  try {
    const client = await pool.connect();
    console.log("✅ Connected to PostgreSQL via Transaction Pooler");

    // Use simple query (avoid PREPARE statements)
    const result = await client.query({
      text: "SELECT NOW()",
      rowMode: "array", // Simple format for pooler compatibility
    });

    console.log("Database time:", result.rows[0]);
    client.release();
  } catch (err) {
    console.error("Connection failed:", err);
    throw err;
  }
}

// Test connection on startup with retry
let retries = 3;
const connectWithRetry = async () => {
  while (retries > 0) {
    try {
      await testConnection();
      // Setup database tables and initial data
      await setupDatabase();
      break;
    } catch (err) {
      retries--;
      if (retries > 0) {
        console.log(`Retrying... (${retries} attempts left)`);
        await new Promise((res) => setTimeout(res, 2000));
      } else {
        console.error(
          "❌ Could not establish database connection after retries"
        );
        process.exit(1);
      }
    }
  }
};

connectWithRetry();

// API Routes
app.use("/api/auth", authRoutes);
app.use("/api/products", productRoutes);
app.use("/api/translations", translationRoutes);

// Basic route with improved error handling
app.get("/", async (req, res) => {
  try {
    // Use simple query format for pooler compatibility
    const result = await pool.query({
      text: "SELECT NOW()",
      rowMode: "array",
    });

    res.json({
      status: "success",
      time: result.rows[0],
      connectionType: "transaction-pooler",
    });
  } catch (err) {
    console.error("Query error:", err);
    res.status(503).json({
      status: "error",
      error: "Database connection failed",
      details: err.message,
    });
  }
});

// Health check endpoint
app.get("/health", async (req, res) => {
  try {
    // Simple query without parameters
    await pool.query("SELECT 1");
    res.json({
      status: "healthy",
      db: "connected",
      pooler: "transaction",
    });
  } catch (err) {
    res.status(500).json({
      status: "unhealthy",
      db: "disconnected",
      error: err.message,
    });
  }
});

app.listen(port, () => {
  console.log(`🚀 Server is running at http://localhost:${port}`);
  console.log(
    `Using Transaction Pooler: ${DB_CONNECTION_STRING.replace(
      /:[^@]+@/,
      ":********@"
    )}`
  );
});
