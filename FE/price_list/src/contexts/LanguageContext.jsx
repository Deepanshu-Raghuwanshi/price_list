import { createContext, useState, useEffect, useContext } from "react";
import axios from "axios";

const LanguageContext = createContext();

const baseURL = (
  import.meta.env.VITE_API_URL || "http://localhost:3000/api"
).replace(/['"]+/g, "");

export const useLanguage = () => useContext(LanguageContext);

export const LanguageProvider = ({ children }) => {
  const [language, setLanguage] = useState("en");
  const [translations, setTranslations] = useState({});
  const [loading, setLoading] = useState(true);

  // Add these default translations as a fallback
  const defaultTranslations = {
    en: {
      "product.articleNumber": "Article No.",
      "product.name": "Product/Service",
      "product.inPrice": "In Price",
      "product.price": "Price",
      "product.unit": "Unit",
      "product.inStock": "In Stock",
      "product.description": "Description",
      "product.actions": "Actions",
      "product.searchArticle": "Search Article No...",
      "product.searchProduct": "Search Product...",
      "product.new": "New Product",
      "product.printList": "Print List",
      "product.advancedMode": "Advanced mode",
      "product.noProducts": "No products found. Create your first product!",
      "common.loading": "Loading...",
      "common.logout": "Logout",
    },
    es: {
      "product.articleNumber": "Número de Artículo",
      "product.name": "Producto/Servicio",
      "product.inPrice": "Precio de Entrada",
      "product.price": "Precio",
      "product.unit": "Unidad",
      "product.inStock": "En Existencia",
      "product.description": "Descripción",
      "product.actions": "Acciones",
      "product.searchArticle": "Buscar Número de Artículo...",
      "product.searchProduct": "Buscar Producto...",
      "product.new": "Nuevo Producto",
      "product.printList": "Imprimir Lista",
      "product.advancedMode": "Modo Avanzado",
      "product.noProducts":
        "No se encontraron productos. ¡Crea tu primer producto!",
      "common.loading": "Cargando...",
      "common.logout": "Cerrar Sesión",
    },
  };

  useEffect(() => {
    const fetchTranslations = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`${baseURL}/translations/${language}`);
        if (response.data.success) {
          // Merge with default translations to ensure we have fallbacks
          setTranslations({
            ...defaultTranslations[language],
            ...response.data.data,
          });
        } else {
          // Use default translations if API call fails
          setTranslations(defaultTranslations[language] || {});
        }
      } catch (error) {
        console.error("Error fetching translations:", error);
        // Use default translations if API call fails
        setTranslations(defaultTranslations[language] || {});
      } finally {
        setLoading(false);
      }
    };

    fetchTranslations();
  }, [language]);

  const changeLanguage = (lang) => {
    if (lang === "en" || lang === "es") {
      setLanguage(lang);
      localStorage.setItem("preferredLanguage", lang);
    }
  };

  // Initialize language from localStorage if available
  useEffect(() => {
    const savedLanguage = localStorage.getItem("preferredLanguage");
    if (savedLanguage && (savedLanguage === "en" || savedLanguage === "es")) {
      setLanguage(savedLanguage);
    }
  }, []);

  const t = (key) => {
    return translations[key] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, changeLanguage, t, loading }}>
      {children}
    </LanguageContext.Provider>
  );
};

export default LanguageContext;
