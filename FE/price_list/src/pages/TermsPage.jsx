import { useLanguage } from "../contexts/LanguageContext";
import LanguageSwitcher from "../components/LanguageSwitcher";
import { motion } from "framer-motion";
import "../styles/TermsPage.css";

const TermsPage = () => {
  const { t } = useLanguage();

  const handleBackToLogin = () => {
    // In a real app, this would use React Router's navigate
    window.location.href = "/login";
  };

  const handleDiamondClick = () => {
    // Redirect to login page when diamond is clicked
    window.location.href = "/login";
  };

  return (
    <div className="terms-container">
      <div className="navigation">
        <div className="nav-links">
          <a href="#" className="nav-link">
            Home
          </a>
          <a href="#" className="nav-link">
            Order
          </a>
          <a href="#" className="nav-link">
            Our Customers
          </a>
          <a href="#" className="nav-link">
            About us
          </a>
          <a href="#" className="nav-link">
            Contact Us
          </a>
        </div>
        <div className="language-selector">
          <LanguageSwitcher />
        </div>
      </div>

      <div className="diamond-icon-container">
        <img
          src="https://storage.123fakturera.se/public/icons/diamond.png"
          alt="Diamond"
          className="diamond-icon"
          onClick={handleDiamondClick}
        />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{
          duration: 0.6,
          type: "spring",
          stiffness: 300,
          damping: 30,
        }}
        className="terms-content-wrapper"
      >
        <h1 className="terms-title">{t("terms.title")}</h1>

        <motion.button
          className="back-button"
          onClick={handleBackToLogin}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.97 }}
        >
          {t("terms.backToLogin")}
        </motion.button>

        <div className="terms-content">
          <div className="terms-box">
            <p>{t("terms.content")}</p>
          </div>
        </div>

        <motion.button
          className="back-button"
          onClick={handleBackToLogin}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.97 }}
        >
          {t("terms.backToLogin")}
        </motion.button>
      </motion.div>
    </div>
  );
};

export default TermsPage;
