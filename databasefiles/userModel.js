const dbConn = require('./db')

async function getAllUsers() {
  const [ users ] = await dbConn.query("SELECT id, first_name, last_name, email, status, phone from users");
  return users;
}

async function getUserById(id) {
  const [ user ] = await dbConn.query("SELECT id, first_name, last_name, email FROM users WHERE id =?", [id]);
  return user[0];
}

async function createUser(first_name, last_name, email, password, role_id, phone, status) {
  const [ details ] = await dbConn.query('INSERT INTO users( first_name, last_name, email, hashed_password, role_id, phone, status) VALUES (?,?,?,?,?,?,?)',[first_name, last_name, email, password, role_id, phone, status]);
  return details.insertId;
}

async function updateUser(id, first_name, last_name, email, hashed_passkey, role_id, phone, status) {
  const [ details ] = await dbConn.query("UPDATE users SET first_name = ?, last_name = ?, email = ?, hashed_password = ?, role_id = ?, phone = ?, status = ? WHERE id = ?", [first_nae, last_name, email, hashed_passkey,role_id, phone, status]);
  return details.affectedRows;
}

async function deleteUser(id) {
  const [ details ] = await dbConn.query("DELETE FROM users WHERE id = ?", [id]);
  return details.affectedRows;
}

module.exports = { getAllUsers, getUserById, createUser, updateUser, deleteUser };
