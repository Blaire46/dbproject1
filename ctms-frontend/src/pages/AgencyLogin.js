import React, { useState } from 'react';
import {
Box,
Paper,
Typography,
TextField,
Button
} from '@mui/material';
import { useNavigate } from 'react-router-dom';

const AgencyLoginPage = () => {
const navigate = useNavigate();
const [email, setEmail] = useState('');
const [password, setPassword] = useState('');

const handleLogin = () => {
// Handle agency login logic
console.log('Agency Login:', { email, password });
};

return (
<Box
sx={{
height: '100vh',
backgroundImage: 'url(/imgs/hero-beach.png)', // make sure this path is correct
backgroundSize: 'cover',
backgroundPosition: 'center',
display: 'flex',
alignItems: 'center',
justifyContent: 'center',
p: 2
}}
>
<Paper elevation={10} sx={{
padding: 4,
maxWidth: 400,
width: '100%',
backgroundColor: 'rgba(0,0,0,0.6)', // dark semi-transparent background for contrast
borderRadius: 4
}}>
<Typography variant="h4" sx={{ fontWeight: 'bold', color: '#f8bbd0', mb: 3 }}>
Agency Login
</Typography>
<TextField
fullWidth
label="Email"
type="email"
variant="outlined"
margin="normal"
InputLabelProps={{ style: { color: '#fff' } }}
InputProps={{ style: { color: '#fff' } }}
value={email}
onChange={(e) => setEmail(e.target.value)}
/>
<TextField
fullWidth
label="Password"
type="password"
variant="outlined"
margin="normal"
InputLabelProps={{ style: { color: '#fff' } }}
InputProps={{ style: { color: '#fff' } }}
value={password}
onChange={(e) => setPassword(e.target.value)}
/>
<Button
fullWidth
variant="outlined"
sx={{ mt: 3, color: '#fff', borderColor: '#fff' }}
onClick={handleLogin}
>
Log In
</Button>
<Box textAlign="center" sx={{ mt: 2 }}>
<Typography variant="body2" sx={{ color: '#fff' }}>
Don't have an agency account?{' '}
<Button
variant="text"
sx={{ color: '#f8bbd0', textTransform: 'none' }}
onClick={() => navigate('/Register')}
>
Register Now
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
</Paper>
</Box>
);
};

export default AgencyLoginPage;