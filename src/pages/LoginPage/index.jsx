import React, { useState } from 'react';
import { TextField, Button, Box, Typography, Container, CssBaseline, Avatar } from '@mui/material';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { createTheme, ThemeProvider } from '@mui/material/styles';
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
      console.log(role+"ro"); // Gọi hàm login và lấy vai trò
      if (role === 'Admin') {
        navigate('/admin'); // Điều hướng đến trang admin
      } else {
     //   navigate('/user'); // Điều hướng đến trang người dùng
      }
    } catch (error) {
      console.error('Login failed', error);
      // Xử lý lỗi (ví dụ: hiển thị thông báo lỗi cho người dùng)
    }
  };

  const handleChange = (event) => {
    setData({
      ...data,
      [event.target.name]: event.target.value
    });
  };

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
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
            Sign In
          </Typography>
          <Box sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
              onChange={handleChange}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
              onChange={handleChange}
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              onClick={handleSubmit}
            >
              Sign In
            </Button>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}
