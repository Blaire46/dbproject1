import React, { useState, useEffect } from 'react';
import {
  AppBar, Toolbar, Typography, Button, Container, Box,
  Grid, Card, CardMedia, CardContent, Avatar, TextField,
  Menu, MenuItem, IconButton
} from '@mui/material';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import { useNavigate } from 'react-router-dom';

const HomePage = () => {
  const navigate = useNavigate();
  const [loginAnchorEl, setLoginAnchorEl] = useState(null);
  const [sampleTrips, setSampleTrips] = useState([]);

  useEffect(() => {
    const allTrips = JSON.parse(localStorage.getItem('trips')) || [];
    setSampleTrips(allTrips.slice(0, 3));
  }, []);

  return (
    <>
      {/* Navbar */}
      <AppBar position="fixed" sx={{ backgroundColor: 'transparent', boxShadow: 'none' }}>
        <Toolbar>
          <Typography variant="h6" sx={{ flexGrow: 1, fontWeight: 'bold',  mt: 4, color: '#fff', borderColor: '#fff' }}>
            CTMS Agency
          </Typography>

          <Button color="inherit" onClick={() => document.getElementById('hero').scrollIntoView({ behavior: 'smooth' })} sx={{ mt: 4, color: '#fff',fontWeight: 'bold', borderColor: '#fff' }}>Home</Button>
          <Button color="inherit" onClick={() => document.getElementById('about').scrollIntoView({ behavior: 'smooth' })} sx={{ mt: 4, color: '#fff', fontWeight: 'bold', borderColor: '#fff' }}>About</Button>
          <Button color="inherit" onClick={() => document.getElementById('gallery').scrollIntoView({ behavior: 'smooth' })} sx={{ mt: 4, color: '#fff', fontWeight: 'bold', borderColor: '#fff' }}>Gallery</Button>
          <Button color="inherit" onClick={() => document.getElementById('reviews').scrollIntoView({ behavior: 'smooth' })} sx={{ mt: 4, color: '#fff',fontWeight: 'bold', borderColor: '#fff' }}>Feedback</Button>
          <Button color="inherit" onClick={() => document.getElementById('contact').scrollIntoView({ behavior: 'smooth' })} sx={{ mt: 4, color: '#fff', fontWeight: 'bold',borderColor: '#fff' }}>Contact Us</Button>

          <Button
            color="inherit"
            onClick={(e) => setLoginAnchorEl(e.currentTarget)}
            sx={{ mt: 4, color: '#fff', borderColor: '#fff' }}
          >
            Log in <ArrowDropDownIcon />
          </Button>
          <Menu
            anchorEl={loginAnchorEl}
            open={Boolean(loginAnchorEl)}
            onClose={() => setLoginAnchorEl(null)}
          >
            <MenuItem onClick={() => { navigate('/agency-login'); setLoginAnchorEl(null); }}>For Agency</MenuItem>
            <MenuItem onClick={() => { navigate('/login'); setLoginAnchorEl(null); }}>For Client</MenuItem>
          </Menu>
        </Toolbar>
      </AppBar>

      {/* Hero Section */}
      <Box id="hero"
        sx={{
          position: 'relative',
          height: '100vh',
          backgroundImage: 'url(/imgs/hero-beach.png)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: '#fff',
          textAlign: 'center',
          animation: 'zoomIn 20s ease-in-out forwards'
        }}
      >
        <Box>
          <Typography variant="h2" sx={{ fontWeight: 'bold', mb: 2 }}>WELCOME TO</Typography>
          <Typography variant="h3" sx={{ color: '#f8bbd0', fontWeight: 'bold' }}>THE CTMS</Typography>
          <Typography variant="h6" sx={{ mt: 2 }}>YOUR CULTURAL TRIP MANAGEMENT SYSTEM</Typography>
          <Button
            variant="outlined"
            sx={{ mt: 4, color: '#fff', borderColor: '#fff' }}
            onClick={() => navigate('/all-trips')}
          >
            BOOK NOW
          </Button>
        </Box>
      </Box>


      {/* Featured Trips Section */}
      <Container  sx={{ mt: 8 }}>
        <Typography variant="h5" gutterBottom sx={{ fontWeight: 'bold', textAlign: 'center' }}>Featured Trips</Typography>
        <Grid container spacing={4} sx={{ mt: 2 }}>
          {sampleTrips.map((trip) => (
            <Grid item xs={12} sm={6} md={4} key={trip.id}>
              <Card sx={{ borderRadius: 3, boxShadow: 3 }}>
                <CardMedia component="img" height="180" image={trip.image} alt={trip.title} />
                <CardContent>
                  <Typography variant="h6">{trip.title}</Typography>
                  <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>{trip.description?.slice(0, 70)}...</Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
        <Grid container justifyContent="center" sx={{ mt: 4 }}>
          <Button variant="outlined" color="inherit" sx={{ backgroundColor: '#A1887F' }} onClick={() => navigate('/all-trips')}>
            See All Trips
          </Button>
        </Grid>
      </Container>
{/* Gallery Section */}
<Box id="gallery" sx={{ backgroundColor: '#F5F5DC', py: 6 }}>
  <Container>
    <Typography variant="h4" gutterBottom sx={{ fontWeight: 'bold', color: '#6D4C41' }}>
      Trip Gallery
    </Typography>
    <Grid container spacing={3}>
      {[
        'https://media.product.which.co.uk/prod/images/original/ab6f7a93264d-cultural-tour-providers.jpg',
        'https://www.responsiblevacation.com/imagesClient/2153_1644.jpg',
        'https://dynamic-media-cdn.tripadvisor.com/media/photo-o/2b/a8/7c/13/caption.jpg?w=500&h=400&s=1'
      ].map((url, index) => (
        <Grid item xs={12} sm={4} key={index}>
          <Card
            sx={{
              height: 220,
              width: '100%',
              overflow: 'hidden',
              borderRadius: 3,
              boxShadow: 3
            }}
          >
            <Box
              component="img"
              src={url}
              alt={`Trip ${index + 1}`}
              sx={{
                height: '100%',
                width: '100%',
                objectFit: 'cover'
              }}
            />
          </Card>
        </Grid>
      ))}
    </Grid>
  </Container>
</Box>

      {/* About Section */}
      <Container id='about' sx={{ py: 6 }}>
        <Typography variant="h4" gutterBottom sx={{ color: '#4E342E', fontWeight: 'bold' }}>About Our Agency</Typography>
        <Typography color="text.secondary" paragraph>
          CTMS helps agencies organize, publish, and manage cultural and historical trips. Whether you're an agency or traveler, CTMS simplifies your travel experience.
        </Typography>
      </Container>

      {/* Testimonials */}
      <Container id='reviews' sx={{ py: 6 }}>
        <Typography variant="h4" gutterBottom sx={{ fontWeight: 'bold', color: '#4E342E' }}>What Our Travelers Say</Typography>
        <Grid container spacing={4}>
          {[{ name: 'Amina B.', initial: 'A', msg: 'A wonderful experience in Marrakech. Everything was well-organized!' },
            { name: 'Omar Y.', initial: 'O', msg: 'The booking process was so smooth. Highly recommend CTMS.' },
            { name: 'Leila K.', initial: 'L', msg: 'Beautiful destinations and amazing support from the agency.' }
          ].map((t, i) => (
            <Grid item xs={12} md={4} key={i}>
              <Card sx={{ p: 2, backgroundColor: '#FAF3E0' }}>
                <CardContent>
                  <Typography>"{t.msg}"</Typography>
                  <Box sx={{ mt: 2, display: 'flex', alignItems: 'center' }}>
                    <Avatar sx={{ mr: 1 }}>{t.initial}</Avatar>
                    <Typography variant="subtitle2">{t.name}</Typography>
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
        
      </Container>

      {/* Contact Section */}
      <Box id="contact" sx={{ backgroundColor: '#F3E5AB', py: 6 }}>
        <Container>
          <Typography variant="h4" gutterBottom sx={{ fontWeight: 'bold', color: '#4E342E' }}>Contact Us</Typography>
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
