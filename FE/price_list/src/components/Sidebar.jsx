import { useAuth } from "../contexts/AuthContext";
import { NavLink, useNavigate } from "react-router-dom";
import "../styles/Sidebar.css";

const Sidebar = ({ isOpen, toggleSidebar }) => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const menuItems = [
    {
      title: "Invoices",
      icon: "📄",
      path: "/invoices",
      color: "#4dabf7",
    },
    {
      title: "Customers",
      icon: "👤",
      path: "/customers",
      color: "#38d9a9",
    },
    {
      title: "My Business",
      icon: "🏢",
      path: "/business",
      color: "#74c0fc",
    },
    {
      title: "Invoice Journal",
      icon: "📒",
      path: "/invoice-journal",
      color: "#4dabf7",
    },
    {
      title: "Price List",
      icon: "📊",
      path: "/price-list",
      active: true,
      color: "#fcc419",
    },
    {
      title: "Multiple Invoicing",
      icon: "📑",
      path: "/multiple-invoicing",
      color: "#4dabf7",
    },
    {
      title: "Unpaid Invoices",
      icon: "⚠️",
      path: "/unpaid-invoices",
      color: "#ff6b6b",
    },
    {
      title: "Offer",
      icon: "🎁",
      path: "/offer",
      color: "#fcc419",
    },
    {
      title: "Inventory Control",
      icon: "📦",
      path: "/inventory",
      color: "#4dabf7",
    },
    {
      title: "Member Invoicing",
      icon: "👥",
      path: "/member-invoicing",
      color: "#4dabf7",
    },
    {
      title: "Import/Export",
      icon: "☁️",
      path: "/import-export",
      color: "#74c0fc",
    },
    {
      title: "Log out",
      icon: "🚪",
      path: "#", // Changed from "/logout" to "#" to prevent navigation
      color: "#ced4da",
      isLogout: true, // Add a flag to identify this as the logout item
    },
  ];

  if (!user) {
    return null;
  }

  return (
    <aside className={`sidebar ${isOpen ? "open" : ""}`}>
      <div className="sidebar-header">
        <div className="menu-title">Menu</div>
      </div>

      <div className="sidebar-divider"></div>

      <nav className="sidebar-nav">
        <ul className="sidebar-menu">
          {menuItems.map((item) => (
            <li
              key={item.path}
              className={`sidebar-menu-item ${item.active ? "active" : ""}`}
            >
              <NavLink
                to={item.path}
                className={({ isActive }) =>
                  isActive ? "sidebar-link active" : "sidebar-link"
                }
                onClick={(e) => {
                  if (item.isLogout) {
                    e.preventDefault(); // Prevent default navigation
                    logout(); // Call the logout function
                    navigate("/"); // Navigate to login page after logout
                  }

                  if (window.innerWidth < 1024) {
                    toggleSidebar();
                  }
                }}
              >
                <span className="sidebar-icon" style={{ color: item.color }}>
                  {item.icon}
                </span>
                <span>{item.title}</span>
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  );
};

export default Sidebar;
