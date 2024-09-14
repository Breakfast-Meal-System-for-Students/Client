import React, { useState } from 'react';
import { Drawer, List, ListItem, ListItemIcon, ListItemText, Divider, IconButton, Toolbar, Typography, Box } from '@mui/material';
import HomeIcon from '@mui/icons-material/Home';
import AnalyticsIcon from '@mui/icons-material/Analytics';
import SettingsIcon from '@mui/icons-material/Settings';
import { Link } from 'react-router-dom';
import DensityMediumIcon from '@mui/icons-material/DensityMedium';

const sidebarItems = [
  { text: 'Dashboard', icon: <HomeIcon />, path: "/" },
  { text: 'Staff', icon: <AnalyticsIcon />, path: "/manage-staff" },
  { text: 'Customer', icon: <SettingsIcon />, path: "/customer" },
  { text: 'Orders', icon: <SettingsIcon />, path: "/orders" },
];

const drawerWidth = 240;

const Sidebar = () => {

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
            color: '#fff'
          },
        }}
        variant="persistent" // Can also use temporary for mobile-friendly
        anchor="left"
        open
      >
        {/* Sidebar Header */}
        <Toolbar sx={{padding: '16px !important'}}>
          <Box sx={{minWidth: "56px"}}>
            <DensityMediumIcon/>
          </Box>
          <Typography variant="h6" sx={{ flexGrow: 1 }}>
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
              sx={{ color: '#fff'}}
            >
              <ListItemIcon sx={{ color: '#fff' }}>{item.icon}</ListItemIcon>
              <ListItemText primary={item.text} />
            </ListItem>
          ))}
        </List>
      </Drawer>
    </>
  );
};

export default Sidebar;
