const express = require('express');
const db = require('./databasefiles/db')
const roleFunc = require('./routes/roleController')
const userFunc = require('./routes/userController')
const app = express();

app.use(express.json());

app.get('/', (req, res) => {
  res.json({ greeting : "Welcome Back John" });
});

app.use('/roles', roleFunc);
app.use('/user' , userFunc);
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
