const classModel = require('../databasefiles/classModel');
const express = require('express');
const classroute = express.Router();
const sessionModel = require('../databasefiles/sessionModel');

classroute.post('/create_class', async (req, res) => {
  const { class_name } = req.body;
  if (!class_name) {
    res.json({ Message: 'No class in the field' });
    return;
  }
  const sessionId = await sessionModel.getActiveSession();
  if (!sessionId) {
    res.json({ Message: 'Error occured while processing session' });
    return;
  }
  const newClass = await classModel.createClass(class_name, sessionId[0].id);
  if (!newClass) {
    res.json({ Message: 'Error occured  while processinng new lass' });
    return;
  }
  res.json({ Message: 'New Class created' });
});

classroute.get('/getallclass', async (req, res) => {
  const allClass = await classModel.getAllClasses();
  !allClass.length? res.json({ Messge: 'No class found' }) : res.json({ allClass });
});

classroute.delete('/delclass', async (req, res) => {
  const { class_name } = req.body;
  if (!class_name) {
    res.json({ Message: 'No class sent' });
    return;
  }
  const classId = await classModel.getClassByName(class_name);
  if (!classId) {
    res.json({ Message: 'Error occured while processing class' });
    return;
  }
  const delclass = await classModel.deleteClass(classId.id);
  if (!delclass) {
    res.json({ Message: 'Error occured while removing class' });
    return;
  }
  res.json({ Message: 'Class successfully deleted' });
});

module.exports = classroute;
