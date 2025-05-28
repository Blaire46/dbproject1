import React, { useState } from 'react';
import {
  Typography,
  TextField,
  Button,
  Box,
  Alert,
  Paper
} from '@mui/material';
import { useParams } from 'react-router-dom';

const TripBooking = () => {
  const { id } = useParams();

  const [form, setForm] = useState({
    fullName: '',
    email: '',
    phone: '',
    people: 1,
    date: '',
    message: ''
  });

  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);

    const newBooking = {
      id: Date.now(),
      tripId: id,
      ...form,
      status: 'Pending'
    };

    const existing = JSON.parse(localStorage.getItem('bookings')) || [];
    localStorage.setItem('bookings', JSON.stringify([...existing, newBooking]));

    setForm({
      fullName: '',
      email: '',
      phone: '',
      people: 1,
      date: '',
      message: ''
    });
  };

  return (
    <Box
      sx={{
        minHeight: '100vh',
        backgroundImage: `url(/imgs/hero-beach.png)`, // Replace with your actual image path
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        p: 2
      }}
    >
      <Paper
        elevation={3}
        sx={{
          width: '100%',
          maxWidth: 500,
          p: 4,
          bgcolor: 'rgba(0, 0, 0, 0.5)',
          backdropFilter: 'blur(10px)',
          borderRadius: 4,
          color: '#fff'
        }}
      >
        <Typography
          variant="h5"
          fontWeight="bold"
          align="center"
          gutterBottom
          sx={{ color: '#ffb6c1' }}
        >
          Book Trip #{id}
        </Typography>

        {submitted && (
          <Alert severity="success" sx={{ mb: 2 }}>
            🎉 Booking submitted successfully!
          </Alert>
        )}

        <form onSubmit={handleSubmit}>
          <TextField
            label="Full Name"
            name="fullName"
            fullWidth
            margin="normal"
            required
            value={form.fullName}
            onChange={handleChange}
            InputProps={{ style: { color: '#fff' } }}
            InputLabelProps={{ style: { color: '#ccc' } }}
            sx={{ input: { borderBottom: '1px solid white' } }}
          />
          <TextField
            label="Email"
            name="email"
            type="email"
            fullWidth
            margin="normal"
            required
            value={form.email}
            onChange={handleChange}
            InputProps={{ style: { color: '#fff' } }}
            InputLabelProps={{ style: { color: '#ccc' } }}
          />
          <TextField
            label="Phone Number"
            name="phone"
            fullWidth
            margin="normal"
            required
            value={form.phone}
            onChange={handleChange}
            InputProps={{ style: { color: '#fff' } }}
            InputLabelProps={{ style: { color: '#ccc' } }}
          />
          <TextField
            label="Number of People"
            name="people"
            type="number"
            fullWidth
            margin="normal"
            required
            value={form.people}
            onChange={handleChange}
            inputProps={{ min: 1 }}
            InputProps={{ style: { color: '#fff' } }}
            InputLabelProps={{ style: { color: '#ccc' } }}
          />
          <TextField
            label="Trip Date"
            name="date"
            type="date"
            fullWidth
            margin="normal"
            required
            InputLabelProps={{ shrink: true, style: { color: '#ccc' } }}
            value={form.date}
            onChange={handleChange}
            InputProps={{ style: { color: '#fff' } }}
          />
          <TextField
            label="Additional Notes"
            name="message"
            multiline
            rows={3}
            fullWidth
            margin="normal"
            value={form.message}
            onChange={handleChange}
            InputProps={{ style: { color: '#fff' } }}
            InputLabelProps={{ style: { color: '#ccc' } }}
          />

          <Button
            type="submit"
            variant="outlined"
            fullWidth
            sx={{
              mt: 3,
              color: '#ffb6c1',
              borderColor: '#ffb6c1',
              fontWeight: 'bold',
              '&:hover': {
                backgroundColor: '#ffb6c1',
                color: '#000'
              }
            }}
          >
            Confirm Booking
          </Button>
        </form>
      </Paper>
    </Box>
  );
};

export default TripBooking;
