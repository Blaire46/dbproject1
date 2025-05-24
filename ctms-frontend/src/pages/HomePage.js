import React from 'react';
import {
  AppBar, Toolbar, Typography, Button, Container, Box,
  Grid, Card, CardMedia, CardContent, Avatar, TextField
} from '@mui/material';
import { useNavigate } from 'react-router-dom';

const HomePage = () => {
  const navigate = useNavigate();

  return (
    <>
      {/* Navbar */}
      <AppBar position="static" sx={{ backgroundColor: '#8D6E63' }}>
        <Toolbar>
          <Typography variant="h6" sx={{ flexGrow: 1 }}>
            CTMS Agency
          </Typography>
          <Button color="inherit" onClick={() => navigate('/')}>Home</Button>
          <Button color="inherit" onClick={() => navigate('/login')}>Login</Button>
          <Button color="inherit" onClick={() => navigate('/dashboard')}>Dashboard</Button>
        </Toolbar>
      </AppBar>

      {/* Hero Section */}
      <Box sx={{ backgroundColor: '#EFEBE9', py: 8 }}>
        <Container maxWidth="md" sx={{ textAlign: 'center' }}>
          <Typography variant="h3" gutterBottom sx={{ fontWeight: 'bold', color: '#5D4037' }}>
            Discover Cultural Trips
          </Typography>
          <Typography variant="h6" color="text.secondary">
            Explore heritage, book experiences, and manage your agency with ease.
          </Typography>
          <Box sx={{ mt: 4 }}>
            <Button variant="contained" color="inherit" sx={{ backgroundColor: '#A1887F' }} onClick={() => navigate('/dashboard')}>
              Get Started
            </Button>
          </Box>
        </Container>
      </Box>

      {/* About Section */}
      <Container sx={{ py: 6 }}>
        <Typography variant="h4" gutterBottom sx={{ color: '#4E342E', fontWeight: 'bold' }}>
          About Our Agency
        </Typography>
        <Typography color="text.secondary" paragraph>
          CTMS helps agencies organize, publish, and manage cultural and historical trips. Whether you're an agency or traveler, CTMS simplifies your travel experience.
        </Typography>
      </Container>

      {/* Gallery Section */}
      <Box sx={{ backgroundColor: '#F5F5DC', py: 6 }}>
        <Container>
          <Typography variant="h4" gutterBottom sx={{ fontWeight: 'bold', color: '#6D4C41' }}>
            Trip Gallery
          </Typography>
          <Grid container spacing={3}>
            {[1, 2, 3].map((id) => (
              <Grid item xs={12} sm={4} key={id}>
                <Card>
                  <CardMedia
                    component="img"
                    height="200"
                    image={`https://source.unsplash.com/400x300/?travel,culture,${id}`}
                    alt={`Trip ${id}`}
                  />
                </Card>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>

      {/* Testimonials */}
      <Container sx={{ py: 6 }}>
        <Typography variant="h4" gutterBottom sx={{ fontWeight: 'bold', color: '#4E342E' }}>
          What Our Travelers Say
        </Typography>
        <Grid container spacing={4}>
          <Grid item xs={12} md={4}>
            <Card sx={{ p: 2, backgroundColor: '#FAF3E0' }}>
              <CardContent>
                <Typography>"A wonderful experience in Marrakech. Everything was well-organized!"</Typography>
                <Box sx={{ mt: 2, display: 'flex', alignItems: 'center' }}>
                  <Avatar sx={{ mr: 1 }}>A</Avatar>
                  <Typography variant="subtitle2">Amina B.</Typography>
                </Box>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} md={4}>
            <Card sx={{ p: 2, backgroundColor: '#FAF3E0' }}>
              <CardContent>
                <Typography>"The booking process was so smooth. Highly recommend CTMS."</Typography>
                <Box sx={{ mt: 2, display: 'flex', alignItems: 'center' }}>
                  <Avatar sx={{ mr: 1 }}>O</Avatar>
                  <Typography variant="subtitle2">Omar Y.</Typography>
                </Box>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} md={4}>
            <Card sx={{ p: 2, backgroundColor: '#FAF3E0' }}>
              <CardContent>
                <Typography>"Beautiful destinations and amazing support from the agency."</Typography>
                <Box sx={{ mt: 2, display: 'flex', alignItems: 'center' }}>
                  <Avatar sx={{ mr: 1 }}>L</Avatar>
                  <Typography variant="subtitle2">Leila K.</Typography>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Container>

      {/* Contact Section */}
      <Box sx={{ backgroundColor: '#F3E5AB', py: 6 }}>
        <Container>
          <Typography variant="h4" gutterBottom sx={{ fontWeight: 'bold', color: '#4E342E' }}>
            Contact Us
          </Typography>
          <Grid container spacing={2}>
            <Grid item xs={12} md={6}>
              <TextField fullWidth label="Your Name" margin="normal" />
              <TextField fullWidth label="Email" margin="normal" />
              <TextField fullWidth label="Message" margin="normal" multiline rows={4} />
              <Button variant="contained" sx={{ mt: 2, backgroundColor: '#8D6E63' }}>Send</Button>
            </Grid>
            <Grid item xs={12} md={6}>
              <Typography>📍 Location: Algiers, Algeria</Typography>
              <Typography>📞 Phone: +213 555 123 456</Typography>
              <Typography>✉️ Email: contact@ctms-agency.com</Typography>
            </Grid>
          </Grid>
        </Container>
      </Box>
    </>
  );
};

export default HomePage;
