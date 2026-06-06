const express = require('express');
const db = require('./db')
const app = express();

app.get('/', (req, res) => {
  res.json({ greeting : "Welcome Back John" });
});

async function startServer() {
  try {
    const checkDb = await db.getConnection();
    console.log('Db Connected successfully')
    checkDb.release();
    app.listen(3080, () => {
    console.log("Server running on port 3080");
    });
  } catch (err) {
    console.error('Server startup failed',err.message);
    process.exit(1);
  }
}
startServer();
