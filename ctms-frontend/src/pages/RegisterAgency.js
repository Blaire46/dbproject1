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
  FormControl
} from '@mui/material';
import { useNavigate } from 'react-router-dom';

const wilayas = [
  'Algiers', 'Oran', 'Constantine', 'Tizi Ouzou', 'Blida',
  'Setif', 'Bejaia', 'Annaba', 'Tlemcen', 'Batna'
];

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

  const handleSubmit = (e) => {
    e.preventDefault();

    const allAgencies = JSON.parse(localStorage.getItem('agencies')) || [];

    // تحقق من تكرار الإيميل
    const emailExists = allAgencies.some((a) => a.email === agency.email);
    if (emailExists) {
      setError('❌ This email is already registered. Please use another one.');
      return;
    }

    // تحقق من رقم الهاتف
    const phoneValid = /^(05|06|07)[0-9]{8}$/.test(agency.phone);
    if (!phoneValid) {
      setError('❌ Invalid phone number. Must be 10 digits and start with 05, 06, or 07.');
      return;
    }

    const newAgency = {
      ...agency,
      id: Date.now()
    };

    localStorage.setItem('agencies', JSON.stringify([...allAgencies, newAgency]));
    localStorage.setItem('loggedAgencyId', newAgency.id);
    setSuccess(true);

    setTimeout(() => {
      navigate(`/dashboard/${newAgency.id}`);
    }, 1500);
  };

  return (
    <Container maxWidth="sm" sx={{ mt: 6 }}>
      <Paper elevation={3} sx={{ p: 4, backgroundColor: '#F5F5DC' }}>
        <Typography variant="h4" gutterBottom sx={{ fontWeight: 'bold', textAlign: 'center', color: '#5D4037' }}>
          Register Your Tourism Agency
        </Typography>

        {success && (
          <Alert severity="success" sx={{ mb: 2 }}>
            ✅ Registration successful! Redirecting to your dashboard...
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
          />
          <FormControl fullWidth margin="normal" required>
            <InputLabel>Agency Wilaya</InputLabel>
            <Select
              name="address"
              value={agency.address}
              onChange={handleChange}
            >
              {wilayas.map((wilaya) => (
                <MenuItem key={wilaya} value={wilaya}>
                  {wilaya}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <Button type="submit" variant="contained" fullWidth sx={{ mt: 3, backgroundColor: '#8D6E63' }}>
            Register Agency
          </Button>
        </Box>
      </Paper>
    </Container>
  );
};

export default RegisterAgency;
