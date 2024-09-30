import React from "react";
import {
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Divider,
  Toolbar,
  Typography,
  Box,
} from "@mui/material";
import HomeIcon from "@mui/icons-material/Home";
import AnalyticsIcon from "@mui/icons-material/Analytics";
import SettingsIcon from "@mui/icons-material/Settings";
import PersonIcon from "@mui/icons-material/Person";
import LogoutIcon from "@mui/icons-material/Logout";
import PortraitIcon from "@mui/icons-material/Portrait";
import ConfirmationNumberIcon from "@mui/icons-material/ConfirmationNumber";
import RestaurantMenuIcon from "@mui/icons-material/RestaurantMenu";
import RateReviewOutlinedIcon from "@mui/icons-material/RateReviewOutlined";
import Inventory2OutlinedIcon from "@mui/icons-material/Inventory2Outlined";
import FmdGoodOutlinedIcon from "@mui/icons-material/FmdGoodOutlined";
import DensityMediumIcon from "@mui/icons-material/DensityMedium";
import {
  FaHome,
  FaFileAlt,
  FaListAlt,
  FaComments,
  FaCog,
} from "react-icons/fa"; // Import react-icons
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../auth/AuthContext";

const drawerWidth = 240;

const Sidebar = () => {
  const navigate = useNavigate();
  const { user } = useAuth();

  let sidebarItems = [
    { text: "Dashboard", icon: <HomeIcon />, path: "/" },
    { text: "Staff", icon: <AnalyticsIcon />, path: "/manage-staff" },
    { text: "Customer", icon: <PersonIcon />, path: "/customer-profile" },
    { text: "Orders", icon: <ConfirmationNumberIcon />, path: "/orders" },
    { text: "Profile", icon: <PortraitIcon />, path: "/profile" },
  ];

  if (user && user.role.includes("Staff")) {
    sidebarItems = [
      { text: "HomeStaff", icon: <FaHome />, path: "/home-staff" },

      { text: "Category", icon: <FaListAlt />, path: "/category" },
      { text: "Feedback", icon: <FaComments />, path: "/feedback" },
      { text: "Settings", icon: <FaCog />, path: "/setting" },
      {
        text: "Shop Application",
        icon: <FaListAlt />,
        path: "/shop-application",
      },
      { text: "Profile", icon: <PortraitIcon />, path: "/profile" },
    ];
  } else if (user && user.role.includes("Shop")) {
    sidebarItems = [
      { text: "Voucher", icon: <ConfirmationNumberIcon />, path: "/orders" },
      { text: "Breakfast-Menu", icon: <RestaurantMenuIcon />, path: "/orders" },
      { text: "Feedback", icon: <RateReviewOutlinedIcon />, path: "/Feedback" },
      { text: "Package", icon: <Inventory2OutlinedIcon />, path: "/orders" },
      { text: "Location", icon: <FmdGoodOutlinedIcon />, path: "/orders" },
      { text: "Profile", icon: <PortraitIcon />, path: "/profile" },
    ];
  }

  const handleLogout = async () => {
    try {
      const response = await fetch(
        "https://bms-fs-api.azurewebsites.net/api/Auth/logout",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      if (response.ok) {
        localStorage.removeItem("token");
        navigate("/login");
      } else {
        console.error("Failed to log out");
      }
    } catch (error) {
      console.error("Error during logout:", error);
    }
  };

  return (
    <Drawer
      sx={{
        width: drawerWidth,
        flexShrink: 0,
        "& .MuiDrawer-paper": {
          width: drawerWidth,
          boxSizing: "border-box",
          background: "linear-gradient(180deg, #3d996c, #00cc69)",
          color: "#fff",
        },
      }}
      variant="persistent"
      anchor="left"
      open
    >
      <Toolbar sx={{ padding: "16px !important" }}>
        <Box sx={{ minWidth: "56px" }}>
          <DensityMediumIcon />
        </Box>
        <Typography
          variant="h6"
          sx={{ flexGrow: 1 }}
          onClick={() => navigate("/")}
          style={{ cursor: "pointer" }}
        >
          Staff
        </Typography>
      </Toolbar>
      <Divider />
      <List>
        {sidebarItems.map((item, index) => (
          <ListItem
            button
            key={index}
            component={Link}
            to={item.path}
            sx={{ color: "#fff" }}
          >
            <ListItemIcon sx={{ color: "#fff" }}>{item.icon}</ListItemIcon>
            <ListItemText primary={item.text} />
          </ListItem>
        ))}
      </List>
      <Divider />
      <ListItem button onClick={handleLogout} sx={{ color: "#fff" }}>
        <ListItemIcon sx={{ color: "#fff" }}>
          <LogoutIcon />
        </ListItemIcon>
        <ListItemText primary="Log Out" />
      </ListItem>
    </Drawer>
  );
};

export default Sidebar;
