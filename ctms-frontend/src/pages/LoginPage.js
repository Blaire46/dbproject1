import React, { useState } from 'react';
import { Container, TextField, Button, Typography, Box, Link, Alert } from '@mui/material';
import { Link as RouterLink, useNavigate } from 'react-router-dom';

const LoginPage = () => {
const navigate = useNavigate();

const [form, setForm] = useState({ email: '', password: '' });
const [error, setError] = useState('');

const handleChange = (e) => {
setForm({ ...form, [e.target.name]: e.target.value });
setError('');
};

const handleLogin = (e) => {
e.preventDefault();

// تحقق من البيانات (هنا نستخدم بيانات تجريبية فقط)
if (form.email === 'client@example.com' && form.password === '123456') {
  localStorage.setItem('userRole', 'client');
  navigate('/client-dashboard');
} else {
  setError('❌ Invalid credentials. Try: client@example.com / 123456');
}
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

php-template
Copy
Edit
    {error && (
      <Alert severity="error" sx={{ width: '100%', mb: 2 }}>
        {error}
      </Alert>
    )}

    <form onSubmit={handleLogin} style={{ width: '100%' }}>
      <TextField
        label="Email"
        name="email"
        type="email"
        fullWidth
        margin="normal"
        required
        value={form.email}
        onChange={handleChange}
      />
      <TextField
        label="Password"
        name="password"
        type="password"
        fullWidth
        margin="normal"
        required
        value={form.password}
        onChange={handleChange}
      />
      <Button
        type="submit"
        variant="contained"
        color="primary"
        fullWidth
        sx={{ mt: 2 }}
      >
        Login
      </Button>
    </form>

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