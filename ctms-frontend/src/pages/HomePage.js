import React, { useState, useEffect } from 'react';
import {
  AppBar, Toolbar, Typography, Button, IconButton,
  Menu, MenuItem, Drawer, List, ListItem, ListItemText, Box, useTheme, useMediaQuery,
  Container, Grid, Card, CardMedia, CardContent, Avatar, TextField
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import { useNavigate } from 'react-router-dom';

const HomePage = () => {
  const navigate = useNavigate();
  const [loginAnchorEl, setLoginAnchorEl] = useState(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [sampleTrips, setSampleTrips] = useState([]);

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  useEffect(() => {
    const allTrips = JSON.parse(localStorage.getItem('trips')) || [];
    setSampleTrips(allTrips.slice(0, 3));
  }, []);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const scrollToSection = (section) => {
    const id = section === 'Home' ? 'hero' : section.toLowerCase().replace(/\s/g, '');
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  const drawer = (
    <Box sx={{ width: 250 }} onClick={handleDrawerToggle}>
      <List>
        {['Home', 'About', 'Gallery', 'Feedback', 'Contact Us'].map((text) => (
          <ListItem button key={text} onClick={() => scrollToSection(text)}>
            <ListItemText primary={text} />
          </ListItem>
        ))}
        <ListItem button onClick={() => navigate('/agency-login')}>
          <ListItemText primary="Agency Login" />
        </ListItem>
        <ListItem button onClick={() => navigate('/login')}>
          <ListItemText primary="Client Login" />
        </ListItem>
      </List>
    </Box>
  );

  return (
    <>
      <AppBar position="fixed" sx={{ backgroundColor: 'transparent', boxShadow: 'none' }}>
        <Toolbar>
          <Typography variant="h6" sx={{ flexGrow: 1, fontWeight: 'bold', mt: 4, color: '#fff' }}>
            CTMS Agency
          </Typography>

          {isMobile ? (
            <>
              <IconButton color="inherit" onClick={handleDrawerToggle} sx={{ mt: 3 }}>
                <MenuIcon />
              </IconButton>
              <Drawer anchor="right" open={mobileOpen} onClose={handleDrawerToggle}>
                {drawer}
              </Drawer>
            </>
          ) : (
            <>
              {['Home', 'About', 'Gallery', 'Feedback', 'Contact Us'].map((section) => (
                <Button
                  key={section}
                  color="inherit"
                  onClick={() => scrollToSection(section)}
                  sx={{ mt: 4, color: '#fff', fontWeight: 'bold' }}
                >
                  {section}
                </Button>
              ))}

              <Button
                color="inherit"
                onClick={(e) => setLoginAnchorEl(e.currentTarget)}
                sx={{ mt: 4, color: '#fff' }}
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
            </>
          )}
        </Toolbar>
      </AppBar>

      {/* Hero Section */}
      <Box
        id="hero"
        sx={{
          position: 'relative',
          minHeight: '100vh',
          backgroundImage: 'url(/imgs/hero-beach.png)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          px: 2,
          pt: { xs: 10, sm: 8 },
          textAlign: 'center',
        }}
      >
        <Box maxWidth="md">
          <Typography variant="h2" sx={{ fontWeight: 'bold', mb: 2, fontSize: { xs: '2rem', sm: '3rem', md: '4rem' }, color: '#fff' }}>
            WELCOME TO
          </Typography>
          <Typography variant="h3" sx={{ fontWeight: 'bold', fontSize: { xs: '1.8rem', sm: '2.5rem', md: '3rem' }, color: '#f8bbd0' }}>
            THE CTMS
          </Typography>
          <Typography variant="h6" sx={{ mt: 2, fontSize: { xs: '0.9rem', sm: '1rem', md: '1.2rem' }, color: '#fff' }}>
            YOUR CULTURAL TRIP MANAGEMENT SYSTEM
          </Typography>
          <Button variant="outlined" sx={{ mt: 4, px: 4, py: 1.5, fontSize: { xs: '0.8rem', sm: '1rem' }, color: '#fff', borderColor: '#fff' }} onClick={() => navigate('/all-trips')}>
            BOOK NOW
          </Button>
        </Box>
      </Box>


      {/* Featured Trips Section */}
      <Container sx={{ mt: 8 }}>
        <Typography variant="h5" gutterBottom sx={{ fontWeight: 'bold', color: '#686F8C' }}>Featured Trips</Typography>
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
          <Button variant="contained" sx={{ mt: 2, backgroundColor: '#f8bbd0' }} onClick={() => navigate('/all-trips')}>
            See All Trips
          </Button>
        </Grid>
      </Container>

      {/* Gallery Section */}
      <Box id="gallery" sx={{ backgroundColor: '', py: 6 }}>
        <Container>
          <Typography variant="h4" gutterBottom sx={{ fontWeight: 'bold', color: '#686F8C' }}>
            Trip Gallery
          </Typography>
          <Grid container spacing={3}>
            {[ 'https://media.product.which.co.uk/prod/images/original/ab6f7a93264d-cultural-tour-providers.jpg', 'https://www.responsiblevacation.com/imagesClient/2153_1644.jpg', 'https://dynamic-media-cdn.tripadvisor.com/media/photo-o/2b/a8/7c/13/caption.jpg?w=500&h=400&s=1' ].map((url, index) => (
              <Grid item xs={12} sm={4} key={index}>
                <Card sx={{ height: 220, width: '100%', overflow: 'hidden', borderRadius: 3, boxShadow: 3 }}>
                  <Box component="img" src={url} alt={`Trip ${index + 1}`} sx={{ height: '100%', width: '100%', objectFit: 'cover' }} />
                </Card>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>

      {/* About Section */}
      <Container id='about' sx={{ py: 6 }}>
        <Typography variant="h4" gutterBottom sx={{ color: '#686F8C', fontWeight: 'bold' }}>About Our Agency</Typography>
        <Typography color="text.secondary" paragraph>
          CTMS helps agencies organize, publish, and manage cultural and historical trips. Whether you're an agency or traveler, CTMS simplifies your travel experience.
        </Typography>
      </Container>

      {/* Testimonials */}
      <Container id='feedback' sx={{ py: 6 }}>
        <Typography variant="h4" gutterBottom sx={{ fontWeight: 'bold', color: '#686F8C' }}>What Our Travelers Say</Typography>
        <Grid container spacing={4}>
          {[{ name: 'Amina B.', initial: 'A', msg: 'A wonderful experience in Marrakech. Everything was well-organized!' }, { name: 'Omar Y.', initial: 'O', msg: 'The booking process was so smooth. Highly recommend CTMS.' }, { name: 'Leila K.', initial: 'L', msg: 'Beautiful destinations and amazing support from the agency.' }].map((t, i) => (
            <Grid item xs={12} md={4} key={i}>
              <Card sx={{ p: 2, backgroundColor: '#FFE6F4' }}>
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
      <Box id="contactus" sx={{ background: '#e5e5ff', py: 6 }}>
        <Container>
          <Typography variant="h4" gutterBottom sx={{ fontWeight: 'bold', color: '#686F8C' }}>Contact Us</Typography>
          <Grid container spacing={2}>
            <Grid item xs={12} md={6}>
              <TextField fullWidth label="Your Name" margin="normal" />
              <TextField fullWidth label="Email" margin="normal" />
              <TextField fullWidth label="Message" margin="normal" multiline rows={4} />
              <Button variant="contained" sx={{ mt: 2, backgroundColor: '#f8bbd0' }}>Send</Button>
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
