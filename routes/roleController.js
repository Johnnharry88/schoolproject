const express = require('express');
const roleModel = require('../databasefiles/roleModel');
const router = express.Router();

router.post('/', async (req, res) => {
  const { role } = req.body
  console.log(role)
  const postrole = await roleModel.createRole(role);
  console.log(postrole);
  res.json({Server: "Now Using Router"})
});
router.get('/', (req, res) => {
  res.json({Server: "Getting all router"})
});

module.exports = router;


