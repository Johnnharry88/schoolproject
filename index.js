const express = require('express');
const db = require('./db')
const app = express();

app.get('/', (req, res) => {
  res.json({ greeting : "Welcome Back John" });
});

app.listen(3080, () => {
  console.log("Server running on port 3080");
});
