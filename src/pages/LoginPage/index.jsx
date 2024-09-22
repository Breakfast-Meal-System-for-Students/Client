import React, { useState } from 'react';
import { TextField, Button, Box, Typography, Container, Avatar, Link } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import EmailIcon from '@mui/icons-material/Email';
import LockIcon from '@mui/icons-material/Lock';
import { useAuth } from '../../auth/AuthContext';
import { useNavigate } from 'react-router-dom';

const theme = createTheme();

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
          minHeight: '100vh', // Ensures the box takes up the full viewport height
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          background: 'linear-gradient(135deg, #1abc9c, #16a085)', // Greenish-blue gradient
          width: '100%', // Full width
          padding: '0', // No padding to ensure background fits fully
          margin: '0', // No margin
        }}
      >
        <Box
          sx={{
            backgroundColor: '#fff',
            padding: '20px',
            borderRadius: '10px',
            boxShadow: '0 8px 16px rgba(0, 0, 0, 0.1)',
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-around',
            width: '100%',
            maxWidth: '900px',
          }}
        >
          {/* Image or illustration section */}
          <Box>
            <Avatar sx={{ width: 200, height: 200, bgcolor: 'secondary.light', marginBottom: 2 }}>
              <LockOutlinedIcon sx={{ fontSize: 100 }} />
            </Avatar>
          </Box>

          {/* Login form section */}
          <Box component="form" onSubmit={handleSubmit} sx={{ mt: 1, width: '100%', maxWidth: '400px' }}>
            <Typography component="h1" variant="h5" sx={{ textAlign: 'center', marginBottom: 2 }}>
              Member Login
            </Typography>
            <Box sx={{ display: 'flex', alignItems: 'center', marginBottom: 2 }}>
              <EmailIcon sx={{ mr: 1 }} />
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
            <Box sx={{ display: 'flex', alignItems: 'center', marginBottom: 2 }}>
              <LockIcon sx={{ mr: 1 }} />
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
              color="success"
              sx={{
                borderRadius: '30px',
                padding: '10px 0',
                margin: '20px 0',
                fontSize: '18px',
              }}
            >
              LOGIN
            </Button>

            <Typography variant="body2" align="center" sx={{ marginBottom: 2 }}>
              <Link href="#" variant="body2" underline="none" color="primary">
                Forgot Username / Password?
              </Link>
            </Typography>

            <Typography variant="body2" align="center">
              <Link href="#" variant="body2" underline="none" color="primary">
                Create your Account →
              </Link>
            </Typography>
          </Box>
        </Box>
      </Box>
    </ThemeProvider>
  );
}
