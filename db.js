const mysql = require ('mysql2')

const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'superadmin',
  database: 'school-db'
})

db.connect ((err) => {
  if(err) {
    console.log('Failed to connect to DB:', err);
  } else {
    console.log('Connection to DB successful');
  }
});

module.exports = db;
