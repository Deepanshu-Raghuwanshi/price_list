import { useState } from "react";
import { useLanguage } from "../contexts/LanguageContext";
import { FiSearch, FiMoreHorizontal } from "react-icons/fi";
import { motion } from "framer-motion";
import "../styles/ProductList.css";

const ProductList = ({ products, onEdit, onDelete }) => {
  const { t } = useLanguage();
  const [searchArticle, setSearchArticle] = useState("");
  const [searchProduct, setSearchProduct] = useState("");
  const [selectedIndex, setSelectedIndex] = useState(0);

  // Sample data to match the images
  const sampleProducts = [
    {
      id: 1,
      article_number: "123456789",
      name: "This is a test product with fifty characters this!",
      in_price: "900500",
      price: "1500800",
      in_stock: "1500800",
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
      price: "15000",
      in_stock: "50",
      unit: "pcs",
    },
    {
      id: 4,
      name: "Random product",
      article_number: "54321",
      price: "1234",
      in_stock: "100",
      unit: "pcs",
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

  const handleSelectProduct = (index) => {
    setSelectedIndex(index);
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
              placeholder="Search Article No..."
              value={searchArticle}
              onChange={(e) => setSearchArticle(e.target.value)}
              className="search-input"
            />
            <FiSearch className="search-icon" />
          </div>
          <div className="search-container">
            <input
              type="text"
              placeholder="Search Product..."
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
            <span className="action-text">New Product</span>
          </button>
          <button className="action-button print-button">
            <span className="action-icon">
              <PrintIcon />
            </span>
            <span className="action-text">Print List</span>
          </button>
          <button className="action-button toggle-button">
            <span className="action-icon">
              <ToggleIcon />
            </span>
            <span className="action-text">Advanced mode</span>
          </button>
        </div>
      </div>

      {/* Mobile View */}
      <div className="product-list-mobile">
        <div className="product-headers">
          <div className="product-header-name">Product/Service</div>
          <div className="product-header-price">Price</div>
        </div>

        <div className="product-items">
          {filteredProducts.length > 0 ? (
            filteredProducts.map((product, index) => (
              <div
                key={product.id}
                className={`product-row ${
                  selectedIndex === index ? "selected" : ""
                }`}
                onClick={() => handleSelectProduct(index)}
              >
                {selectedIndex === index && (
                  <div className="row-indicator">→</div>
                )}
                <div className="product-cell product-name-cell">
                  {product.name}
                </div>
                <div className="product-cell product-price-cell">
                  <span>{product.price}</span>
                  <button className="more-actions">
                    <FiMoreHorizontal />
                  </button>
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
          <div className="header-cell article-header">Article No.</div>
          <div className="header-cell product-header">Product/Service</div>
          <div className="header-cell price-header">Price</div>
          <div className="header-cell stock-header">In Stock</div>
          <div className="header-cell unit-header">Unit</div>
          <div className="header-cell actions-header"></div>
        </div>

        <div className="product-table-body">
          {filteredProducts.length > 0 ? (
            filteredProducts.map((product, index) => (
              <div
                key={product.id}
                className={`product-table-row ${
                  selectedIndex === index ? "selected" : ""
                }`}
                onClick={() => handleSelectProduct(index)}
              >
                {selectedIndex === index && (
                  <div className="row-indicator">→</div>
                )}
                <div className="table-cell article-cell">
                  {product.article_number}
                </div>
                <div className="table-cell name-cell">{product.name}</div>
                <div className="table-cell price-cell">{product.price}</div>
                <div className="table-cell stock-cell">{product.in_stock}</div>
                <div className="table-cell unit-cell">{product.unit}</div>
                <div className="table-cell actions-cell">
                  <button className="more-actions">
                    <FiMoreHorizontal />
                  </button>
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
