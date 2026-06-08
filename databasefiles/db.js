const mysql = require ('mysql2/promise')

const db = mysql.createPool({
  host: 'localhost',
  user: 'schooladmin',
  password: 'superadmin',
  database: 'school_db'
});

module.exports = db;
