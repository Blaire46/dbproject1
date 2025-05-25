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

// Full list of 58 wilayas in Algeria
const wilayas = [
  'Adrar', 'Chlef', 'Laghouat', 'Oum El Bouaghi', 'Batna', 'Béjaïa', 'Biskra', 'Béchar', 'Blida', 'Bouira',
  'Tamanrasset', 'Tébessa', 'Tlemcen', 'Tiaret', 'Tizi Ouzou', 'Algiers', 'Djelfa', 'Jijel', 'Sétif', 'Saïda',
  'Skikda', 'Sidi Bel Abbès', 'Annaba', 'Guelma', 'Constantine', 'Médéa', 'Mostaganem', 'M’Sila', 'Mascara',
  'Ouargla', 'Oran', 'El Bayadh', 'Illizi', 'Bordj Bou Arréridj', 'Boumerdès', 'El Tarf', 'Tindouf', 'Tissemsilt',
  'El Oued', 'Khenchela', 'Souk Ahras', 'Tipaza', 'Mila', 'Aïn Defla', 'Naâma', 'Aïn Témouchent', 'Ghardaïa',
  'Relizane', 'Timimoun', 'Bordj Badji Mokhtar', 'Ouled Djellal', 'Beni Abbès', 'In Salah', 'In Guezzam',
  'Touggourt', 'Djanet', 'El M’Ghair', 'El Meniaa'
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

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate phone
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

      if (!response.ok) {
        throw new Error(data.message || 'Registration failed');
      }

      if (data.success && data.agencyId) {
        localStorage.setItem('loggedAgencyId', data.agencyId);
        setSuccess(true);

        setTimeout(() => {
          navigate(`/dashboard/${data.agencyId}`);
        }, 1500);
      } else {
        throw new Error('Unexpected response from server.');
      }
    } catch (err) {
      setError(err.message || 'Failed to register agency.');
    }
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
