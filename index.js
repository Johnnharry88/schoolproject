const express = require('express');
const db = require('./databasefiles/db');
const roleFunc = require('./routes/roleController');
const { routeuser } = require('./routes/userController');
const sessionFunc = require('./routes/sessionController');
const classFunc = require('./routes/classController');
const studentFunc = require('./routes/studentsController');
const teachFunc = require('./routes/teacherController');

const app = express();

app.use(express.json());
app.use('/profilepics', express.static('profilePics_upload'));

app.use('/roles', roleFunc);
app.use('/user', routeuser);
app.use('/session', sessionFunc);
app.use('/classes', classFunc);
app.use('/students', studentFunc);
app.use('/teacher', teachFunc);

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
