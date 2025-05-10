import LanguageSwitcher from "./LanguageSwitcher";
import { FiMenu } from "react-icons/fi";
import { motion } from "framer-motion";
import "../styles/Header.css";

const Header = ({ toggleSidebar }) => {
  const profile = {
    name: "John Andre",
    company: "Storfjord AS",
    avatar: "/public/profile-avatar.png",
  };

  return (
    <motion.header
      className="header"
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ type: "spring", stiffness: 300, damping: 30 }}
    >
      <div className="header-content">
        <div className="header-left">
          {/* Hamburger menu */}
          <motion.button
            className="menu-button"
            onClick={toggleSidebar}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
          >
            <FiMenu />
          </motion.button>

          {/* Profile section - visible on desktop */}
          <div className="profile-section">
            <div className="profile-avatar">
              {/* Fallback avatar if image is not available */}
              {profile.avatar ? (
                <img
                  src={profile.avatar || "/placeholder.svg"}
                  alt={profile.name}
                />
              ) : (
                <div className="avatar-placeholder">
                  {profile.name.charAt(0)}
                </div>
              )}
            </div>
            <div className="profile-info">
              <div className="profile-name">{profile.name}</div>
              <div className="profile-company">{profile.company}</div>
            </div>
          </div>
        </div>

        <div className="header-actions">
          <LanguageSwitcher />
        </div>
      </div>
    </motion.header>
  );
};

export default Header;
