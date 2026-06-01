const mysql = require ('mysql2')

const db = mysql.createConnection({
  host: 'localhost',
  user: 'schooladmin',
  password: 'superadmin',
  database: 'school_db'
})

db.connect ((err) => {
  if(err) {
    console.log('Failed to connect to DB:', err);
  } else {
    console.log('Connection to DB successful');
  }
});

module.exports = db;
