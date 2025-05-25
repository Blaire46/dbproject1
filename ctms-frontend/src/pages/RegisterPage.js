import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import {
  Container,
  TextField,
  Button,
  Typography,
  Box,
  MenuItem,
  Alert,
} from '@mui/material';

const RegisterPage = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    phone: '',
    role: 'client',
  });

  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [serverError, setServerError] = useState('');

  const validate = () => {
    const newErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Full name is required';
    }

    if (!formData.email) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Invalid email format';
    }

    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }

    if (!formData.phone.trim()) {
      newErrors.phone = 'Phone number is required';
    }

    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitted(false);
    setServerError('');

    const validationErrors = validate();
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length === 0) {
      try {
        const response = await fetch('http://localhost:4000/api/customers', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            name: formData.name,
            email: formData.email,
            password: formData.password,
            phone: formData.phone,
          }),
        });

        if (!response.ok) {
          const text = await response.text();
          throw new Error('Server error: ' + text);
        }

        const data = await response.json();
        console.log('✅ Registered:', data);
        setSubmitted(true);

        // Redirect to login or home page
        navigate('/');
      } catch (error) {
        console.error('❌ Registration error:', error.message);
        setServerError(error.message);
      }
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <Container maxWidth="sm">
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
          Create New Account
        </Typography>

        {submitted && (
          <Alert severity="success" sx={{ width: '100%', mb: 2 }}>
            ✅ Registered successfully!
          </Alert>
        )}

        {serverError && (
          <Alert severity="error" sx={{ width: '100%', mb: 2 }}>
            ❌ {serverError}
          </Alert>
        )}

        <form onSubmit={handleSubmit} style={{ width: '100%' }} noValidate>
          <TextField
            label="Full Name"
            name="name"
            fullWidth
            margin="normal"
            value={formData.name}
            onChange={handleChange}
            error={Boolean(errors.name)}
            helperText={errors.name}
          />

          <TextField
            label="Email"
            name="email"
            type="email"
            fullWidth
            margin="normal"
            value={formData.email}
            onChange={handleChange}
            error={Boolean(errors.email)}
            helperText={errors.email}
          />

          <TextField
            label="Password"
            name="password"
            type="password"
            fullWidth
            margin="normal"
            value={formData.password}
            onChange={handleChange}
            error={Boolean(errors.password)}
            helperText={errors.password}
          />

          <TextField
            label="Phone Number"
            name="phone"
            fullWidth
            margin="normal"
            value={formData.phone}
            onChange={handleChange}
            error={Boolean(errors.phone)}
            helperText={errors.phone}
          />

          <Button
            type="submit"
            variant="contained"
            color="primary"
            fullWidth
            sx={{ mt: 2 }}
          >
            Register
          </Button>
        </form>
      </Box>
    </Container>
  );
};

export default RegisterPage;