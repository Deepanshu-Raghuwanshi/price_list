const { Pool } = require("pg");
require("dotenv").config();

const pool = new Pool({
  connectionString: process.env.DB_CONNECTION_STRING,
  ssl: {
    rejectUnauthorized: false,
  },
});

class Translation {
  static async createTable() {
    const createTableQuery = `
      CREATE TABLE IF NOT EXISTS translations (
        id SERIAL PRIMARY KEY,
        language VARCHAR(10) NOT NULL,
        key VARCHAR(255) NOT NULL,
        value TEXT NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        UNIQUE(language, key)
      )
    `;

    try {
      await pool.query(createTableQuery);
      console.log("Translations table created successfully");

      // Insert default translations
      await this.seedDefaultTranslations();
    } catch (error) {
      console.error("Error creating translations table:", error);
      throw error;
    }
  }

  static async seedDefaultTranslations() {
    const defaultTranslations = [
      // English translations
      { language: "en", key: "login.title", value: "Login" },
      { language: "en", key: "login.username", value: "Username" },
      { language: "en", key: "login.password", value: "Password" },
      { language: "en", key: "login.submit", value: "Login" },
      { language: "en", key: "login.loggingIn", value: "Logging in..." },
      {
        language: "en",
        key: "login.noAccount",
        value: "Don't have an account?",
      },
      { language: "en", key: "login.signupHere", value: "Sign up here" },
      { language: "en", key: "login.error", value: "Login failed" },

      // Signup translations - English
      { language: "en", key: "signup.title", value: "Create Account" },
      { language: "en", key: "signup.username", value: "Username" },
      { language: "en", key: "signup.password", value: "Password" },
      {
        language: "en",
        key: "signup.confirmPassword",
        value: "Confirm Password",
      },
      { language: "en", key: "signup.submit", value: "Create Account" },
      { language: "en", key: "signup.creating", value: "Creating Account..." },
      {
        language: "en",
        key: "signup.alreadyHaveAccount",
        value: "Already have an account?",
      },
      { language: "en", key: "signup.loginHere", value: "Login here" },
      { language: "en", key: "signup.error", value: "Signup failed" },
      {
        language: "en",
        key: "signup.passwordsDoNotMatch",
        value: "Passwords do not match",
      },

      { language: "en", key: "dashboard.title", value: "Product Dashboard" },
      { language: "en", key: "product.create", value: "Create Product" },
      { language: "en", key: "product.articleNumber", value: "Article Number" },
      { language: "en", key: "product.name", value: "Product/Service" },
      { language: "en", key: "product.inPrice", value: "In Price" },
      { language: "en", key: "product.price", value: "Price" },
      { language: "en", key: "product.unit", value: "Unit" },
      { language: "en", key: "product.inStock", value: "In Stock" },
      { language: "en", key: "product.description", value: "Description" },
      { language: "en", key: "product.save", value: "Save" },
      { language: "en", key: "product.cancel", value: "Cancel" },
      { language: "en", key: "product.edit", value: "Edit" },
      { language: "en", key: "product.delete", value: "Delete" },
      {
        language: "en",
        key: "product.noProducts",
        value: "No products found. Create your first product!",
      },
      { language: "en", key: "common.logout", value: "Logout" },

      // Spanish translations
      { language: "es", key: "login.title", value: "Iniciar Sesión" },
      { language: "es", key: "login.username", value: "Nombre de Usuario" },
      { language: "es", key: "login.password", value: "Contraseña" },
      { language: "es", key: "login.submit", value: "Iniciar Sesión" },
      { language: "es", key: "login.loggingIn", value: "Iniciando sesión..." },
      {
        language: "es",
        key: "login.noAccount",
        value: "¿No tienes una cuenta?",
      },
      { language: "es", key: "login.signupHere", value: "Regístrate aquí" },
      { language: "es", key: "login.error", value: "Error al iniciar sesión" },

      // Signup translations - Spanish
      { language: "es", key: "signup.title", value: "Crear Cuenta" },
      { language: "es", key: "signup.username", value: "Nombre de Usuario" },
      { language: "es", key: "signup.password", value: "Contraseña" },
      {
        language: "es",
        key: "signup.confirmPassword",
        value: "Confirmar Contraseña",
      },
      { language: "es", key: "signup.submit", value: "Crear Cuenta" },
      { language: "es", key: "signup.creating", value: "Creando Cuenta..." },
      {
        language: "es",
        key: "signup.alreadyHaveAccount",
        value: "¿Ya tienes una cuenta?",
      },
      { language: "es", key: "signup.loginHere", value: "Inicia sesión aquí" },
      { language: "es", key: "signup.error", value: "Error al registrarse" },
      {
        language: "es",
        key: "signup.passwordsDoNotMatch",
        value: "Las contraseñas no coinciden",
      },

      { language: "es", key: "dashboard.title", value: "Panel de Productos" },
      { language: "es", key: "product.create", value: "Crear Producto" },
      {
        language: "es",
        key: "product.articleNumber",
        value: "Número de Artículo",
      },
      { language: "es", key: "product.name", value: "Producto/Servicio" },
      { language: "es", key: "product.inPrice", value: "Precio de Entrada" },
      { language: "es", key: "product.price", value: "Precio" },
      { language: "es", key: "product.unit", value: "Unidad" },
      { language: "es", key: "product.inStock", value: "En Existencia" },
      { language: "es", key: "product.description", value: "Descripción" },
      { language: "es", key: "product.save", value: "Guardar" },
      { language: "es", key: "product.cancel", value: "Cancelar" },
      { language: "es", key: "product.edit", value: "Editar" },
      { language: "es", key: "product.delete", value: "Eliminar" },
      {
        language: "es",
        key: "product.noProducts",
        value: "No se encontraron productos. ¡Crea tu primer producto!",
      },
      { language: "es", key: "common.logout", value: "Cerrar Sesión" },
    ];

    try {
      // Use a transaction to ensure all translations are inserted
      const client = await pool.connect();
      try {
        await client.query("BEGIN");

        for (const translation of defaultTranslations) {
          const query = `
            INSERT INTO translations (language, key, value)
            VALUES ($1, $2, $3)
            ON CONFLICT (language, key) DO NOTHING
          `;
          await client.query(query, [
            translation.language,
            translation.key,
            translation.value,
          ]);
        }

        await client.query("COMMIT");
      } catch (error) {
        await client.query("ROLLBACK");
        throw error;
      } finally {
        client.release();
      }

      console.log("Default translations seeded successfully");
    } catch (error) {
      console.error("Error seeding default translations:", error);
      throw error;
    }
  }

  static async getByLanguage(language) {
    try {
      const query = "SELECT key, value FROM translations WHERE language = $1";
      const { rows } = await pool.query(query, [language]);

      // Convert to a key-value object
      const translations = {};
      rows.forEach((row) => {
        translations[row.key] = row.value;
      });

      return translations;
    } catch (error) {
      console.error("Error getting translations:", error);
      throw error;
    }
  }

  static async updateTranslation(language, key, value) {
    try {
      const query = `
        INSERT INTO translations (language, key, value)
        VALUES ($1, $2, $3)
        ON CONFLICT (language, key) 
        DO UPDATE SET value = $3, updated_at = CURRENT_TIMESTAMP
        RETURNING *
      `;

      const { rows } = await pool.query(query, [language, key, value]);
      return rows[0];
    } catch (error) {
      console.error("Error updating translation:", error);
      throw error;
    }
  }
}

module.exports = Translation;
