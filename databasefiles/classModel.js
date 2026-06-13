const dbConn = require('./db');

async function getAllClasses() {
  const [ allclasses ] = await dbConn.query(`SELECCT id, class_name, session_id from classes`);
  return allclasses;
}

async function getClassByName(class_name) {
  const [ getClass ] = await dbConn.query(`SELECT id, class_name, session_id FROM classes WHERE class_name = ?`, [class_name]);
  return getClass[0];
}

async function createClass(class_name, session_id) {
  const [ createClass ] = await dbConn.query(`INSERT INTO classes(class_name, session_id) VALUES (?, ?)`, [class_name, session_id]);
  return createClass.insertId;
}

async function updateClass(id, class_name, session_id) {
  const [ updateClass ] = await dbConn.query(`UPDATE classes SET class_name = ?, session_id = ?`, [class_name, session_id]);
  return updateClass.insertId;
}

async function deleteClass(id) {
  const [ delClass ] = await dbConn.query(`DELETE from classes WHERE id = ?`, [id]);
  return delClass.affectedRows;
}

module.exports = { getAllClasses, getCLassByName, createClass, deleteClass };
