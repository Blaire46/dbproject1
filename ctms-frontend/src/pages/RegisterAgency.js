import React, { useState } from 'react';
import {
  Container,
  Typography,
  TextField,
  Button,
  Paper,
  Alert,
  Box,
  MenuItem,
  Select,
  InputLabel,
  FormControl,
  Grow
} from '@mui/material';
import { useNavigate } from 'react-router-dom';

const wilayas = [/* your 58 wilayas here */];

const RegisterAgency = () => {
  const navigate = useNavigate();
  const [agency, setAgency] = useState({
    name: '',
    email: '',
    password: '',
    phone: '',
    address: ''
  });
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setAgency({ ...agency, [e.target.name]: e.target.value });
    setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const phoneValid = /^(05|06|07)[0-9]{8}$/.test(agency.phone);
    if (!phoneValid) {
      setError('❌ Invalid phone number. Must be 10 digits and start with 05, 06, or 07.');
      return;
    }

    try {
      const response = await fetch('http://localhost:4000/api/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(agency)
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.message || 'Registration failed');

      if (data.success && data.agencyId) {
        localStorage.setItem('loggedAgencyId', data.agencyId);
        setSuccess(true);
        setTimeout(() => navigate(`/dashboard/${data.agencyId}`), 1500);
      } else {
        throw new Error('Unexpected response from server.');
      }
    } catch (err) {
      setError(err.message || 'Failed to register agency.');
    }
  };

  return (
    <Box
      sx={{
        minHeight: '100vh',
        backgroundImage: 'url(/imgs/hero-beach.png)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 2
      }}
    >
      <Grow in timeout={600}>
        <Paper
          elevation={10}
          sx={{
            width: '100%',
            maxWidth: 500,
            padding: 4,
            backgroundColor: 'rgba(0,0,0,0.65)',
            borderRadius: 4,
            color: '#fff'
          }}
        >
          <Typography variant="h4" sx={{ fontWeight: 'bold', color: '#f8bbd0', mb: 3, textAlign: 'center' }}>
            Register Your Agency
          </Typography>

          {success && (
            <Alert severity="success" sx={{ mb: 2 }}>
              ✅ Registration successful! Redirecting...
            </Alert>
          )}
          {error && (
            <Alert severity="error" sx={{ mb: 2 }}>
              {error}
            </Alert>
          )}

          <Box component="form" onSubmit={handleSubmit}>
            <TextField
              label="Agency Name"
              name="name"
              fullWidth
              required
              margin="normal"
              value={agency.name}
              onChange={handleChange}
              InputLabelProps={{ style: { color: '#fff' } }}
              InputProps={{ style: { color: '#fff' } }}
            />
            <TextField
              label="Email"
              name="email"
              type="email"
              fullWidth
              required
              margin="normal"
              value={agency.email}
              onChange={handleChange}
              InputLabelProps={{ style: { color: '#fff' } }}
              InputProps={{ style: { color: '#fff' } }}
            />
            <TextField
              label="Password"
              name="password"
              type="password"
              fullWidth
              required
              margin="normal"
              value={agency.password}
              onChange={handleChange}
              InputLabelProps={{ style: { color: '#fff' } }}
              InputProps={{ style: { color: '#fff' } }}
            />
            <TextField
              label="Phone Number"
              name="phone"
              fullWidth
              margin="normal"
              value={agency.phone}
              onChange={handleChange}
              error={agency.phone !== '' && !/^(05|06|07)[0-9]{8}$/.test(agency.phone)}
              helperText={
                agency.phone !== '' && !/^(05|06|07)[0-9]{8}$/.test(agency.phone)
                  ? 'Invalid Algerian phone number'
                  : ''
              }
              InputLabelProps={{ style: { color: '#fff' } }}
              InputProps={{ style: { color: '#fff' } }}
            />
            <FormControl fullWidth margin="normal" required>
              <InputLabel sx={{ color: '#fff' }}>Agency Wilaya</InputLabel>
              <Select
                name="address"
                value={agency.address}
                onChange={handleChange}
                sx={{ color: '#fff', borderColor: '#fff' }}
              >
                {wilayas.map((wilaya) => (
                  <MenuItem key={wilaya} value={wilaya}>
                    {wilaya}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

            <Button
              type="submit"
              fullWidth
              variant="outlined"
              sx={{ mt: 3, color: '#fff', borderColor: '#fff' }}
            >
              Register Agency
            </Button>

            <Box textAlign="center" sx={{ mt: 2 }}>
              <Typography variant="body2" sx={{ color: '#fff' }}>
                Already have an account?{' '}
                <Button
                  variant="text"
                  sx={{ color: '#f8bbd0', textTransform: 'none' }}
                  onClick={() => navigate('/login')}
                >
                  Login Here
                </Button>
              </Typography>
            </Box>

            <Button
              fullWidth
              sx={{ mt: 2, color: '#f8bbd0' }}
              onClick={() => navigate('/')}
            >
              Back to Home
            </Button>
          </Box>
        </Paper>
      </Grow>
    </Box>
  );
};

export default RegisterAgency;
