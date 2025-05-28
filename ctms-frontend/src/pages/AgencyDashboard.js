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

const getAgencyName = (agencyId) => {
  const agencies = JSON.parse(localStorage.getItem('agencies')) || [];
  const agency = agencies.find(a => a.id === Number(agencyId));
  return agency ? agency.name : 'Unknown';
};

const AgencyDashboard = () => {
  const navigate = useNavigate();
  const { agencyId } = useParams();

  const [tab, setTab] = useState(0);
  const [trips, setTrips] = useState(getTripsForAgency(agencyId));
  const [bookings, setBookings] = useState(getStoredBookings());
  const [open, setOpen] = useState(false);
  const [newTrip, setNewTrip] = useState({
    title: '',
    description: '',
    image: ''
  });

  const handleAddTrip = () => {
    const loggedAgencyId = Number(localStorage.getItem('loggedAgencyId'));
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
  const handleEdit = (trip) => {
  setNewTrip(trip);  // preload the form with existing trip data
  setOpen(true);     // open the same dialog for editing
};

const handleDelete = (id) => {
  const updated = trips.filter(t => t.id !== id);
  setTrips(updated);
  const allTrips = JSON.parse(localStorage.getItem('trips')) || [];
  const updatedAll = allTrips.filter(t => t.id !== id);
  localStorage.setItem('trips', JSON.stringify(updatedAll));
};
const [isEditing, setIsEditing] = useState(false);


  return (
    <Container sx={{ mt: 5 }}>
      <Typography variant="h4" gutterBottom sx={{ fontWeight: 'bold', textAlign: 'center' }}>
         Agency Dashboard
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

            <Grid container spacing={3}>
              {trips.map((trip) => (
               <Grid item xs={12} sm={6} md={4} key={trip.id} sx={{ display: 'flex' }}>
  <Card
    sx={{
      display: 'flex',
      flexDirection: 'column',
      flexGrow: 1,
      background: '#e5e5ff',
      borderRadius: 3,
      boxShadow: 4,
    }}
  >
    <CardMedia
      component="img"
      height="200"
      image={trip.image}
      alt={trip.title}
      sx={{ objectFit: 'cover' }}
    />
    <CardContent sx={{ flexGrow: 1 }}>
      <Typography variant="h6">{trip.title}</Typography>
      <Typography variant="body2" color="text.secondary">
        {trip.description.length > 100 ? trip.description.slice(0, 100) + '...' : trip.description}
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
    <CardActions sx={{ display: 'flex', justifyContent: 'space-between' }}>
  <Button size="small" color="primary" onClick={() => handleEdit(trip)}>
    Edit
  </Button>
  <Button size="small" color="error" onClick={() => handleDelete(trip.id)}>
    Delete
  </Button>
</CardActions>

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