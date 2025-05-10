const Translation = require("../models/Translation");

// Get translations by language
exports.getTranslations = async (req, res) => {
  try {
    const { language } = req.params;

    // Validate language parameter
    if (!language || !["en", "sv"].includes(language)) {
      return res.status(400).json({
        success: false,
        message: "Valid language parameter (en or sv) is required",
      });
    }

    const translations = await Translation.getByLanguage(language);

    res.json({
      success: true,
      data: translations,
    });
  } catch (error) {
    console.error("Error getting translations:", error);
    res.status(500).json({
      success: false,
      message: "Failed to retrieve translations",
    });
  }
};

// Update a translation
exports.updateTranslation = async (req, res) => {
  try {
    const { language, key } = req.params;
    const { value } = req.body;

    // Validate parameters
    if (!language || !["en", "sv"].includes(language)) {
      return res.status(400).json({
        success: false,
        message: "Valid language parameter (en or sv) is required",
      });
    }

    if (!key) {
      return res.status(400).json({
        success: false,
        message: "Translation key is required",
      });
    }

    if (!value) {
      return res.status(400).json({
        success: false,
        message: "Translation value is required",
      });
    }

    const updatedTranslation = await Translation.updateTranslation(
      language,
      key,
      value
    );

    res.json({
      success: true,
      data: updatedTranslation,
    });
  } catch (error) {
    console.error("Error updating translation:", error);
    res.status(500).json({
      success: false,
      message: "Failed to update translation",
    });
  }
};
