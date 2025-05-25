import React, { useState } from 'react';
import {
Container,
TextField,
Button,
Typography,
Paper,
Alert,
Box
} from '@mui/material';
import { useNavigate } from 'react-router-dom';

const AgencyLogin = () => {
const [credentials, setCredentials] = useState({ email: '', password: '' });
const [error, setError] = useState('');
const navigate = useNavigate();

const handleChange = (e) => {
setCredentials({ ...credentials, [e.target.name]: e.target.value });
setError('');
};

const handleSubmit = (e) => {
e.preventDefault();
const agencies = JSON.parse(localStorage.getItem('agencies')) || [];

const matchedAgency = agencies.find(
  (a) => a.email === credentials.email && a.password === credentials.password
);

if (!matchedAgency) {
  setError('❌ Invalid email or password');
  return;
}

// Save session info
localStorage.setItem('loggedAgencyId', matchedAgency.id);
localStorage.setItem('userRole', 'agency');

// Redirect to dashboard
navigate(`/dashboard/${matchedAgency.id}`);
};

return (
<Container maxWidth="sm" sx={{ mt: 8 }}>
<Paper elevation={3} sx={{ p: 4 }}>
<Typography variant="h5" gutterBottom sx={{ textAlign: 'center', fontWeight: 'bold' }}>
Agency Login
</Typography>


    {error && (
      <Alert severity="error" sx={{ mb: 2 }}>
        {error}
      </Alert>
    )}

    <Box component="form" onSubmit={handleSubmit}>
      <TextField
        label="Email"
        name="email"
        type="email"
        fullWidth
        required
        margin="normal"
        value={credentials.email}
        onChange={handleChange}
      />
      <TextField
        label="Password"
        name="password"
        type="password"
        fullWidth
        required
        margin="normal"
        value={credentials.password}
        onChange={handleChange}
      />
      <Button type="submit" variant="contained" fullWidth sx={{ mt: 3 }}>
        Login
      </Button>
      <Box textAlign="center" sx={{ mt: 2 }}>
  <Typography variant="body2">
    Don't have an account?{' '}
    <Button variant="text" onClick={() => navigate('/register-agency')}>
      Register your agency
    </Button>
  </Typography>
</Box>

    </Box>
  </Paper>
</Container>
);
};

export default AgencyLogin;