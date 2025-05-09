import { useAuth } from "../contexts/AuthContext";
import { useLanguage } from "../contexts/LanguageContext";
import { NavLink } from "react-router-dom";
import { FiHome, FiPackage, FiUser, FiSettings, FiX } from "react-icons/fi";
import { motion, AnimatePresence } from "framer-motion";
import "../styles/Sidebar.css";

const Sidebar = ({ isOpen, toggleSidebar }) => {
  const { user } = useAuth();
  // eslint-disable-next-line no-unused-vars
  const { t } = useLanguage();

  const menuItems = [
    {
      title: "Dashboard",
      icon: <FiHome />,
      path: "/dashboard",
    },
    {
      title: "Products",
      icon: <FiPackage />,
      path: "/products",
    },
    {
      title: "Profile",
      icon: <FiUser />,
      path: "/profile",
    },
    {
      title: "Settings",
      icon: <FiSettings />,
      path: "/settings",
    },
  ];

  if (!user) {
    return null;
  }

  return (
    <>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="sidebar-overlay"
            onClick={toggleSidebar}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          />
        )}
      </AnimatePresence>

      <motion.aside
        className={`sidebar ${isOpen ? "open" : ""}`}
        animate={{
          x: isOpen ? 0 : "-100%",
          boxShadow: isOpen ? "10px 0 30px rgba(0, 0, 0, 0.1)" : "none",
        }}
        transition={{ type: "spring", stiffness: 400, damping: 40 }}
      >
        <div className="sidebar-header">
          <motion.div
            className="user-info"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <div className="user-avatar">
              {user.username.charAt(0).toUpperCase()}
            </div>
            <div className="user-details">
              <span className="user-name">{user.username}</span>
              <span className="user-role">Admin</span>
            </div>
          </motion.div>
          <motion.button
            className="close-sidebar"
            onClick={toggleSidebar}
            whileHover={{ scale: 1.1, rotate: 90 }}
            whileTap={{ scale: 0.9 }}
          >
            <FiX />
          </motion.button>
        </div>

        <nav className="sidebar-nav">
          <motion.ul
            className="sidebar-menu"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, staggerChildren: 0.1 }}
          >
            {menuItems.map((item, index) => (
              <motion.li
                key={item.path}
                className="sidebar-menu-item"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.1 * index }}
              >
                <NavLink
                  to={item.path}
                  className={({ isActive }) =>
                    isActive ? "sidebar-link active" : "sidebar-link"
                  }
                  onClick={() => {
                    if (window.innerWidth < 1024) {
                      toggleSidebar();
                    }
                  }}
                >
                  <span className="sidebar-icon">{item.icon}</span>
                  <span>{item.title}</span>
                </NavLink>
              </motion.li>
            ))}
          </motion.ul>
        </nav>

        <div className="sidebar-footer">
          <p>© 2025 Product Manager</p>
        </div>
      </motion.aside>
    </>
  );
};

export default Sidebar;
