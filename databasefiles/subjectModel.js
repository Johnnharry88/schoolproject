const dbConn = require('./db');

async function getAllSubjects() {
  const [ allsubjects ] = await dbConn.query(`SELECT id, subject FROM subjects`);
  return allsubjects.insertId;
}

async function createSubjects(name) {
  const [ post_subjects ] = await dbConn.query(`INSERT into subjects(subject) VALUES(?)`, [name]);
  return post_subjects,insertId;
}

async function getSubjetsByNAme(name) {
  const [ subjectId ] = await dbConn.query(`SELECT id FROM subjects WHERE subject = ?`, [name]);
  return subjectId;
}

async function delSubject(id) {
  const [ del_subject ] = await dbConn.query(`DELETE from subjects WHERE id = ?`, [id]);
  return del_subject.affectedRows;
}

module.exports = { getAllSubjects, createSubjects, getSubjectByName, delSubject };
