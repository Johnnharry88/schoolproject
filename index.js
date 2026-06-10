const express = require('express');
const db = require('./databasefiles/db');
const roleFunc = require('./routes/roleController');
const userFunc = require('./routes/userController');
const app = express();

app.use(express.json());
app.use('/profilepics', express.static('profilePics_upload'));

app.use('/roles', roleFunc);
app.use('/user', userFunc);

async function startServer() {
  try {
    const checkDb = await db.getConnection();
    console.log('Database Connected Successfully');
    checkDb.release();
    app.listen(3080, () => {
      console.log('Server started and running on port 3080');
    });
  } catch (err) {
    console.error('Server failed to start up', err.message);
  }
}

startServer();
