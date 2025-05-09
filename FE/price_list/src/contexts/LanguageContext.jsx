import { createContext, useState, useEffect, useContext } from "react";
import axios from "axios";

const LanguageContext = createContext();

const baseURL = import.meta.env.VITE_API_URL || "http://localhost:3000/api";

export const useLanguage = () => useContext(LanguageContext);

export const LanguageProvider = ({ children }) => {
  const [language, setLanguage] = useState("en");
  const [translations, setTranslations] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTranslations = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`${baseURL}/translations/${language}`);
        if (response.data.success) {
          setTranslations(response.data.data);
        }
      } catch (error) {
        console.error("Error fetching translations:", error);
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
