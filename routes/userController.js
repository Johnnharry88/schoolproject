const express = require('express');
const multer = require('multer');
const path = require('path');
const userModel = require('../databasefiles/userModel');
const roleModel = require('../databasefiles/roleModel');
const routeuser = express.Router();

const diskPath = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'profilePics_upload/');
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.fieldname}${path.extname(file.originalname)}`);
  }
});

const upload = multer({ storage: diskPath });

routeuser.post('/register', upload.single('photo'), async (req, res) => {
  let pics_name = req.file? `${req.file.path}` : 'profilePics_upload/1781117312296-photo.png';
  const { first_name, last_name, email, phone, gender, status, password, role } = req.body;
  const roles = await roleModel.getAllRoles();
  const role_id = roles.find(r => r.Name === role);
  if (!role_id) {
    res.json({ Message: "Role does not exist" });
    return;
  }
  const user = await userModel.createUser(first_name, last_name, email, password, role_id.id, phone, gender, status, pics_name);
  if (!user) {
    res.json({ Message: 'Error occured while creating user' });
    return;
  }
  res.json({ Message: "User details received" });
});

routeuser.get('/allusers', async (req, res) => {
  const users = await userModel.getAllUsers();
  if (!users) {
    res.json({ Message: 'Error occured while fetching users' });
    return;
  }
  res.json(users);
});

module.exports = { routeuser, upload };
