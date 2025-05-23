const express = require('express');
const cors = require('cors');
const tripRoutes = require('./routes/tripRoutes');
const { getConnection } = require('./db/oracle');

const app = express();
const PORT = 3000;

// Middleware
app.use(cors());
app.use(express.json());

// API Routes
app.use('/api', tripRoutes);

// Optional: Test route to verify DB connection from browser
app.get('/api/test-db', async (req, res) => {
  try {
    const conn = await getConnection();
    await conn.close();
    res.send('✅ Successfully connected to Oracle DB');
  } catch (err) {
    res.status(500).send('❌ DB Connection Error: ' + err.message);
  }
});

// Test DB connection once at startup
async function testDBConnection() {
  try {
    const conn = await getConnection();
    const result = await conn.execute('SELECT COUNT(*) FROM Agency');
    console.log('✅ Connected to Oracle DB. Agencies count:', result.rows[0][0]);
    await conn.close();
  } catch (err) {
    console.error('❌ Could not connect to Oracle DB:', err.message);
  }
}

// Start Server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
  testDBConnection();
});