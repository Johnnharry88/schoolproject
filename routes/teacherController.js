const express = require('express');
const teacherModel = require('../databasefiles/teacherModel');
const userModel = require('../databasefiles/userModel');
const roleModel = require('../databasefiles/roleModel');
const UserControl = require('./userController');
const empKey = require('../databasefiles/employKeyGen');

const upLoad = UserControl.upload;
const teachroute = express.Router();

teachroute.post('/register', upLoad.single("photo"), async (req, res) => {
  const { first_name, last_name, email, password, gender, phone, status } = req.body;
  const roleId = await roleModel.getRolesByName('teacher');
  if (!roleId) {
    res.json({ Message: 'Error Occured processing role' });
    return;
  }
  let picsPath = req.file? `${req.file.path}` : `profilePics_upload/1781117312296-photo.png`;
  const teacherUser = await userModel.createUser(first_name, last_name, email, password, roleId, phone, gender, status, picsPath);
  if (!teacherUser) {
    res.json({ Message: 'Error occured while processing useer' });
    return;
  }
  const employee_no = await empKey.generateUniqueEmpKey(teacherUser);
  if (!employee_no) {
    res.json({ Message: 'Error occured while processing admission number' });
    return;
  }
  const newTeacher = await teacherModel.createTeacher(teacherUser, employee_no)
  if (!newTeacher) {
    res.json({ Message: 'Error occured while processing teacher' });
    return;
  }
  res.json({ Message: 'Employee processed successfully' });
});

teachroute.get('/fetchallteachers', async(req, res) => {
  const allTeach = await teacherModel.getAllTeachers();
  if (allTeach.length === 0) {
    res.json({ Message: 'No employee found in database' });
    return;
  }
  res.json({ allTeach });
});

module.exports = teachroute;
