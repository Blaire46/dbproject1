import React, { useState } from 'react';
import {
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
  CardActions,
  Button,
  CardMedia,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Tabs,
  Tab,
  Box,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Paper
} from '@mui/material';
import { useNavigate } from 'react-router-dom';

import img1 from './imgs/21.jpg';
import img2 from './imgs/22.jpg';
import img3 from './imgs/23.jpg';

// Mock Trips
const initialTrips = [
  {
    id: 1,
    title: 'Cultural Tour of Marrakech',
    description: 'Discover the historical sites and traditions of Morocco.',
    image: img1
  },
  {
    id: 2,
    title: 'Ancient Rome Experience',
    description: 'Walk through the ruins of the Roman Empire.',
    image: img2
  },
  {
    id: 3,
    title: 'Egyptian Pyramids Adventure',
    description: 'Explore the wonders of ancient Egypt.',
    image: img3
  }
];

// Mock Bookings
const mockBookings = [
  {
    id: 101,
    client: 'Amina Ali',
    tripTitle: 'Cultural Tour of Marrakech',
    date: '2025-06-10',
    status: 'Confirmed'
  },
  {
    id: 102,
    client: 'Omar Youssef',
    tripTitle: 'Ancient Rome Experience',
    date: '2025-07-04',
    status: 'Pending'
  },
  {
    id: 103,
    client: 'Leila Karim',
    tripTitle: 'Egyptian Pyramids Adventure',
    date: '2025-08-15',
    status: 'Cancelled'
  }
];

const AgencyDashboard = () => {
  const [tab, setTab] = useState(0);
  const [trips, setTrips] = useState(initialTrips);
  const [open, setOpen] = useState(false);
  const [newTrip, setNewTrip] = useState({
    title: '',
    description: '',
    image: ''
  });

  const navigate = useNavigate();

  const handleAddTrip = () => {
    const id = trips.length + 1;
    const image =
      newTrip.image?.trim() !== ''
        ? newTrip.image
        : 'https://source.unsplash.com/400x250/?travel,nature';

    setTrips([
      ...trips,
      {
        id,
        title: newTrip.title,
        description: newTrip.description,
        image: image
      }
    ]);

    setNewTrip({ title: '', description: '', image: '' });
    setOpen(false);
  };

  return (
    <Container sx={{ mt: 5 }}>
      <Typography variant="h4" gutterBottom sx={{ fontWeight: 'bold', textAlign: 'center' }}>
        🌍 Agency Dashboard
      </Typography>

      {/* Navigation Tabs */}
      <Tabs value={tab} onChange={(e, newValue) => setTab(newValue)} centered>
        <Tab label="Trips" />
        <Tab label="Bookings" />
      </Tabs>

      <Box sx={{ mt: 4 }}>
        {tab === 0 && (
          <>
            <Grid container justifyContent="center" sx={{ mb: 4 }}>
              <Button variant="contained" onClick={() => setOpen(true)}>
                ➕ Add Trip
              </Button>
            </Grid>

            <Grid container spacing={4}>
              {trips.map((trip) => (
                <Grid item xs={12} sm={6} md={4} key={trip.id}>
                  <Card sx={{ borderRadius: 3, boxShadow: 4 }}>
                    <CardMedia
                      component="img"
                      height="200"
                      image={trip.image}
                      alt={trip.title}
                    />
                    <CardContent sx={{ paddingBottom: 0 }}>
                      <Typography variant="h6" gutterBottom sx={{ fontWeight: 600 }}>
                        {trip.title}
                      </Typography>
                      <Typography variant="body2" color="text.secondary" sx={{ minHeight: '48px' }}>
                        {trip.description}
                      </Typography>
                    </CardContent>
                    <CardActions sx={{ justifyContent: 'space-between', px: 2, pb: 2 }}>
                      <Button size="small" onClick={() => navigate(`/trips/${trip.id}`)}>Details</Button>
                      <Button size="small" color="error">Delete</Button>
                    </CardActions>
                     <Button onClick={() => navigate(`/book/${trip.id}`)}>Book Now</Button>
                  </Card>
                </Grid>
              ))}
            </Grid>

            {/* Dialog for Add Trip */}
            <Dialog open={open} onClose={() => setOpen(false)}>
              <DialogTitle>Add New Trip</DialogTitle>
              <DialogContent>
                <TextField
                  label="Trip Title"
                  fullWidth
                  margin="normal"
                  value={newTrip.title}
                  onChange={(e) => setNewTrip({ ...newTrip, title: e.target.value })}
                />
                <TextField
                  label="Description"
                  fullWidth
                  margin="normal"
                  multiline
                  rows={3}
                  value={newTrip.description}
                  onChange={(e) => setNewTrip({ ...newTrip, description: e.target.value })}
                />
                <TextField
                  label="Image URL (optional)"
                  fullWidth
                  margin="normal"
                  value={newTrip.image}
                  onChange={(e) => setNewTrip({ ...newTrip, image: e.target.value })}
                />
              </DialogContent>
              <DialogActions>
                <Button onClick={() => setOpen(false)}>Cancel</Button>
                <Button onClick={handleAddTrip} variant="contained">
                  Add
                </Button>
              </DialogActions>
            </Dialog>
          </>
        )}

        {tab === 1 && (
          <Paper sx={{ overflowX: 'auto' }}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell><strong>Booking ID</strong></TableCell>
                  <TableCell><strong>Client</strong></TableCell>
                  <TableCell><strong>Trip</strong></TableCell>
                  <TableCell><strong>Date</strong></TableCell>
                  <TableCell><strong>Status</strong></TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {mockBookings.map((booking) => (
                  <TableRow key={booking.id}>
                    <TableCell>{booking.id}</TableCell>
                    <TableCell>{booking.client}</TableCell>
                    <TableCell>{booking.tripTitle}</TableCell>
                    <TableCell>{booking.date}</TableCell>
                    <TableCell>{booking.status}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </Paper>
        )}
      </Box>
    </Container>
  );
};

export default AgencyDashboard;
