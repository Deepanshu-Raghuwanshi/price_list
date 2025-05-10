import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { useLanguage } from "../contexts/LanguageContext";
import { productApi } from "../services/api";
import { toast } from "react-toastify";
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";
import ProductList from "../components/ProductList";
import ProductForm from "../components/ProductForm";
import { FiLoader } from "react-icons/fi";
import { motion, AnimatePresence } from "framer-motion";
import "../styles/DashboardPage.css";

const DashboardPage = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [currentProduct, setCurrentProduct] = useState(null);
  const [sidebarOpen, setSidebarOpen] = useState(true); // Default to open on all screen sizes

  const { user } = useAuth();
  const { t } = useLanguage();
  const navigate = useNavigate();

  // Toggle sidebar - only used on mobile
  const toggleSidebar = () => {
    if (window.innerWidth < 1024) {
      setSidebarOpen(!sidebarOpen);
    }
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

  // Handle window resize
  useEffect(() => {
    const handleResize = () => {
      // On desktop, always show sidebar
      if (window.innerWidth >= 1024) {
        setSidebarOpen(true);
      }
    };

    window.addEventListener("resize", handleResize);
    handleResize(); // Set initial state
    return () => window.removeEventListener("resize", handleResize);
  }, []);

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

  const handleProductUpdated = (updatedProduct) => {
    setProducts(
      products.map((p) => (p.id === updatedProduct.id ? updatedProduct : p))
    );
  };

  if (!user) {
    return null;
  }

  return (
    <div className="dashboard-container">
      <Header toggleSidebar={toggleSidebar} sidebarOpen={sidebarOpen} />
      <Sidebar isOpen={sidebarOpen} toggleSidebar={toggleSidebar} />

      <div className={`dashboard-main ${sidebarOpen ? "sidebar-open" : ""}`}>
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
                  <ProductList
                    products={products}
                    onEdit={handleEditProduct}
                    onDelete={handleDeleteProduct}
                    onProductUpdated={handleProductUpdated}
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
