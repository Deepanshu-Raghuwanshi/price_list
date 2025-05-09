import { useLanguage } from "../contexts/LanguageContext";
// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";
import "../styles/LanguageSwitcher.css";

const LanguageSwitcher = () => {
  const { language, changeLanguage } = useLanguage();

  return (
    <div className="language-switcher">
      <button
        className={`language-btn ${language === "en" ? "active" : ""}`}
        onClick={() => changeLanguage("en")}
      >
        {language === "en" && (
          <motion.span
            layoutId="languageIndicator"
            className="language-indicator"
            transition={{ type: "spring", stiffness: 500, damping: 30 }}
          />
        )}
        <span>EN</span>
      </button>
      <button
        className={`language-btn ${language === "es" ? "active" : ""}`}
        onClick={() => changeLanguage("es")}
      >
        {language === "es" && (
          <motion.span
            layoutId="languageIndicator"
            className="language-indicator"
            transition={{ type: "spring", stiffness: 500, damping: 30 }}
          />
        )}
        <span>ES</span>
      </button>
    </div>
  );
};

export default LanguageSwitcher;
