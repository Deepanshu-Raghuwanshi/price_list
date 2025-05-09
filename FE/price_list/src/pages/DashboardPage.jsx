import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { useLanguage } from "../contexts/LanguageContext";
import { productApi } from "../services/api";
import { toast } from "react-toastify";
import Header from "../components/Header";
import Sidebar from "../components/sideBar";
import ProductList from "../components/ProductList";
import ProductForm from "../components/ProductForm";
import { FiPlus, FiLoader } from "react-icons/fi";
// eslint-disable-next-line no-unused-vars
import { motion, AnimatePresence } from "framer-motion";
import "../styles/DashboardPage.css";

const DashboardPage = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [currentProduct, setCurrentProduct] = useState(null);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const { user } = useAuth();
  const { t } = useLanguage();
  const navigate = useNavigate();

  // Toggle sidebar
  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  // Fetch products on component mount
  useEffect(() => {
    if (user) {
      fetchProducts();
    }
  }, [user]);

  // Redirect if not logged in
  useEffect(() => {
    if (!user && !loading) {
      navigate("/");
    }
  }, [user, loading, navigate]);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const response = await productApi.getAll();
      if (response.data.success) {
        setProducts(response.data.data);
      }
    } catch (error) {
      console.error("Error fetching products:", error);
      toast.error(t("dashboard.fetchError"));
    } finally {
      setLoading(false);
    }
  };

  const handleCreateProduct = () => {
    setCurrentProduct(null);
    setShowForm(true);
  };

  const handleEditProduct = (product) => {
    setCurrentProduct(product);
    setShowForm(true);
  };

  const handleDeleteProduct = async (id) => {
    if (window.confirm(t("product.confirmDelete"))) {
      try {
        const response = await productApi.delete(id);
        if (response.data.success) {
          setProducts(products.filter((product) => product.id !== id));
          toast.success("Product deleted successfully");
        }
      } catch (error) {
        console.error("Error deleting product:", error);
        toast.error(t("product.deleteError"));
      }
    }
  };

  const handleFormSubmit = async (formData) => {
    try {
      if (currentProduct) {
        // Update existing product
        const response = await productApi.update(currentProduct.id, formData);
        if (response.data.success) {
          setProducts(
            products.map((p) =>
              p.id === currentProduct.id ? response.data.data : p
            )
          );
          toast.success("Product updated successfully");
        }
      } else {
        // Create new product
        const response = await productApi.create(formData);
        if (response.data.success) {
          setProducts([response.data.data, ...products]);
          toast.success("Product created successfully");
        }
      }
      setShowForm(false);
    } catch (error) {
      console.error("Error saving product:", error);
      toast.error(t("product.saveError"));
    }
  };

  const handleFormCancel = () => {
    setShowForm(false);
  };

  if (!user) {
    return null;
  }

  return (
    <div className="dashboard-container">
      <Sidebar isOpen={sidebarOpen} toggleSidebar={toggleSidebar} />

      <div className="dashboard-main">
        <Header toggleSidebar={toggleSidebar} />

        <main className="dashboard-content">
          {loading ? (
            <motion.div
              className="loading-container"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <FiLoader className="loading-spinner" />
              <p>{t("common.loading")}</p>
            </motion.div>
          ) : (
            <AnimatePresence mode="wait">
              {showForm ? (
                <ProductForm
                  product={currentProduct}
                  onSubmit={handleFormSubmit}
                  onCancel={handleFormCancel}
                />
              ) : (
                <motion.div
                  key="list"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.4 }}
                >
                  <motion.div
                    className="dashboard-actions"
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                  >
                    <motion.button
                      className="create-product-btn"
                      onClick={handleCreateProduct}
                      whileHover={{ scale: 1.05, y: -2 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <FiPlus className="btn-icon" />
                      <span>{t("product.create")}</span>
                    </motion.button>
                  </motion.div>

                  <ProductList
                    products={products}
                    onEdit={handleEditProduct}
                    onDelete={handleDeleteProduct}
                  />
                </motion.div>
              )}
            </AnimatePresence>
          )}
        </main>
      </div>
    </div>
  );
};

export default DashboardPage;
