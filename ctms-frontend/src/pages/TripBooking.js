import React, { useState } from 'react';
import {
  Container,
  Typography,
  TextField,
  Button,
  Box,
  Alert
} from '@mui/material';
import { useParams, useNavigate } from 'react-router-dom';

const TripBooking = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: '',
    date: ''
  });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    // يمكنك حفظ الحجز في قاعدة بيانات أو إرسال API هنا
    console.log('Booking submitted:', { tripId: id, ...form });

    // إعادة توجيه بعد التأكيد (اختياري)
    // navigate('/dashboard');
  };

  return (
    <Container maxWidth="sm">
      <Box sx={{ mt: 5, p: 3, boxShadow: 3, borderRadius: 2 }}>
        <Typography variant="h5" gutterBottom>
          Book Trip #{id}
        </Typography>

        {submitted && (
          <Alert severity="success" sx={{ mb: 2 }}>
            ✅ Booking submitted successfully!
          </Alert>
        )}

        <form onSubmit={handleSubmit}>
          <TextField
            label="Full Name"
            name="name"
            fullWidth
            margin="normal"
            required
            value={form.name}
            onChange={handleChange}
          />
          <TextField
            label="Date of Trip"
            name="date"
            type="date"
            fullWidth
            margin="normal"
            required
            InputLabelProps={{
              shrink: true
            }}
            value={form.date}
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
