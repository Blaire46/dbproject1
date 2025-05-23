const { getConnection } = require('../db/oracle');

const getTrips = async (req, res) => {
  try {
    const conn = await getConnection();
    const result = await conn.execute('SELECT * FROM Trips');
    res.json(result.rows);
    await conn.close();
  } catch (err) {
    console.error(err);
    res.status(500).send('Database error');
  }
};

module.exports = { getTrips };