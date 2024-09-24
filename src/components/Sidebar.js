import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  FaHome,
  FaCog,
  FaFileAlt,
  FaListAlt,
  FaComments,
  FaBars,
  FaSignOutAlt,
} from "react-icons/fa";
import { useAuth } from "../auth/AuthContext"; // Import the auth context

const Sidebar = () => {
  const [hoveredItem, setHoveredItem] = useState(null);
  const [isOpen, setIsOpen] = useState(false);
  const { logout } = useAuth(); // Get the logout function from context

  const handleMouseEnter = (index) => {
    setHoveredItem(index);
  };

  const handleMouseLeave = () => {
    setHoveredItem(null);
  };

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  const handleLogout = async () => {
    try {
      // Fetch API call to logout
      await fetch('https://bms-fs-api.azurewebsites.net/api/Auth/logout', {
        method: 'POST', // Use POST method
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem("token")}` // Include token in the Authorization header
        },
      });

      // Call the logout function to clear the token from context
      await logout();

      // Optionally, you can redirect to the login page after logout
      // window.location.href = '/login'; // Uncomment if you want to redirect
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  return (
    <div style={isOpen ? styles.sidebarOpen : styles.sidebarClosed}>
      <div style={styles.sidebarHeader}>
        <FaBars style={styles.menuIcon} onClick={toggleSidebar} />
        {isOpen && <h2 style={styles.headerText}>Staff</h2>}
      </div>
      <ul style={styles.sidebarMenu}>
        {menuItems.map((item, index) => (
          <li
            key={index}
            style={styles.menuItem}
            onMouseEnter={() => handleMouseEnter(index)}
            onMouseLeave={handleMouseLeave}
          >
            <Link to={item.path} style={styles.link}>
              <item.icon style={styles.menuIcon} />
              {isOpen && (
                <span
                  style={{
                    ...styles.menuText,
                    display: hoveredItem === index || isOpen ? "block" : "none",
                  }}
                >
                  {item.text}
                </span>
              )}
            </Link>
          </li>
        ))}
      </ul>
      <div style={styles.signOutSection}>
        <Link to="/login" onClick={handleLogout} style={styles.link}>
          <FaSignOutAlt style={styles.menuIcon} />
          {isOpen && <span style={styles.menuText}>Sign Out</span>}
        </Link>
      </div>
    </div>
  );
};

const menuItems = [
  { text: "HomeStaff", icon: FaHome, path: "/home-staff" },
  {
    text: "Account",
    icon: FaFileAlt,
    path: "/Account",
  },
  { text: "CRUD Category", icon: FaListAlt, path: "/crud-category" },
  { text: "Feedback", icon: FaComments, path: "/Feedback" },
  { text: "Settings", icon: FaCog, path: "/setting" },
  { text: "Shop Application", icon: FaListAlt, path: "/shop-application" },
];

const styles = {
  sidebarOpen: {
    width: "250px",
    height: "100vh",
    background: "linear-gradient(180deg, #3d996c, #00cc69)",
    position: "fixed",
    top: 0,
    left: 0,
    transition: "width 0.3s",
    borderTopRightRadius: "3px",
    borderBottomRightRadius: "3px",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    paddingTop: "20px",
    justifyContent: "space-between",
  },
  sidebarClosed: {
    width: "80px",
    height: "100vh",
    background: "linear-gradient(180deg, #3d996c, #00cc69)",
    position: "fixed",
    top: 0,
    left: 0,
    transition: "width 0.3s",
    borderTopRightRadius: "3px",
    borderBottomRightRadius: "3px",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    paddingTop: "20px",
    justifyContent: "space-between",
  },
  sidebarHeader: {
    color: "white",
    marginBottom: "60px",
    textAlign: "center",
    fontSize: "17px",
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-start",
    width: "100%",
    paddingLeft: "20px",
  },
  sidebarMenu: {
    listStyleType: "none",
    padding: 0,
    margin: 0,
    width: "100%",
  },
  menuItem: {
    display: "flex",
    alignItems: "center",
    padding: "10px",
    marginBottom: "20px",
    color: "white",
    cursor: "pointer",
    width: "100%",
    textAlign: "left",
  },
  menuIcon: {
    fontSize: "25px",
    marginRight: "15px",
  },
  headerText: {
    fontSize: "25px",
    marginLeft: "15px",
  },
  menuText: {
    fontSize: "16px",
    lineHeight: "20px",
  },
  link: {
    textDecoration: "none",
    color: "white",
    display: "flex",
    alignItems: "center",
  },
  signOutSection: {
    marginBottom: "300px",
    textAlign: "center",
    width: "100%",
    padding: "90px 0",
  },
};

export default Sidebar;
