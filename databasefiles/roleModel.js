const dbConn = require('./db')

async function createRole(name) {
  const [ role ] = await dbConn.query("INSERT INTO roles(Name) VALUES(?)", [name]);
  return role.insertId;
}

async function getAllRoles() {
  const [ roles ] = await dbConn.query(`SELECT id, Name from roles`);
  return roles;
}

async function getRolesByName(name) {
  const [ user_role ] = await dbConn.query(`SELECT id FROM roles WHERE Name = ?`, [name]);
  return user_role[0].id;
}

module.exports = { createRole, getAllRoles, getRolesByName };
