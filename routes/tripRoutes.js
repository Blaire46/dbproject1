const express = require('express');
const router = express.Router();
const { getTrips } = require('../controllers/tripController');

router.get('/trips', getTrips);

module.exports = router;