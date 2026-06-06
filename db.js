const mysql = require ('mysql2/promise')

async function dbPoolConnect() {
  try {
    const db = mysql.createPool({
      host: 'localhost',
      user: 'schooladmin',
      password: 'superadmin',
      database: 'school_db'
    });
    const checkDbConnect = await db.getConnection();
    console.log('Connection to Db Successful');
    checkDbConnect.release();
    return db;
  } catch (err) {
    console.log('Connection to DB faileed', err.message)
    throw err;
  }
}

module.exports = dbPoolConnect;
