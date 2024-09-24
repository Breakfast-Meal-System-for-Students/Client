import React, { useState } from 'react';
import { TextField, Button, Box, Typography, Avatar } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import EmailIcon from '@mui/icons-material/Email';
import LockIcon from '@mui/icons-material/Lock';
import { Link as RouterLink, useNavigate } from 'react-router-dom'; 
import { useAuth } from '../../auth/AuthContext';

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

export default function Login() {
  const [data, setData] = useState({
    email: '',
    password: '',
  });
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const role = await login(data.email, data.password);
      if (role === 'Admin') {
        navigate('/admin');
      } else {
        navigate('/user');
      }
    } catch (error) {
      console.error('Login failed', error);
    }
  };

  const handleChange = (event) => {
    setData({
      ...data,
      [event.target.name]: event.target.value,
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
          background: 'linear-gradient(135deg, #74ebd5, #ACB6E5)', 
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
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-around',
            width: '100%',
            maxWidth: '900px',
          }}
        >
          <Box>
            <Avatar sx={{ width: 200, height: 200, bgcolor: '#3498db', marginBottom: 2 }}> 
              <LockOutlinedIcon sx={{ fontSize: 100 }} />
            </Avatar>
          </Box>

          <Box component="form" onSubmit={handleSubmit} sx={{ mt: 1, width: '100%', maxWidth: '400px' }}>
            <Typography component="h1" variant="h5" sx={{ textAlign: 'center', marginBottom: 2 }}>
              Member Login
            </Typography>
            <Box sx={{ display: 'flex', alignItems: 'center', marginBottom: 3 }}>
              <EmailIcon sx={{ mr: 1, color: '#3498db' }} />
              <TextField
                variant="outlined"
                placeholder="Email"
                name="email"
                required
                fullWidth
                onChange={handleChange}
                InputProps={{
                  style: { borderRadius: '30px' },
                }}
              />
            </Box>
            <Box sx={{ display: 'flex', alignItems: 'center', marginBottom: 3 }}>
              <LockIcon sx={{ mr: 1, color: '#3498db' }} />
              <TextField
                variant="outlined"
                placeholder="Password"
                name="password"
                type="password"
                required
                fullWidth
                onChange={handleChange}
                InputProps={{
                  style: { borderRadius: '30px' },
                }}
              />
            </Box>

            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              sx={{
                borderRadius: '30px',
                padding: '10px 0',
                margin: '20px 0',
                fontSize: '18px',
                background: 'linear-gradient(45deg, #74ebd5, #ACB6E5)', 
                boxShadow: '0px 6px 12px rgba(0,0,0,0.1)', 
              }}
            >
              LOGIN
            </Button>

            <Typography variant="body2" align="center" sx={{ marginBottom: 2 }}>
              <RouterLink to="/forgot-password" style={{ textDecoration: 'none', color: '#3498db' }}>
                Forgot Username / Password?
              </RouterLink>
            </Typography>

            <Typography variant="body2" align="center">
              <RouterLink to="/register" style={{ textDecoration: 'none', color: '#3498db' }}>
                Create your Account →
              </RouterLink>
            </Typography>
          </Box>
        </Box>
      </Box>
    </ThemeProvider>
  );
}
