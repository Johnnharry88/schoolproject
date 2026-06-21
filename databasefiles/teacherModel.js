const dbConn = require('./db');

async function getAllTeachers() {
  const [ teachers ] = await dbConn.query(`SELECT id, user_id, employee_no FROM teachers`);
  return teachers
}

async function getTeacherById(id) {
  const [ teacher ] = await dbConn.query(`SELECT id, user_id, employee_no FROM teachers WHERE id = ?`, [id]);
  return teacher[0];
}

async function createTeacher(user_id, employee_no) {
  const [ post_teacher ] = await dbConn.query(`INSERT INTO teachers( user_id, employee_no ) VALUES (?, ?)`, [user_id, employee_no]);
  return post_teacher.insertId;
}

async function updateTeacher(id, user_id, employee_no) {
  const [ updateTeacher ] = await dbConn.query(`UPDATE teachers SET user_id = ?, employee_no = ? WHERE id = ?`, [id, user_id, employee_no]);
  return updateTeacher.affectedRows;
}

async function deleteTeacher(id) {
  const [ delTeacher ] = await dbConn.query(`DELETE FROM teachers WHERE id = ?`, [id]);
  return delTeacher.affectedRows;
}

module.exports = { getAllTeachers, getTeacherById, createTeacher, updateTeacher, deleteTeacher };
