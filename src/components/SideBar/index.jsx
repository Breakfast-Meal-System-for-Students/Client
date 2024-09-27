import React from 'react';
import { Drawer, List, ListItem, ListItemIcon, ListItemText, Divider, Toolbar, Typography, Box } from '@mui/material';
import HomeIcon from '@mui/icons-material/Home';
import AnalyticsIcon from '@mui/icons-material/Analytics';
import SettingsIcon from '@mui/icons-material/Settings';
import PersonIcon from '@mui/icons-material/Person';
import LogoutIcon from '@mui/icons-material/Logout';
import InfoIcon from '@mui/icons-material/Info'
import { Link, useNavigate } from 'react-router-dom';
import DensityMediumIcon from '@mui/icons-material/DensityMedium';

const sidebarItems = [
  { text: 'Dashboard', icon: <HomeIcon />, path: "/" },
  { text: 'Staff', icon: <AnalyticsIcon />, path: "/manage-staff" },
  { text: 'Customer', icon: <PersonIcon />, path: "/customer" },
  { text: 'Orders', icon: <SettingsIcon />, path: "/orders" },
  { text: 'Profile', icon: <InfoIcon />, path: "/profile" },
];

const drawerWidth = 240;

const Sidebar = () => {
  const navigate = useNavigate();  // useNavigate is used to redirect the user to login page after logout

  // Handle user logout
  const handleLogout = async () => {
    try {
      // Fetch logout API
      const response = await fetch('https://bms-fs-api.azurewebsites.net/api/Auth/logout', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}` // Pass the token in Authorization header
        }
      });

      if (response.ok) {
        // If logout is successful, remove token from localStorage
        localStorage.removeItem('token');

        navigate('/login');
      } else {
        console.error('Failed to log out');
      }
    } catch (error) {
      console.error('Error during logout:', error);
    }
  };

  return (
    <>
      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: drawerWidth,
            boxSizing: 'border-box',
            background: 'linear-gradient(180deg, #3d996c, #00cc69)',
            color: '#fff',
          },
        }}
        variant="persistent" 
        anchor="left"
        open
      >
        {/* Sidebar Header */}
        <Toolbar sx={{ padding: '16px !important' }}>
          <Box sx={{ minWidth: "56px" }}>
            <DensityMediumIcon />
          </Box>
          <Typography
            variant="h6"
            sx={{ flexGrow: 1 }}
            onClick={() => navigate('/')} // Điều hướng về trang "/"
            style={{ cursor: 'pointer' }}  // Thêm style để thay đổi con trỏ chuột khi di chuột lên Typography
          >
            Admin Panel
          </Typography>
        </Toolbar>
        <Divider />

        {/* Sidebar List */}
        <List>
          {sidebarItems.map((item, index) => (
            <ListItem
              button
              key={index}
              component={Link}
              to={item.path}
              sx={{ color: '#fff' }}
            >
              <ListItemIcon sx={{ color: '#fff' }}>{item.icon}</ListItemIcon>
              <ListItemText primary={item.text} />
            </ListItem>
          ))}

          <Divider />

          {/* Logout Button */}
          <ListItem button onClick={handleLogout} sx={{ color: '#fff' }}>
            <ListItemIcon sx={{ color: '#fff' }}>
              <LogoutIcon />
            </ListItemIcon>
            <ListItemText primary="Log Out" />
          </ListItem>
        </List>
      </Drawer>
    </>
  );
};

export default Sidebar;
