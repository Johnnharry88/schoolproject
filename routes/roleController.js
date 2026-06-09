const express = require('express');
const roleModel = require('../databasefiles/roleModel');
const router = express.Router();

router.post('/', async (req, res) => {
  const { role } = req.body
  const postrole = await roleModel.createRole(role);
  res.json({Message: 'New Role saved successfully'})
});

router.get('/allroles', async (req, res) => {
  const allroles = await roleModel.getAllRoles();
  if (!allroles) {
    res.json("No existing role, please create one")
  } else {
    res.json(allroles);
  }
});

module.exports = router;


