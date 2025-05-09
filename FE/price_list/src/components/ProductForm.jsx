import { useState } from "react";
import { useLanguage } from "../contexts/LanguageContext";
// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";
import "../styles/ProductForm.css";

const ProductForm = ({ product, onSubmit, onCancel }) => {
  const { t } = useLanguage();
  const [formData, setFormData] = useState({
    article_number: product?.article_number || "",
    name: product?.name || "",
    in_price: product?.in_price || 0,
    price: product?.price || 0,
    unit: product?.unit || "pcs",
    in_stock: product?.in_stock || 0,
    description: product?.description || "",
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]:
        name === "in_price" || name === "price" || name === "in_stock"
          ? Number.parseFloat(value) || 0
          : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await onSubmit(formData);
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -30 }}
      transition={{
        duration: 0.5,
        type: "spring",
        stiffness: 300,
        damping: 30,
      }}
      className="product-form-wrapper"
    >
      <div className="product-form-card">
        <div className="product-form-header">
          <motion.h2
            className="product-form-title"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
          >
            {product ? t("product.edit") : t("product.create")}
          </motion.h2>
        </div>

        <form onSubmit={handleSubmit} className="product-form">
          <div className="form-grid">
            <motion.div
              className="form-group"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
            >
              <label htmlFor="article_number">
                {t("product.articleNumber")}
              </label>
              <input
                id="article_number"
                name="article_number"
                value={formData.article_number}
                onChange={handleChange}
                required
                className="form-input"
              />
            </motion.div>

            <motion.div
              className="form-group"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <label htmlFor="name">{t("product.name")}</label>
              <input
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                className="form-input"
              />
            </motion.div>

            <motion.div
              className="form-group"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              <label htmlFor="in_price">{t("product.inPrice")}</label>
              <input
                id="in_price"
                name="in_price"
                type="number"
                min="0"
                step="0.01"
                value={formData.in_price}
                onChange={handleChange}
                required
                className="form-input"
              />
            </motion.div>

            <motion.div
              className="form-group"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
            >
              <label htmlFor="price">{t("product.price")}</label>
              <input
                id="price"
                name="price"
                type="number"
                min="0"
                step="0.01"
                value={formData.price}
                onChange={handleChange}
                required
                className="form-input"
              />
            </motion.div>

            <motion.div
              className="form-group"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
            >
              <label htmlFor="unit">{t("product.unit")}</label>
              <input
                id="unit"
                name="unit"
                value={formData.unit}
                onChange={handleChange}
                required
                className="form-input"
              />
            </motion.div>

            <motion.div
              className="form-group"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
            >
              <label htmlFor="in_stock">{t("product.inStock")}</label>
              <input
                id="in_stock"
                name="in_stock"
                type="number"
                min="0"
                value={formData.in_stock}
                onChange={handleChange}
                required
                className="form-input"
              />
            </motion.div>
          </div>

          <motion.div
            className="form-group full-width"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7 }}
          >
            <label htmlFor="description">{t("product.description")}</label>
            <textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              rows={3}
              className="form-textarea"
            />
          </motion.div>

          <motion.div
            className="form-actions"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
          >
            <motion.button
              type="button"
              className="cancel-button"
              onClick={onCancel}
              disabled={loading}
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
            >
              {t("product.cancel")}
            </motion.button>
            <motion.button
              type="submit"
              className="submit-button"
              disabled={loading}
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
            >
              {loading ? t("common.loading") : t("product.save")}
            </motion.button>
          </motion.div>
        </form>
      </div>
    </motion.div>
  );
};

export default ProductForm;
