const dbConn = require('./db');

async function getAllSession() {
  const [ sessions ] = await dbConn.query(`SELECT id, session_name FROM academic_session`);
  return sessions
}

async function createSession(session_name, active) {
  const [ session ] = await dbConn.query(`INSERT INTO academic_session(session_name, active) VALUES (?, ?)`, [session_name, active]);
  return session.insertId;
}

async function getSessionByName(session_name) {
  const [ session ] = await dbConn.query(`SELECT id, session_name FROM academic_session WHERE session_name = ?`, [session_name]);
  return session[0];
}

async function getSessionById(id) {
  const [ session ] = await dbConn.query(`SELECT id, session_name FROM academic_session WHERE id = ?`, [id]);
  return session;
}

async function updateSession(id) {
  const [ updSession ] = await dbConn.query(`UPDATE academic_session SET session_name = ? WHERE id = ?`, [session_name, id ]);
  return updSession.affectedRows;
}

async function deleteSession(id) {
  const [ delClass ] = await dbConn.query(`DELETE from academic_session WHERE id = ?`, [id]);
  return details.affectedRows;
}

async function activateSession(session_name) {
  await dbConn.query(`UPDATE academic_session SET active = FALSE`);
  const [ activate ] = await dbConn.query(`UPDATE academic_session SET active = TRUE WHERE session_name = ?`, [session_name]);
  return activate.affectedRows;
}

module.exports = { getAllSession, createSession, getSessionById, updateSession, deleteSession, activateSession, getSessionByName };
