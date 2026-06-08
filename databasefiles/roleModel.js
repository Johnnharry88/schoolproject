const dbConn = require('./db')

async function createRole(name) {
  const [ role ] = await dbConn.query("INSERT INTO roles(Name) VALUES(?)", [name]);
  return role.insertId;
}
module.exports = { createRole };
