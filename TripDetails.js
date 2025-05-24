import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Container, Typography, Button } from '@mui/material';

const TripDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  return (
    <Container sx={{ mt: 5 }}>
      <Typography variant="h4" gutterBottom>
        Trip Details (ID: {id})
      </Typography>
      <Typography>
        More detailed info about this trip can be loaded from API or state in the future.
      </Typography>
      <Button variant="outlined" sx={{ mt: 3 }} onClick={() => navigate(-1)}>
        Back
      </Button>
      </Container>
    
  );
};

export default TripDetails;
