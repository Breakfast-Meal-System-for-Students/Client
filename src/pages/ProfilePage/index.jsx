import React, { useState, useEffect } from 'react';
import {ProfileContainer, ProfileCard,  StyledAvatar,  StyledList,  StyledListItem,  NameTypography,  RoleTypography,
} from './ProfilePage.style';
import {  Button,  TextField,  ListItemText,  Dialog,  DialogActions,  DialogContent,  DialogTitle,  Snackbar,} from '@mui/material';

export default function ProfilePage() {
  const [userData, setUserData] = useState({
    firstName: '',
    lastName: '',
    avatar: null,
    phone: '',
    createDate: '',
    lastUpdateDate: '',
    role: '',
    shopId: '',
    shopName: '',
  });

  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [updatedData, setUpdatedData] = useState({
    firstName: '',
    lastName: '',
    phone: '',
  });

  const [selectedFile, setSelectedFile] = useState(null);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const token = localStorage.getItem('token');

  useEffect(() => {
    const fetchProfileData = async () => {
      try {
        const response = await fetch(
          'https://bms-fs-api.azurewebsites.net/api/Account/my-profile',
          {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (response.ok) {
          const data = await response.json();
          setUserData({
            firstName: data.data.firstName,
            lastName: data.data.lastName,
            avatar: data.data.avatar,
            phone: data.data.phone,
            createDate: data.data.createDate,
            lastUpdateDate: data.data.lastUpdateDate,
            role: data.data.role,
            shopId: data.data.shopId,
            shopName: data.data.shopName,
          });
        } else {
          console.error('Failed to fetch profile data');
        }
      } catch (error) {
        console.error('Error fetching profile data:', error);
      }
    };

    fetchProfileData();
  }, [token]);

  const handleOpenEditDialog = () => {
    setUpdatedData({
      firstName: userData.firstName,
      lastName: userData.lastName,
      phone: userData.phone,
    });
    setEditDialogOpen(true);
  };

  const handleCloseEditDialog = () => {
    setEditDialogOpen(false);
    setSelectedFile(null);
  };

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

  const handleSave = async () => {
    try {
      // FormData for profile update
      const formData = new FormData();
      formData.append('firstName', updatedData.firstName);
      formData.append('lastName', updatedData.lastName);
      formData.append('phone', updatedData.phone);

      // Update profile info
      const profileResponse = await fetch(
        'https://bms-fs-api.azurewebsites.net/api/Account',
        {
          method: 'PUT',
          headers: {
            Authorization: `Bearer ${token}`,
          },
          body: formData,
        }
      );

      if (!profileResponse.ok) {
        const errorResponse = await profileResponse.json();
        throw new Error(errorResponse.message || 'Failed to update profile');
      }

      // Update avatar if a file is selected
      if (selectedFile) {
        const avatarFormData = new FormData();
        avatarFormData.append('avatar', selectedFile);

        const avatarResponse = await fetch(
          'https://bms-fs-api.azurewebsites.net/api/Account/update-avatar',
          {
            method: 'PUT',
            headers: {
              Authorization: `Bearer ${token}`,
            },
            body: avatarFormData,
          }
        );

        if (!avatarResponse.ok) {
          const avatarErrorResponse = await avatarResponse.json();
          throw new Error(
            avatarErrorResponse.message || 'Failed to update avatar'
          );
        }
      }

      // Fetch updated user data
      const updatedProfile = await profileResponse.json();
      if (updatedProfile && updatedProfile.data.data) {
        setUserData(updatedProfile.data.data  );
        setSnackbarOpen(true);
        handleCloseEditDialog();
      }
    } catch (error) {
      alert(`Error: ${error.message}`);
    }
  };

  return (
    <ProfileContainer>
      <ProfileCard>
        <StyledAvatar
          alt={`${userData.firstName} ${userData.lastName}`}
          src={userData.avatar || '/default-avatar.png'}
        >
          {userData.firstName[0]?.toUpperCase() +
            userData.lastName[0]?.toUpperCase()}
        </StyledAvatar>

        <NameTypography variant="h5">{`${userData.firstName} ${userData.lastName}`}</NameTypography>
        <RoleTypography variant="subtitle1" color="textSecondary">
          Role: {userData.role}
        </RoleTypography>

        <StyledList>
          <StyledListItem>
            <ListItemText primary="Phone" secondary={userData.phone || 'Not Provided'} />
          </StyledListItem>
          <StyledListItem>
            <ListItemText
              primary="Account Created"
              secondary={new Date(userData.createDate).toLocaleDateString()}
            />
          </StyledListItem>
          <StyledListItem>
            <ListItemText
              primary="Last Updated"
              secondary={new Date(userData.lastUpdateDate).toLocaleDateString()}
            />
          </StyledListItem>
        </StyledList>

        <Button
          variant="contained"
          color="primary"
          onClick={handleOpenEditDialog}
          style={{ marginTop: '20px' }}
        >
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
              onChange={(e) =>
                setUpdatedData({ ...updatedData, firstName: e.target.value })
              }
            />
            <TextField
              margin="dense"
              label="Last Name"
              fullWidth
              value={updatedData.lastName}
              onChange={(e) =>
                setUpdatedData({ ...updatedData, lastName: e.target.value })
              }
            />
            <TextField
              margin="dense"
              label="Phone"
              fullWidth
              value={updatedData.phone}
              onChange={(e) =>
                setUpdatedData({ ...updatedData, phone: e.target.value })
              }
            />
            <input
              type="file"
              accept="image/*"
              onChange={(e) => setSelectedFile(e.target.files[0])}
              style={{ marginTop: '10px' }}
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

      <Snackbar
        open={snackbarOpen}
        autoHideDuration={1000}
        onClose={handleSnackbarClose}
        message="Profile updated successfully!"
      />
    </ProfileContainer>
  );
}
