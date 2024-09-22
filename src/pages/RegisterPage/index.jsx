import React, { useState } from 'react';
import { TextField, Button, Box, Typography, Container, Avatar, Grid, Link } from '@mui/material';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { StyledSelect } from './RegisterPage.style';

const theme = createTheme();

export default function Register() {
  const [data, setData] = useState({
    email: "",
    firstName: "",
    lastName: "",
    password: ""
  });
  const [selectedRole, setSelectedRole] = useState('');

  const handleSelectChange = (event) => {
    setSelectedRole(event.target.value);
  };

  const handleChange = (event) => {
    setData({
      ...data,
      [event.target.name]: event.target.value
    });
  };

  const handleSubmit = () => {
    fetch(`https://bms-fs-api.azurewebsites.net/api/Auth/register?role=${selectedRole}`, {
      method: "POST",
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    })
    .then(response => {
      if (!response.ok) {
          throw new Error('Network response was not ok');
      }
      return response.json();
    })
    .then(data => {
        setData({
          email: "",
          firstName: "",
          lastName: "",
          password: ""
        });
        console.log('Success:', data);
    })
    .catch(error => {
        console.error('Error:', error);
    });
  };

  return (
    <ThemeProvider theme={theme}>
      <Box
        sx={{
          minHeight: '100vh',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          background: 'linear-gradient(135deg, #1abc9c, #16a085)', 
          width: '100%',
          padding: '0',
          margin: '0',
        }}
      >
        <Box
          sx={{
            backgroundColor: '#fff',
            padding: '30px',
            borderRadius: '10px',
            boxShadow: '0 8px 16px rgba(0, 0, 0, 0.1)',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            width: '100%',
            maxWidth: '500px',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign Up
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
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
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
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="new-password"
                  onChange={handleChange}
                  InputProps={{
                    style: { borderRadius: '30px' },
                  }}
                />
              </Grid>
              <StyledSelect item xs={12}>
                <select id="roles" value={selectedRole} onChange={handleSelectChange} className="select-dropdown">
                  <option value="">--Please choose an option--</option>
                  <option value="1">User</option>
                  <option value="2">Shop</option>
                  <option value="3">Staff</option>
                  <option value="4">Admin</option>
                </select>
              </StyledSelect>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="success"
              sx={{
                mt: 5,
                mb: 2,
                borderRadius: '30px',
                padding: '10px 0',
                fontSize: '18px',
              }}
              onClick={handleSubmit}
            >
              Sign Up
            </Button>

            <Typography variant="body2" align="center">
              <Link href="/login" variant="body2" underline="none" color="primary">
                Already have an account? Sign in →
              </Link>
            </Typography>
          </Box>
        </Box>
      </Box>
    </ThemeProvider>
  );
}
