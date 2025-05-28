import React, { useState } from 'react';
import {
Box,
Paper,
Typography,
TextField,
Button
} from '@mui/material';
import { useNavigate } from 'react-router-dom';

const RegisterPage = () => {
const navigate = useNavigate();
const [form, setForm] = useState({
fullName: '',
email: '',
password: '',
confirmPassword: ''
});

const handleRegister = () => {
console.log('Register:', form);
};

const handleChange = (field) => (e) =>
setForm((prev) => ({ ...prev, [field]: e.target.value }));

return (
<Box
sx={{
height: '100vh',
backgroundImage: 'url(/imgs/hero-beach.png)',
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
backgroundColor: 'rgba(0,0,0,0.6)',
borderRadius: 4
}}>
<Typography variant="h4" sx={{ fontWeight: 'bold', color: '#f8bbd0', mb: 3 }}>
Create Account
</Typography>
<TextField
fullWidth
label="Full Name"
variant="outlined"
margin="normal"
InputLabelProps={{ style: { color: '#fff' } }}
InputProps={{ style: { color: '#fff' } }}
value={form.fullName}
onChange={handleChange('fullName')}
/>
<TextField
fullWidth
label="Email"
type="email"
variant="outlined"
margin="normal"
InputLabelProps={{ style: { color: '#fff' } }}
InputProps={{ style: { color: '#fff' } }}
value={form.email}
onChange={handleChange('email')}
/>
<TextField
fullWidth
label="Password"
type="password"
variant="outlined"
margin="normal"
InputLabelProps={{ style: { color: '#fff' } }}
InputProps={{ style: { color: '#fff' } }}
value={form.password}
onChange={handleChange('password')}
/>
<TextField
fullWidth
label="Confirm Password"
type="password"
variant="outlined"
margin="normal"
InputLabelProps={{ style: { color: '#fff' } }}
InputProps={{ style: { color: '#fff' } }}
value={form.confirmPassword}
onChange={handleChange('confirmPassword')}
/>
<Button
fullWidth
variant="outlined"
sx={{ mt: 3, color: '#fff', borderColor: '#fff' }}
onClick={handleRegister}
>
Register
</Button>
<Box textAlign="center" sx={{ mt: 2 }}>
<Typography variant="body2" sx={{ color: '#fff' }}>
Already have an account?{' '}
<Button
variant="text"
sx={{ color: '#f8bbd0', textTransform: 'none' }}
onClick={() => navigate('/Login')}
>
Log In
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

export default RegisterPage;