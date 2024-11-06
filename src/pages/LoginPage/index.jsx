import React, { useContext, useState } from 'react';
import { TextField, Button, Box, Typography, Avatar, IconButton, InputAdornment } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import EmailIcon from '@mui/icons-material/Email';
import LockIcon from '@mui/icons-material/Lock';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff'; // Import icon Visibility
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';
import AuthContext from '../../auth/AuthContext';
import { ApiLoginByAccount } from '../../services/AuthServices';
import { ApiGetProfile } from '../../services/AccountServices';

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
  const { setUser } = useContext(AuthContext)

  const [data, setData] = useState({
    email: '',
    password: '',
  });
  const [showPassword, setShowPassword] = useState(false); // Thêm state để theo dõi trạng thái hiển thị mật khẩu
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmitLogin = async (e) => {
    e.preventDefault();
    if (!data.email || !data.password) {
      alert('Please enter both email and password');
      return;
    }
    const result = await ApiLoginByAccount(data);
    if (result.ok) {
      alert("Login successful! Welcome back!");
      localStorage.setItem('token', result.body.data.token); // Lưu token vào localStorage
      const decoded = jwtDecode(result.body.data.token);
      setUser(decoded);
      navigateAfterLogin(decoded, result.body.data.token);
    } else {
      alert(result.message);
    }
  };

  const navigateAfterLogin = (decoded, token) => {
    if (decoded.role.includes('Admin')) {
      navigate('/admin');
    } else if (decoded.role.includes('Staff')) {
      navigate('/home-staff');
    } else if (decoded.role.includes('Shop')) {
      setShopLocalInfo(token);
      navigate('/shop');
    } else {
      alert('Unauthorized role');
    }
  }

  const setShopLocalInfo = async (token) => {
    const result = await ApiGetProfile(token);
    if (result.ok) {
      localStorage.setItem ("shopId", result.body.data.shopId);
      localStorage.setItem("shopName", result.body.data.shopName);
    }
  }
  
  const handleChange = (event) => {
    setData({
      ...data,
      [event.target.name]: event.target.value,
    });
    setError('');
  };

  const handleClickShowPassword = () => {
    setShowPassword((prev) => !prev); // Thay đổi trạng thái hiển thị mật khẩu
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

          <Box component="form" onSubmit={handleSubmitLogin} sx={{ mt: 1, width: '100%', maxWidth: '400px' }}>
            <Typography component="h1" variant="h5" sx={{ textAlign: 'center', marginBottom: 2 }}>
              Member Login
            </Typography>

            {error && (
              <Typography color="error" variant="body2" align="center" sx={{ marginBottom: 2 }}>
                {error}
              </Typography>
            )}

            <Box sx={{ display: 'flex', alignItems: 'center', marginBottom: 3 }}>
              <EmailIcon sx={{ mr: 1, color: '#3498db' }} />
              <TextField
                variant="outlined"
                placeholder="Email"
                name="email"
                type= {'email'}
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
                type={showPassword ? 'text' : 'password'}
                required
                fullWidth
                onChange={handleChange}
                InputProps={{
                  style: { borderRadius: '30px' },
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={handleClickShowPassword}
                        edge="end"
                      >
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  ),
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

            <Box 
              sx={{ display: 'flex', justifyContent: 'space-between', marginBottom: 2 }}
            >
              <Typography variant="body2">
                <RouterLink to="/forgot-password" style={{ textDecoration: 'none', color: '#3498db' }}>
                  Forgot Password
                </RouterLink>
              </Typography>
              
              <Typography variant="body2">
                <RouterLink to="/join-shop" style={{ textDecoration: 'none', color: '#3498db' }}>
                  Join as a Shop Owner
                </RouterLink>
              </Typography>
            </Box>

            <Typography variant="body2" align="center" sx={{ marginBottom: 2 }}>
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