import React, { useEffect, useState } from 'react';
import {
  Container,
  Typography,
  Grid,
  Card,
  CardMedia,
  CardContent,
  CardActions,
  Button
} from '@mui/material';
import { useNavigate } from 'react-router-dom';

const AllTrips = () => {
  const navigate = useNavigate();
  const [trips, setTrips] = useState([]);
  const [agencies, setAgencies] = useState([]);

  useEffect(() => {
    localStorage.setItem('userRole', 'client'); // اعتبره زبون دائماً
    const storedTrips = JSON.parse(localStorage.getItem('trips')) || [];
    const storedAgencies = JSON.parse(localStorage.getItem('agencies')) || [];
    setTrips(storedTrips);
    setAgencies(storedAgencies);
  }, []);

  const getAgencyName = (agencyId) => {
    const agency = agencies.find(a => a.id === agencyId);
    return agency ? agency.name : 'Unknown Agency';
  };

  return (
    <Container sx={{ mt: 5 }}>
      <Typography variant="h4" gutterBottom align="center" sx={{ fontWeight: 'bold', color: '#686F8C' }}>
        All Cultural Trips
      </Typography>

      <Grid container spacing={4} alignItems="stretch">
  {trips.map((trip) => (
    <Grid item xs={12} sm={6} md={4} key={trip.id} sx={{ display: 'flex' }}>
      <Card
        sx={{
          borderRadius: 3,
          boxShadow: 4,
          background: '#e5e5ff',
          display: 'flex',
          flexDirection: 'column',
          flexGrow: 1,            // مهم لتمديد البطاقة داخل الحاوية
          height: '100%',         // لتتمدد البطاقة بالكامل
        }}
      >
        <CardMedia
          component="img"
          height="200"
          image={trip.image}
          alt={trip.title}
        />
        <CardContent sx={{ flexGrow: 1 }}>
          <Typography variant="h6">{trip.title}</Typography>
          <Typography
            variant="body2"
            color="text.secondary"
            sx={{
              overflow: 'hidden',
              display: '-webkit-box',
              WebkitLineClamp: 2,
              WebkitBoxOrient: 'vertical',
            }}
          >
            {trip.description}
          </Typography>
          <Typography
            variant="caption"
            color="text.secondary"
            display="block"
            sx={{ mt: 1 }}
          >
            Organized by: <strong>{getAgencyName(trip.agencyId)}</strong>
          </Typography>
        </CardContent>
        <CardActions sx={{ mt: 'auto' }}>
          <Button fullWidth onClick={() => navigate(`/book/${trip.id}`)}>
            Book Now
          </Button>
        </CardActions>
      </Card>
    </Grid>
  ))}
</Grid>

       
    </Container>
  );
};

export default AllTrips;
