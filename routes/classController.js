const classModel = require('../databasefiles/classModel');
const express = require('express');
const classroute = express.Router();
const sessionModel = require('../databasefiles/sessionModel');

classroute.post('/create_class', async (req, res) => {
  const { class_name } = req.body;
  const sessionId = await sessionModel.getActiveSession();
  const newClass = await classModel.createClass(class_name, sessionId[0].id);
  console.log(sessionId);
  res.json({ Message: 'New Class created' });
});

classroute.get('/getallclass', async (req, res) => {
  const allClass = await classModel.getAllClasses();
  !allClass.length? res.json({ Messge: 'No class found' }) : res.json({ allClass });
});

classroute.delete('/delclass', async (req, res) => {
  const { class_name } = req.body;
  const classId = await classModel.getClassByName(class_name);
  console.log(classId)
  await classModel.deleteClass(classId.id);
  res.json({ Message: 'Class successfully deleted' });
});

module.exports = classroute;
