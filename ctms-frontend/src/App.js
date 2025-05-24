import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import AgencyDashboard from './pages/AgencyDashboard';
import TripDetails from './pages/TripDetails';
import TripBooking from './pages/TripBooking';
import HomePage from './pages/HomePage';




function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
         <Route path="/login" element={<LoginPage />} />
         <Route path="/register" element={<RegisterPage />} />
         <Route path="/dashboard" element={<AgencyDashboard />} />
         <Route path="/trips/:id" element={<TripDetails />} />
         <Route path="/book/:id" element={<TripBooking />} />
       


      </Routes>
    </Router>
  );
}

export default App;
