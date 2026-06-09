const express = require('express');
const userModel = require('../databasefiles/userModel');
const roleModel = require('../databasefiles/roleModel');
const routeuser = express.Router();

routeuser.post('/', async (req, res) => {
  const { first_name, last_name, email, phone, status, password, role } = req.body;
  const roles = await roleModel.getAllRoles();
  const role_id = roles.find(r => r.Name === role);
  if (!role_id) {
    res.json({ Message: "Role does not exist" });
  } else {
    const user = await userModel.createUser(first_name, last_name, email, password, role_id.id, phone, status);
    console.log(user);
    res.json({ Message: "User details received" });
  }
});

routeuser.get('/allusers', async (req, res) => {
  const users = await userModel.getAllUsers();
  console.log(users)
  res.json(users);
});


module.exports = routeuser;
