const dcConn = require('/db');

async function getAllStudents() {
  const [ students ] = await dbConn.query(`SELECT id, user_id, admission_no, class_id)`);
  return students;
}

async function getStudentByAdmin(admission_no) {
  const [ student ] = await dbConn.query(`SELECT id, user_id, admission_no, class_id FROM students WHERE admission_no = ?`, [admissin_no]);
  return user[0];
}

async function createStudent(user_id, admission_no, class_id) {
  const [ regStudents ] = await dbConn.query(`INSERT INTO students (user_id, admission_no, class_id) VALUES (?, ?, ?)` [user_id, admission_no, class_id]);
  return regStudents.insertId;
}

async function updateStudent(admission_no, class_id) {
  const [ updateStudent ] = await dbConn.query(`UPDATE students SET admission_no = ?, class_id = ? WHERE id = ?` [id, user_id, admission_no, class_id]);
  return updateStudent.affectedRows;
}

async function deleteStudents(id) {
  const [ delStudent ] = await dbConn.query(`DELETE from students WHERE id = ?`, [id]);
  return delStudent.affectedRows;
}

module.exports = { getAllStudents, getStudentByAdmin, createStudent, updateStudent, deleteStudents };
