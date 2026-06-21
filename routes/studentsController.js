const express = require('express');
const studentsModel = require('../databasefiles/studentsModel');
const userModel = require('../databasefiles/userModel');
const roleModel = require('../databasefiles/roleModel');
const userControl = require('./userController');
const adminKey = require('../databasefiles/adminKeyGen');
const classModel = require('../databasefiles/classModel');

const studentroute = express.Router();
const Upload = userControl.upload;

studentroute.post('/register', Upload.single('photo'), async (req, res) => {
  const { first_name, last_name, email, password, gender, phone, status, class_name } = req.body;
  const roleId = await roleModel.getRolesByName('students');
  if (!roleId) {
    res.json({ Message: 'Error Occured please try again' });
    return;
  }
  const classId = await classModel.getClassByName(class_name);
  if (!class_name) {
    res.json({ Message: 'Error ocurred whwile processing class' });
    return;
  }
  let pics_path = req.file? `${req.file.path}` : `profilePics_upload/1781117312296-photo.png`
  const student_user = await userModel.createUser(first_name, last_name, email, password, roleId, phone, gender, status, pics_path);
  if (!student_user) {
    res.json({ Message: 'Error occured while processing user' });
    return;
  }
  const adminNo = await adminKey.generateUniqueNumber(student_user);
  if (!adminKey) {
    res.json({ Message: 'Error Occured while processing admission number' });
    return;
  }
  const newStudent = await studentsModel.createStudent(student_user, adminNo, classId.id);
  if (!newStudent) {
    res.json({ Message: 'Error Occured while processing student' });
  }
  res.json({ Message: 'Student created successfully' })
});

studentroute.get('/fetchstudents', async (req, res) => {
  const allStudents = await studentsModel.getAllStudents();
  if (!allStudents) {
    res.json({ Message: 'No students in database' });
    return;
  }
  res.json({ allStudents });
});
module.exports = studentroute;
