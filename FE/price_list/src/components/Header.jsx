import { useAuth } from "../contexts/AuthContext";
import { useLanguage } from "../contexts/LanguageContext";
import LanguageSwitcher from "./LanguageSwitcher";
import { FiLogOut, FiMenu } from "react-icons/fi";
import { motion } from "framer-motion";
import "../styles/Header.css";

const Header = ({ toggleSidebar, sidebarOpen }) => {
  const { user, logout } = useAuth();
  const { t } = useLanguage();

  return (
    <motion.header
      className={`header ${
        sidebarOpen && window.innerWidth >= 1024 ? "header-with-sidebar" : ""
      }`}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ type: "spring", stiffness: 300, damping: 30 }}
    >
      <div className="header-content">
        <div className="header-left">
          <motion.button
            className="menu-button"
            onClick={toggleSidebar}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
          >
            <FiMenu />
          </motion.button>
          <motion.h1
            className="header-title"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
          >
            {t("dashboard.title")}
          </motion.h1>
        </div>
        <div className="header-actions">
          <LanguageSwitcher />
          {user && (
            <motion.button
              className="logout-btn"
              onClick={logout}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <FiLogOut className="logout-icon" />
              <span className="logout-text">{t("common.logout")}</span>
            </motion.button>
          )}
        </div>
      </div>
    </motion.header>
  );
};

export default Header;
