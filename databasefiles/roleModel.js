const dbConn = require('./db')

async function createRole(name) {
  const [ role ] = await dbConn.query("INSERT INTO roles(Name) VALUES(?)", [name]);
  return role.insertId;
}

async function getAllRoles() {
  const [ roles ] = await dbConn.query(`SELECT id, Name from roles`);
  return roles;
}

module.exports = { createRole, getAllRoles };
