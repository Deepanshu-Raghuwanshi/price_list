import { useState, useEffect, useRef } from "react";
import { useLanguage } from "../contexts/LanguageContext";
import LanguageSwitcher from "../components/LanguageSwitcher";
import { motion } from "framer-motion";
import { initViewportHeightFix } from "../utils/viewportUtils";
import "../styles/TermsPage.css";

const TermsPage = () => {
  const { t } = useLanguage();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuRef = useRef(null);
  const hamburgerRef = useRef(null);

  const handleBackToLogin = () => {
    window.location.href = "/";
  };

  const handleDiamondClick = () => {
    window.location.href = "/";
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  // Close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        isMenuOpen &&
        menuRef.current &&
        hamburgerRef.current &&
        !menuRef.current.contains(event.target) &&
        !hamburgerRef.current.contains(event.target)
      ) {
        setIsMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isMenuOpen]);

  // Initialize viewport height fix for mobile
  useEffect(() => {
    initViewportHeightFix();

    // Add specific handling for the first scroll event
    const handleFirstScroll = () => {
      // Force the background to extend beyond viewport
      document.body.style.backgroundColor = "#000";
      document.documentElement.style.backgroundColor = "#000";

      // Remove the event listener after first scroll
      window.removeEventListener("scroll", handleFirstScroll);
    };

    window.addEventListener("scroll", handleFirstScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", handleFirstScroll);
    };
  }, []);

  return (
    <div className="terms-container">
      <div className="navigation">
        <div className="nav-container">
          <div
            ref={hamburgerRef}
            className={`hamburger-menu ${isMenuOpen ? "open" : ""}`}
            onClick={toggleMenu}
          >
            <div className={`hamburger-line ${isMenuOpen ? "open" : ""}`}></div>
            <div className={`hamburger-line ${isMenuOpen ? "open" : ""}`}></div>
            <div className={`hamburger-line ${isMenuOpen ? "open" : ""}`}></div>
          </div>

          <div
            ref={menuRef}
            className={`nav-links ${isMenuOpen ? "open" : ""}`}
          >
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
            <div dangerouslySetInnerHTML={{ __html: t("terms.content") }} />
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
