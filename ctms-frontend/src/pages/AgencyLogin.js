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
import { useNavigate, useParams } from 'react-router-dom';

const getTripsForAgency = (agencyId) => {
  const allTrips = JSON.parse(localStorage.getItem('trips')) || [];
  return allTrips.filter(trip => trip.agencyId === Number(agencyId));
};

const getStoredBookings = () => {
  return JSON.parse(localStorage.getItem('bookings')) || [];
};

const AgencyDashboard = () => {
  const navigate = useNavigate();
  const { agencyId } = useParams();

  const userRole = localStorage.getItem('userRole'); // 'agency' or 'client'
  const loggedAgencyId = Number(localStorage.getItem('loggedAgencyId')) || Number(agencyId);

  const [tab, setTab] = useState(0);
  const [trips, setTrips] = useState(getTripsForAgency(loggedAgencyId));
  const [bookings, setBookings] = useState(getStoredBookings());
  const [open, setOpen] = useState(false);
  const [newTrip, setNewTrip] = useState({
    title: '',
    description: '',
    image: ''
  });

  const handleAddTrip = () => {
    const tripToAdd = {
      id: Date.now(),
      title: newTrip.title,
      description: newTrip.description,
      image: newTrip.image?.trim() || 'https://source.unsplash.com/400x250/?travel,nature',
      agencyId: loggedAgencyId
    };

    const allTrips = JSON.parse(localStorage.getItem('trips')) || [];
    const updatedTrips = [...allTrips, tripToAdd];
    localStorage.setItem('trips', JSON.stringify(updatedTrips));

    setTrips([...trips, tripToAdd]);
    setNewTrip({ title: '', description: '', image: '' });
    setOpen(false);
  };

  return (
    <Container sx={{ mt: 5 }}>
      <Typography variant="h4" gutterBottom align="center" sx={{ fontWeight: 'bold' }}>
        🌍 Agency Dashboard
      </Typography>

      {/* Tabs only for agencies */}
      {userRole === 'agency' && (
        <Tabs value={tab} onChange={(e, newValue) => setTab(newValue)} centered>
          <Tab label="Trips" />
          <Tab label="Bookings" />
        </Tabs>
      )}

      <Box sx={{ mt: 4 }}>
        {(userRole !== 'agency' || tab === 0) && (
          <>
            {/* Add Trip Button for agencies */}
            {userRole === 'agency' && (
              <Grid container justifyContent="center" sx={{ mb: 4 }}>
                <Button variant="contained" onClick={() => setOpen(true)}>
                  ➕ Add Trip
                </Button>
              </Grid>
            )}

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
                    <CardContent>
                      <Typography variant="h6" gutterBottom>
                        {trip.title}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        {trip.description}
                      </Typography>
                    </CardContent>
                    <CardActions sx={{ justifyContent: 'space-between', px: 2 }}>
                      {userRole === 'agency' && (
                        <>
                          <Button size="small" onClick={() => navigate(`/trips/${trip.id}`)}>
                            Details
                          </Button>
                          <Button size="small" color="error">
                            Delete
                          </Button>
                        </>
                      )}
                      <Button size="small" onClick={() => navigate(`/book/${trip.id}`)}>
                        Book Now
                      </Button>
                    </CardActions>
                  </Card>
                </Grid>
              ))}
            </Grid>

            {/* Add Trip Dialog */}
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
                <Button onClick={handleAddTrip} variant="contained">Add</Button>
              </DialogActions>
            </Dialog>
          </>
        )}

        {/* Bookings tab for agency */}
        {userRole === 'agency' && tab === 1 && (
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
                {bookings.map((booking) => (
                  <TableRow key={booking.id}>
                    <TableCell>{booking.id}</TableCell>
                    <TableCell>{booking.fullName}</TableCell>
                    <TableCell>Trip #{booking.tripId}</TableCell>
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
