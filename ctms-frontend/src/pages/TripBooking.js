import React, { useState } from 'react';
import {
  Container,
  Typography,
  TextField,
  Button,
  Box,
  Alert
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

  // ⬇️ حفظ في localStorage
  const existing = JSON.parse(localStorage.getItem('bookings')) || [];
  localStorage.setItem('bookings', JSON.stringify([...existing, newBooking]));

  console.log('📦 Booking saved:', newBooking);

  // رسالة شكر
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
    <Container maxWidth="sm">
      <Box sx={{ mt: 5, p: 3, boxShadow: 3, borderRadius: 2 }}>
        <Typography variant="h5" gutterBottom>
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
          />
          <TextField
            label="Phone Number"
            name="phone"
            fullWidth
            margin="normal"
            required
            value={form.phone}
            onChange={handleChange}
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
          />
          <TextField
            label="Trip Date"
            name="date"
            type="date"
            fullWidth
            margin="normal"
            required
            InputLabelProps={{ shrink: true }}
            value={form.date}
            onChange={handleChange}
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
          />

          <Button type="submit" variant="contained" color="primary" sx={{ mt: 2 }}>
            Confirm Booking
          </Button>
        </form>
      </Box>
    </Container>
  );
};

export default TripBooking;
