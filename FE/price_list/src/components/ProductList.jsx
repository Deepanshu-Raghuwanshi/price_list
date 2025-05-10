"use client";

import { useState, useRef, useEffect } from "react";
import { useLanguage } from "../contexts/LanguageContext";
import { FiSearch, FiCheck, FiX, FiEdit } from "react-icons/fi";
import { motion } from "framer-motion";
import { toast } from "react-toastify";
import { productApi } from "../services/api";
import "../styles/ProductList.css";

const ProductList = ({ products, onEdit, onDelete, onProductUpdated }) => {
  const { t } = useLanguage();
  const [searchArticle, setSearchArticle] = useState("");
  const [searchProduct, setSearchProduct] = useState("");
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [editingState, setEditingState] = useState({
    isEditing: false,
    productId: null,
    field: null,
    value: "",
    originalValue: "",
    product: null,
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const editInputRef = useRef(null);

  // Sample data to match the images
  const sampleProducts = [
    {
      id: 1,
      article_number: "123456789",
      name: "This is a test product with fifty characters this!",
      in_price: "900500",
      price: "1500800",
      in_stock: "2500600",
      unit: "kilometers/hour",
      description: "This is the description with fifty characters this",
    },
    {
      id: 2,
      article_number: "123456789",
      name: "This is a test product with fifty characters this!",
      in_price: "900500",
      price: "1500800",
      in_stock: "1500800",
      unit: "kilometers/hour",
      description: "This is the description with fifty characters this",
    },
    {
      id: 3,
      name: "Sony DSLR 12345",
      article_number: "12345",
      in_price: "10000",
      price: "15000",
      in_stock: "50",
      unit: "pcs",
      description: "Professional camera with high resolution",
    },
    {
      id: 4,
      name: "Random product",
      article_number: "54321",
      in_price: "1000",
      price: "1234",
      in_stock: "100",
      unit: "pcs",
      description: "Generic product description",
    },
  ];

  // Use sample data or actual products
  const displayProducts =
    products && products.length > 0 ? products : sampleProducts;

  const filteredProducts = displayProducts.filter(
    (product) =>
      product.article_number
        ?.toLowerCase()
        .includes(searchArticle.toLowerCase()) &&
      product.name.toLowerCase().includes(searchProduct.toLowerCase())
  );

  // Focus input when editing starts
  useEffect(() => {
    if (editingState.isEditing && editInputRef.current) {
      editInputRef.current.focus();
    }
  }, [editingState.isEditing, editingState.field]);

  const handleSelectProduct = (index) => {
    if (!editingState.isEditing) {
      setSelectedIndex(index);
    }
  };

  const startEditing = (product, field, value) => {
    setEditingState({
      isEditing: true,
      productId: product.id,
      field,
      value: value || "",
      originalValue: value || "",
      product,
    });
  };

  const cancelEdit = () => {
    setEditingState({
      isEditing: false,
      productId: null,
      field: null,
      value: "",
      originalValue: "",
      product: null,
    });
  };

  const handleInputChange = (e) => {
    setEditingState({
      ...editingState,
      value: e.target.value,
    });
  };

  const saveEdit = async () => {
    if (editingState.value === editingState.originalValue) {
      cancelEdit();
      return;
    }

    try {
      setIsSubmitting(true);
      const productToUpdate = { ...editingState.product };

      if (!productToUpdate) {
        toast.error("Product not found");
        return;
      }

      const updatedProduct = {
        ...productToUpdate,
        [editingState.field]: editingState.value,
      };

      const response = await productApi.update(
        editingState.productId,
        updatedProduct
      );

      if (response.data.success) {
        toast.success("Product updated successfully");

        // Update local state
        if (onProductUpdated) {
          onProductUpdated(response.data.data);
        }
      } else {
        toast.error("Failed to update product");
      }
    } catch (error) {
      console.error("Error updating product:", error);
      toast.error(error.response?.data?.message || "Failed to update product");
    } finally {
      setIsSubmitting(false);
      cancelEdit();
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      saveEdit();
    } else if (e.key === "Escape") {
      cancelEdit();
    }
  };

  const renderEditableCell = (product, field, value, className) => {
    const isEditing =
      editingState.isEditing &&
      editingState.productId === product.id &&
      editingState.field === field;

    return (
      <div
        className={`table-cell ${className} ${isEditing ? "editing" : ""}`}
        onClick={() =>
          !editingState.isEditing && startEditing(product, field, value)
        }
      >
        {isEditing ? (
          <input
            ref={editInputRef}
            type="text"
            value={editingState.value}
            onChange={handleInputChange}
            onKeyDown={handleKeyDown}
            className="edit-input"
          />
        ) : (
          <span className="cell-content">{value}</span>
        )}
      </div>
    );
  };

  return (
    <motion.div
      className="product-list-container"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="top-controls">
        <div className="search-section">
          <div className="search-container">
            <input
              type="text"
              placeholder={t("product.searchArticle") || "Search Article No..."}
              value={searchArticle}
              onChange={(e) => setSearchArticle(e.target.value)}
              className="search-input"
            />
            <FiSearch className="search-icon" />
          </div>
          <div className="search-container">
            <input
              type="text"
              placeholder={t("product.searchProduct") || "Search Product..."}
              value={searchProduct}
              onChange={(e) => setSearchProduct(e.target.value)}
              className="search-input"
            />
            <FiSearch className="search-icon" />
          </div>
        </div>

        <div className="action-buttons">
          <button
            className="action-button add-button"
            onClick={() => onEdit(null)}
          >
            <span className="action-icon">+</span>
            <span className="action-text">
              {t("product.new") || "New Product"}
            </span>
          </button>
          <button className="action-button print-button">
            <span className="action-icon">
              <PrintIcon />
            </span>
            <span className="action-text">
              {t("product.printList") || "Print List"}
            </span>
          </button>
          <button className="action-button toggle-button">
            <span className="action-icon">
              <ToggleIcon />
            </span>
            <span className="action-text">
              {t("product.advancedMode") || "Advanced mode"}
            </span>
          </button>
        </div>
      </div>

      {/* Mobile View */}
      <div className="product-list-mobile">
        <div className="product-headers">
          <div className="product-header-name">{t("product.name")}</div>
          <div className="product-header-price">{t("product.price")}</div>
        </div>

        <div className="product-items">
          {filteredProducts.length > 0 ? (
            filteredProducts.map((product, index) => (
              <div
                key={product.id}
                className={`product-row ${
                  selectedIndex === index ? "selected" : ""
                } ${
                  editingState.isEditing &&
                  editingState.productId === product.id
                    ? "editing-row"
                    : ""
                }`}
                onClick={() => handleSelectProduct(index)}
              >
                {selectedIndex === index && (
                  <div className="row-indicator">→</div>
                )}
                {renderEditableCell(
                  product,
                  "name",
                  product.name,
                  "product-cell product-name-cell"
                )}
                <div className="product-cell product-price-cell">
                  {renderEditableCell(
                    product,
                    "price",
                    product.price,
                    "price-value"
                  )}

                  {editingState.isEditing &&
                  editingState.productId === product.id ? (
                    <div className="row-edit-actions">
                      <button
                        className="edit-action-btn save-btn"
                        onClick={saveEdit}
                        disabled={isSubmitting}
                        aria-label="Save"
                      >
                        <FiCheck />
                      </button>
                      <button
                        className="edit-action-btn cancel-btn"
                        onClick={cancelEdit}
                        disabled={isSubmitting}
                        aria-label="Cancel"
                      >
                        <FiX />
                      </button>
                    </div>
                  ) : (
                    <button
                      className="more-actions"
                      onClick={(e) => {
                        e.stopPropagation();
                        startEditing(product, "name", product.name);
                      }}
                    >
                      <FiEdit />
                    </button>
                  )}
                </div>
              </div>
            ))
          ) : (
            <div className="no-products">{t("product.noProducts")}</div>
          )}
        </div>
      </div>

      {/* Desktop/Tablet View */}
      <div className="product-list-desktop">
        <div className="product-table-header">
          <div className="header-cell article-header">
            {t("product.articleNumber")} <span className="header-arrow">↓</span>
          </div>
          <div className="header-cell product-header">
            {t("product.name")} <span className="header-arrow">↓</span>
          </div>
          <div className="header-cell in-price-header">
            {t("product.inPrice")}
          </div>
          <div className="header-cell price-header">{t("product.price")}</div>
          <div className="header-cell unit-header">{t("product.unit")}</div>
          <div className="header-cell stock-header">{t("product.inStock")}</div>
          <div className="header-cell description-header">
            {t("product.description")}
          </div>
          <div className="header-cell actions-header">
            {t("product.actions") || "Actions"}
          </div>
        </div>

        <div className="product-table-body">
          {filteredProducts.length > 0 ? (
            filteredProducts.map((product, index) => (
              <div
                key={product.id}
                className={`product-table-row ${
                  selectedIndex === index ? "selected" : ""
                } ${
                  editingState.isEditing &&
                  editingState.productId === product.id
                    ? "editing-row"
                    : ""
                }`}
                onClick={() => handleSelectProduct(index)}
              >
                {selectedIndex === index && (
                  <div className="row-indicator">→</div>
                )}
                {renderEditableCell(
                  product,
                  "article_number",
                  product.article_number,
                  "article-cell"
                )}
                {renderEditableCell(product, "name", product.name, "name-cell")}
                {renderEditableCell(
                  product,
                  "in_price",
                  product.in_price,
                  "in-price-cell"
                )}
                {renderEditableCell(
                  product,
                  "price",
                  product.price,
                  "price-cell"
                )}
                {renderEditableCell(product, "unit", product.unit, "unit-cell")}
                {renderEditableCell(
                  product,
                  "in_stock",
                  product.in_stock,
                  "stock-cell"
                )}
                {renderEditableCell(
                  product,
                  "description",
                  product.description,
                  "description-cell"
                )}
                <div className="table-cell actions-cell">
                  {editingState.isEditing &&
                  editingState.productId === product.id ? (
                    <div className="row-edit-actions">
                      <button
                        className="edit-action-btn save-btn"
                        onClick={saveEdit}
                        disabled={isSubmitting}
                        aria-label="Save"
                      >
                        <FiCheck />
                      </button>
                      <button
                        className="edit-action-btn cancel-btn"
                        onClick={cancelEdit}
                        disabled={isSubmitting}
                        aria-label="Cancel"
                      >
                        <FiX />
                      </button>
                    </div>
                  ) : (
                    <button
                      className="more-actions"
                      onClick={(e) => {
                        e.stopPropagation();
                        // Start editing the name field by default
                        startEditing(product, "name", product.name);
                      }}
                    >
                      <FiEdit />
                    </button>
                  )}
                </div>
              </div>
            ))
          ) : (
            <div className="no-products">{t("product.noProducts")}</div>
          )}
        </div>
      </div>
    </motion.div>
  );
};

const PrintIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <polyline points="6 9 6 2 18 2 18 9"></polyline>
    <path d="M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2"></path>
    <rect x="6" y="14" width="12" height="8"></rect>
  </svg>
);

const ToggleIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <rect x="1" y="5" width="22" height="14" rx="7" ry="7"></rect>
    <circle cx="16" cy="12" r="3"></circle>
  </svg>
);

export default ProductList;
