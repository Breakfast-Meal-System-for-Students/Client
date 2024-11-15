import React, { useState } from 'react';
import { TextField, Button, Box, Typography, Avatar, Grid, Link, InputAdornment, IconButton } from '@mui/material';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { StyledSelect } from './RegisterPage.style';
import { ApiRegisterAccount } from '../../services/AuthServices';
import { useNavigate } from 'react-router-dom';
import { SHOP_ROLE } from '../../constants/Constant';
import { ApiCreateShop } from '../../services/ShopServices';
const theme = createTheme({
  palette: {
    primary: {
      main: '#3498db',
    },
    secondary: {
      main: '#2ecc71',
    },
  },
});

const emptyUserData = {
  email: "",
  name: "",
  address: "",
  phone: "",
  description: "",
};

export default function ShopRegister() {
  const [data, setData] = useState(emptyUserData);
  const navigate = useNavigate();
  const handleSelectChange = (event) => {
    setSelectedRole(event.target.value);
  };
  const handleChange = (event) => {
    setData({
      ...data,
      [event.target.name]: event.target.value
    });
  };

  const handleSubmitRegister = async () => {
    if (!isValidateForm()) {
      return;
    } 
    
    const result = await ApiCreateShop(data.email, data.name, data.phone, data.address, data.description);
    if (result.ok) {
      setData(emptyUserData);
      alert("Shop registration successful, the password has been sent to your email.");
      navigate('/login');
    }else {
      alert(result.message);
    }
  };

  const isValidateForm = () => {
    if (data.email === "" || data.email === "undefined") {
      alert("Please provide a valid email address.");
      return false;
    }
    if (data.phone === "") {
      alert("Please provide a valid phone.");
      return false;
    }
    if (data.address === "") {
      alert("Please provide a valid address.");
      return false;
    }
    return true;
  }
  
  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);  
  };
  return (
    <ThemeProvider theme={theme}>
      <Box
        sx={{
          minHeight: '100vh',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          background: 'linear-gradient(135deg, #b4ec51, #429321, #0f9b0f)', 
          width: '100%',
          padding: '0',
          margin: '0',
        }}
      >
        <Box
          sx={{
            backgroundColor: '#fff',
            padding: '40px',
            borderRadius: '20px', 
            boxShadow: '0 10px 20px rgba(0, 0, 0, 0.15)', 
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            width: '100%',
            maxWidth: '500px',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: '#088A08' }}> 
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5"sx={{ textAlign: 'center', marginBottom: 2, fontWeight: 'bold', color: '#088A08' }}>
            SHOP REGISTRATION
          </Typography>
          <Box sx={{ mt: 3, width: '100%' }}>
            <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
                <TextField
                  autoComplete="given-name"
                  name="firstName"
                  required
                  fullWidth
                  id="firstName"
                  label="First Name"
                  autoFocus
                  onChange={handleChange}
                  InputProps={{
                    style: { borderRadius: '30px' },
                  }}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  id="lastName"
                  label="Last Name"
                  name="lastName"
                  autoComplete="family-name"
                  onChange={handleChange}
                  InputProps={{
                    style: { borderRadius: '30px' }, 
                  }}
                />
              </Grid>
              <Grid item xs={12} sm={12}>
                <TextField
                  name="name"
                  required
                  fullWidth
                  id="name"
                  label="Shop Name"
                  autoFocus
                  onChange={handleChange}
                  InputProps={{
                    style: { borderRadius: '30px' },
                  }}
                />
              </Grid>
              <Grid item xs={12} sm={12}>
                <TextField
                  required
                  fullWidth
                  id="phone"
                  label="Phone Number"
                  name="phone"
                  onChange={handleChange}
                  InputProps={{
                    style: { borderRadius: '30px' }, 
                  }}
                />
              </Grid>
              <Grid item xs={12} sm={12}>
                <TextField
                  name="address"
                  required
                  fullWidth
                  id="address"
                  label="Address"
                  autoFocus
                  onChange={handleChange}
                  InputProps={{
                    style: { borderRadius: '30px' },
                  }}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="email"
                  label="Shop Email"
                  name="email"
                  autoComplete="email"
                  onChange={handleChange}
                  InputProps={{
                    style: { borderRadius: '30px' }, 
                  }}
                />
              </Grid>
              <Grid item xs={12} sm={12}>
                <TextField
                  multiline
                  rows={5}
                  name="description"
                  fullWidth
                  id="description"
                  label="Description"
                  autoFocus
                  onChange={handleChange}
                  InputProps={{
                    style: { borderRadius: '30px' },
                  }}
                />
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary" 
              sx={{
                mt: 5,
                mb: 2,
                borderRadius: '30px', 
                padding: '10px 0',
                fontSize: '18px',
                background: 'linear-gradient(135deg, #b4ec51, #429321, #0f9b0f)', 
                boxShadow: '0px 6px 12px rgba(0,0,0,0.1)', 
              }}
              onClick={handleSubmitRegister}
            >
              Sign Up Your Shop 
            </Button>
            <Typography variant="body2" align="center">
              <Link href="/login" variant="body2" underline="none" sx={{ color: '#088A08' }}>
                Already have an account? Sign in →
              </Link>
            </Typography>
          </Box>
        </Box>
      </Box>
    </ThemeProvider>
  );
}