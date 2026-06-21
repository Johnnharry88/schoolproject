const express = require('express');
const roleModel = require('../databasefiles/roleModel');
const router = express.Router();

router.post('/', async (req, res) => {
  const { role } = req.body;
  if (!role) {
    res.json({ Message: 'Role not received' });
    return;
  }
  const postrole = await roleModel.createRole(role);
  if (!postrole) {
    res.json({ Message: 'Error occured while creating role' });
    return;
  }
  res.json({Message: 'New Role saved successfully'})
});

router.get('/allroles', async (req, res) => {
  const allroles = await roleModel.getAllRoles();
  if (!allroles) {
    res.json("No existing role, please create one")
    return;
  }
  res.json(allroles);
});

module.exports = router;
