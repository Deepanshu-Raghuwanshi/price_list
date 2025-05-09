import { useState } from "react";
import { useLanguage } from "../contexts/LanguageContext";
import { FiSearch, FiEdit2, FiTrash2 } from "react-icons/fi";
import { motion, AnimatePresence } from "framer-motion";
import "../styles/ProductList.css";

const ProductList = ({ products, onEdit, onDelete }) => {
  const { t } = useLanguage();
  const [searchTerm, setSearchTerm] = useState("");

  const filteredProducts = products.filter(
    (product) =>
      product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.article_number.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <motion.div
      className="product-list-container"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="product-list-header">
        <motion.h2
          className="product-list-title"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
        >
          {t("dashboard.title")}
        </motion.h2>
        <motion.div
          className="search-container"
          initial={{ opacity: 0, width: "80%" }}
          animate={{ opacity: 1, width: "100%" }}
          transition={{ delay: 0.3 }}
        >
          <FiSearch className="search-icon" />
          <input
            type="text"
            placeholder={`${t("product.search")}...`}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="search-input"
          />
        </motion.div>
      </div>

      <div className="product-table-container">
        <table className="product-table">
          <thead>
            <tr>
              <th>{t("product.articleNumber")}</th>
              <th>{t("product.name")}</th>
              <th className="hide-mobile">{t("product.inPrice")}</th>
              <th>{t("product.price")}</th>
              <th className="hide-mobile">{t("product.unit")}</th>
              <th className="hide-mobile">{t("product.inStock")}</th>
              <th className="hide-tablet">{t("product.description")}</th>
              <th>{t("product.actions")}</th>
            </tr>
          </thead>
          <tbody>
            <AnimatePresence>
              {filteredProducts.length > 0 ? (
                filteredProducts.map((product, index) => (
                  <motion.tr
                    key={product.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.3, delay: index * 0.05 }}
                    className="product-row"
                    whileHover={{ backgroundColor: "rgba(124, 58, 237, 0.05)" }}
                  >
                    <td className="article-number">{product.article_number}</td>
                    <td className="product-name">{product.name}</td>
                    <td className="hide-mobile">${product.in_price}</td>
                    <td>${product.price}</td>
                    <td className="hide-mobile">{product.unit}</td>
                    <td className="hide-mobile">{product.in_stock}</td>
                    <td className="description-cell hide-tablet">
                      {product.description}
                    </td>
                    <td className="actions-cell">
                      <motion.button
                        className="action-btn edit-btn"
                        onClick={() => onEdit(product)}
                        aria-label={t("product.edit")}
                        whileHover={{
                          scale: 1.1,
                          backgroundColor: "var(--primary-light)",
                        }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <FiEdit2 />
                      </motion.button>
                      <motion.button
                        className="action-btn delete-btn"
                        onClick={() => onDelete(product.id)}
                        aria-label={t("product.delete")}
                        whileHover={{
                          scale: 1.1,
                          backgroundColor: "var(--accent-light)",
                        }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <FiTrash2 />
                      </motion.button>
                    </td>
                  </motion.tr>
                ))
              ) : (
                <tr>
                  <td colSpan="8" className="no-products">
                    {t("product.noProducts")}
                  </td>
                </tr>
              )}
            </AnimatePresence>
          </tbody>
        </table>
      </div>
    </motion.div>
  );
};

export default ProductList;
