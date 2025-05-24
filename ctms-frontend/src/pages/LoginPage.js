import React from 'react';
import { Container, TextField, Button, Typography, Box, Link } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

const LoginPage = () => {
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    // Login logic will go here
    alert('Login submitted');
  };

  return (
    <Container maxWidth="xs">
      <Box
        sx={{
          mt: 8,
          p: 4,
          boxShadow: 3,
          borderRadius: 2,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Typography variant="h5" mb={2}>
          Login
        </Typography>

        <form onSubmit={handleLogin} style={{ width: '100%' }}>
          <TextField
            label="Email"
            type="email"
            fullWidth
            margin="normal"
            required
          />
          <TextField
            label="Password"
            type="password"
            fullWidth
            margin="normal"
            required
          />
          <Button
            type="submit"
            variant="contained"
             onClick={() => {
    // تحقق من صحة البيانات (أو أي منطق)
    navigate('/'); // توجّه إلى الصفحة الرئيسية
  }}
            color="primary"
            fullWidth
            sx={{ mt: 2 }}
          >
            Login
          </Button>
        </form>

        {/* 👇 Here is the register link */}
        <Typography variant="body2" sx={{ mt: 2 }}>
          Don’t have an account?{' '}
          <Link component={RouterLink} to="/register">
            Register
          </Link>
        </Typography>
      </Box>
    </Container>
  );
};

export default LoginPage;
