const express = require("express");
const translationController = require("../controllers/translationController");
const { authenticateToken } = require("../controllers/authController");

const router = express.Router();

// Get translations by language (public route)
router.get("/:language", translationController.getTranslations);

// Update translation (protected route)
router.put(
  "/:language/:key",
  authenticateToken,
  translationController.updateTranslation
);

module.exports = router;
