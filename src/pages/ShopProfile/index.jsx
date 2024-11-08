import React, { useState, useEffect } from 'react';
import {
  ProfileContainer,
  ProfileCard,
} from './ProfilePage.style';
import { Card, CardContent, Typography, CardMedia, Grid, Box } from '@mui/material';
import StarIcon from '@mui/icons-material/Star';
import { Button, TextField, Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material';
import { ApiGetShopById } from '../../services/ShopServices';
import { useNavigate } from 'react-router-dom';
export default function ShopProfile() {
  const navigate = useNavigate();
  const [shop, setShop] = useState([]);
  const [roundedRate, setRoundedRate] = useState(1);
  const [userData, setUserData] = useState({
    firstName: '',
    lastName: '',
    avatar: null,
    phone: '',
    createDate: '',
    lastUpdateDate: '',
    role: '', // Change from array to string to reflect single role
    shopId: '',
    shopName: '',
  });
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [updatedData, setUpdatedData] = useState({
    firstName: '',
    lastName: '',
    phone: '',
  });
  const [selectedFile, setSelectedFile] = useState(null); // State for selected file
  const token = localStorage.getItem('token');
  // Fetch user profile data from API
  useEffect(() => {
    const fetchProfileShopData = async () => {
      const shopId = localStorage.getItem('shopId');
      if (!shopId) {
        alert('ShopId is not found');
        navigate('/login'); // Navigate to add product page
        return;
      }
      const result = await ApiGetShopById(shopId);
      if (result.ok) {
        setShop(result.body.data);
        setRoundedRate(Math.round(result.body.data.rate))
      } else {
        alert(result.message);
      }
    };
    fetchProfileShopData();
  }, [token]);
  // Open dialog for editing the profile
  const handleOpenEditDialog = () => {
    setUpdatedData({
      firstName: userData.firstName,
      lastName: userData.lastName,
      phone: userData.phone,
    });
    setEditDialogOpen(true);
  };
  // Close the edit dialog
  const handleCloseEditDialog = () => {
    setEditDialogOpen(false);
    setSelectedFile(null); // Reset selected file when closing the dialog
  };
  // Save the updated data
  const handleSave = async () => {
    try {
      console.log('Token:', token);
      console.log('Updated Data:', updatedData); // Log updated data to debug the request payload
      // Create a FormData object
      const formData = new FormData();
      formData.append('firstName', updatedData.firstName);
      formData.append('lastName', updatedData.lastName);
      formData.append('phone', updatedData.phone);
      // Append selected file if it exists
      if (selectedFile) {
        formData.append('avatar', selectedFile); // Append selected file
      }
      const response = await fetch('https://bms-fs-api.azurewebsites.net/api/Account', {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
        body: formData,
      });
      if (response.ok) {
        const updatedProfile = await response.json();
        if (updatedProfile && updatedProfile.data) {
          setUserData(updatedProfile.data); // Update the state with the returned updated data
          setEditDialogOpen(false);
          setSelectedFile(null); // Reset selected file after successful update
        }
      } else {
        let errorMessage = 'Failed to update profile';
        try {
          const errorResponse = await response.json();
          errorMessage = errorResponse.message || errorMessage; // Log specific error message
          console.error('Error response:', errorResponse); // Log the entire error response for debugging
        } catch (e) {
          console.error('Error parsing error response:', e);
        }
        console.error(errorMessage);
        alert(`Error: ${errorMessage}`);
      }
    } catch (error) {
      if (error instanceof TypeError) {
        alert('Network error: Please check your internet connection.');
      } else {
        console.error('Network or other error:', error);
        alert(`Error: ${error.message}`);
      }
    }
  };
  return (
    <ProfileContainer>
      <ProfileCard>
        <Card className="shadow-sm p-3 mb-5 bg-white rounded">
          <Grid container spacing={2}>
            {/* Hình ảnh shop */}
            <Grid item xs={12} sm={4}>
              <CardContent>
                <CardMedia
                  component="img"
                  height="200"
                  image={'https://media.istockphoto.com/id/1425139113/photo/purchasing-goods-with-smartphone-at-grocery-store.jpg?s=612x612&w=0&k=20&c=xMbZgp4BZAWCH_j7UkM9YiYTXcpS4zqg3MW4_jRmriM='} // Đường dẫn hình ảnh mặc định nếu shop.Image là null
                  alt={shop.name}
                />
              </CardContent>
            </Grid>
            {/* Thông tin chi tiết */}
            <Grid item xs={12} sm={8}>
              <CardContent sx={{ textAlign: 'left' }}>
                <Typography variant="h5" component="div" className="mb-2">
                  {shop.name}
                </Typography>
                {/* Hiển thị các ngôi sao đánh giá */}
                <Box className="mb-2">
                  {[...Array(roundedRate)].map((_, index) => (
                    <StarIcon key={index} style={{ color: '#FFD700' }} />
                  ))}
                </Box>
                <Typography variant="body2" color="textSecondary" className="mb-2">
                  {shop.description || "No description available"}
                </Typography>
                <Box className="mb-2">
                  <strong>Email:</strong> {shop.email}
                </Box>
                <Box className="mb-2">
                  <strong>Phone:</strong> {shop.phoneNumber || "Not provided"}
                </Box>
                <Box className="mb-2">
                  <strong>Address:</strong> {shop.address}
                </Box>
              </CardContent>
            </Grid>
          </Grid>
        </Card>
        <Button variant="contained" color="primary" onClick={handleOpenEditDialog} sx={{
          borderRadius: '15px',
          margin: '20px 0',
          fontSize: '16px',
          background: 'linear-gradient(135deg, #b4ec51, #429321, #0f9b0f)',
          boxShadow: '0px 6px 12px rgba(0,0,0,0.1)',
        }}>
          Update Profile
        </Button>
        {/* Dialog for editing profile */}
        <Dialog open={editDialogOpen} onClose={handleCloseEditDialog}>
          <DialogTitle>Edit Profile</DialogTitle>
          <DialogContent>
            <TextField
              autoFocus
              margin="dense"
              label="First Name"
              fullWidth
              value={updatedData.firstName}
              onChange={(e) => setUpdatedData({ ...updatedData, firstName: e.target.value })}
            />
            <TextField
              margin="dense"
              label="Last Name"
              fullWidth
              value={updatedData.lastName}
              onChange={(e) => setUpdatedData({ ...updatedData, lastName: e.target.value })}
            />
            <TextField
              margin="dense"
              label="Phone"
              fullWidth
              value={updatedData.phone}
              onChange={(e) => setUpdatedData({ ...updatedData, phone: e.target.value })}
            />
            <input
              type="file"
              onChange={(e) => setSelectedFile(e.target.files[0])}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCloseEditDialog} color="secondary">
              Cancel
            </Button>
            <Button onClick={handleSave} color="primary">
              Save
            </Button>
          </DialogActions>
        </Dialog>
      </ProfileCard>
    </ProfileContainer>
  );
}