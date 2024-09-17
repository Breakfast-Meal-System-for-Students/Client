import React, { useState } from 'react';
import { TextField, Button, Box, Typography, Container, Avatar, Grid } from '@mui/material';
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
    })
  }

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
      return response.json(); // Convert the response to JSON
    })
    .then(data => {
        setData({
          email: "",
          firstName: "",
          lastName: "",
          password: ""
        })
        console.log('Success:', data); // Handle success
    })
    .catch(error => {
        console.error('Error:', error); // Handle errors
    });
  };

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign Up
          </Typography>
          <Box  sx={{ mt: 3 }}>
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
                  onChange={e => handleChange(e)}
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
                  onChange={e => handleChange(e)}
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
                  onChange={e => handleChange(e)}
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
                  onChange={e => handleChange(e)}
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
              sx={{ mt: 9, mb: 2 }}
              onClick={handleSubmit}
            >
              Sign Up
            </Button>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}
