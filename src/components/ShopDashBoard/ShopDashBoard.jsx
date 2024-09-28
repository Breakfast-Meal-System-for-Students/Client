
import React from 'react';
import { Box, Button, Typography, Grid, Paper } from '@mui/material';
import { styled } from '@mui/system';

// Sidebar component for navigation
const Sidebar = styled(Box)(({ theme }) => ({
  width: '250px',
  backgroundColor: '#28a745',
  padding: '20px',
  color: 'white',
  display: 'flex',
  flexDirection: 'column',
  height: '100vh',
  justifyContent: 'space-between',
}));

// Sidebar items
const MenuList = styled('ul')({
  listStyleType: 'none',
  padding: 0,
});

const MenuItem = styled('li')({
  margin: '20px 0',
  cursor: 'pointer',
  '&:hover': {
    textDecoration: 'underline',
  },
});

// Main content area styling
const MainContent = styled(Box)({
  flexGrow: 1,
  padding: '20px',
  backgroundColor: '#f4f4f4',
  height: '100vh',
  overflowY: 'auto',
});

// Paper component for each section
const FeatureCard = styled(Paper)(({ theme }) => ({
  padding: '20px',
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));

const ShopDashBoard = () => {
  return (
    <Box sx={{ display: 'flex' }}>
      {/* Sidebar */}
      <Sidebar>
        <Typography variant="h5" align="center" gutterBottom>
          Shop Dashboard
        </Typography>
        <MenuList>
          <MenuItem>Manage Breakfast Menus</MenuItem>
          <MenuItem>Handle Orders</MenuItem>
          <MenuItem>Manage Profiles</MenuItem>
          <MenuItem>Customer Feedback</MenuItem>
        </MenuList>
      </Sidebar>

      {/* Main content */}
      <MainContent>
        <Typography variant="h4" gutterBottom>
          Welcome to the Shop Dashboard
        </Typography>
        <Typography variant="body1" gutterBottom>
          Use the options on the sidebar to manage your shop functions.
        </Typography>

        <Grid container spacing={4}>
          {/* Manage Breakfast Menus */}
          <Grid item xs={12} md={6}>
            <FeatureCard elevation={3}>
              <Typography variant="h6" gutterBottom>
                Manage Breakfast Menus
              </Typography>
              <Typography variant="body1" gutterBottom>
                Add, update, or remove breakfast items available in your shop.
              </Typography>
              <Button variant="contained" color="primary">
                Go to Menus
              </Button>
            </FeatureCard>
          </Grid>

          {/* Handle Orders */}
          <Grid item xs={12} md={6}>
            <FeatureCard elevation={3}>
              <Typography variant="h6" gutterBottom>
                Handle Orders
              </Typography>
              <Typography variant="body1" gutterBottom>
                View and manage customer orders in real-time.
              </Typography>
              <Button variant="contained" color="primary">
                Go to Orders
              </Button>
            </FeatureCard>
          </Grid>

          {/* Manage Profiles */}
          <Grid item xs={12} md={6}>
            <FeatureCard elevation={3}>
              <Typography variant="h6" gutterBottom>
                Manage Profiles
              </Typography>
              <Typography variant="body1" gutterBottom>
                View and edit customer profiles for better service.
              </Typography>
              <Button variant="contained" color="primary">
                Go to Profiles
              </Button>
            </FeatureCard>
          </Grid>

          {/* Customer Feedback */}
          <Grid item xs={12} md={6}>
            <FeatureCard elevation={3}>
              <Typography variant="h6" gutterBottom>
                Customer Feedback
              </Typography>
              <Typography variant="body1" gutterBottom>
                Read and respond to feedback from your customers.
              </Typography>
              <Button variant="contained" color="primary">
                Go to Feedback
              </Button>
            </FeatureCard>
          </Grid>
        </Grid>
      </MainContent>
    </Box>
  );
};

export default ShopDashBoard;

