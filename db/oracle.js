const oracledb = require('oracledb');

async function getConnection() {
    try {
      const connection = await oracledb.getConnection({
        user: 'CTMS_USER',
        password: 'ctms123',
        connectString: '(DESCRIPTION=(ADDRESS=(PROTOCOL=TCP)(HOST=localhost)(PORT=1521))(CONNECT_DATA=(SERVER=DEDICATED)(SERVICE_NAME=CTMSPDB)))'
      });
      return connection;
    } catch (err) {
      console.error('Error connecting to Oracle DB:', err);
      throw err;
    }
  }
  

module.exports = { getConnection };
