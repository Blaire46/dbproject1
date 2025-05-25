import React from 'react';
import {
AppBar,
Toolbar,
Typography,
Button,
Container,
Box,
Card,
CardContent
} from '@mui/material';
import { useNavigate } from 'react-router-dom';

const ClientDashboard = () => {
const navigate = useNavigate();

return (
<>
{/* Navbar مشابه لصفحة HomePage */}
<AppBar position="static" sx={{ backgroundColor: '#8D6E63' }}>
<Toolbar>
<Typography variant="h6" sx={{ flexGrow: 1 }}>
CTMS Agency
</Typography>
<Button color="inherit" onClick={() => navigate('/')}>Home</Button>
<Button color="inherit" onClick={() => navigate('/login')}>Login</Button>
<Button color="inherit" onClick={() => navigate('/client-dashboard')}>My Dashboard</Button>
</Toolbar>
</AppBar>

  {/* محتوى الصفحة */}
  <Container maxWidth="md" sx={{ mt: 4 }}>
    <Typography variant="h4" gutterBottom sx={{ color: '#4E342E', fontWeight: 'bold', textAlign: 'center' }}>
      Welcome to Your Dashboard
    </Typography>

    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3, mt: 4 }}>
      <Card sx={{ backgroundColor: '#FBE9E7' }}>
        <CardContent>
          <Typography variant="h6" gutterBottom>My Trips</Typography>
          <Typography variant="body1" color="text.secondary">View your upcoming and past cultural trips.</Typography>
        </CardContent>
      </Card>

      <Card sx={{ backgroundColor: '#FFF3E0' }}>
        <CardContent>
          <Typography variant="h6" gutterBottom>My Bookings</Typography>
          <Typography variant="body1" color="text.secondary">Manage your trip bookings and payments.</Typography>
        </CardContent>
      </Card>

      <Card sx={{ backgroundColor: '#E0F2F1' }}>
        <CardContent>
          <Typography variant="h6" gutterBottom>Messages & Communication</Typography>
          <Typography variant="body1" color="text.secondary">Chat with agencies and receive updates.</Typography>
        </CardContent>
      </Card>

      <Card sx={{ backgroundColor: '#E8EAF6' }}>
        <CardContent>
          <Typography variant="h6" gutterBottom>Feedback</Typography>
          <Typography variant="body1" color="text.secondary">Rate your trips and share your experiences.</Typography>
        </CardContent>
      </Card>
    </Box>
  </Container>
</>
);
};

export default ClientDashboard;