const dbConn = require('./db')

async function createTable() {
  try {
    await dbConn.query(`CREATE TABLE IF NOT EXISTS roles (id INT AUTO_INCREMENT PRIMARY KEY, Name VARCHAR(50) UNIQUE NOT NULL)`);
    await dbConn.query(`CREATE TABLE IF NOT EXISTS users (id INT AUTO_INCREMENT PRIMARY KEY, first_name VARCHAR(100) NOT NULL, last_name VARCHAR(100) NOT NULL, email VARCHAR(250) UNIQUE NOT NULL, phone VARCHAR(20), hashed_password VARCHAR(256) UNIQUE NOT NULL, role_id INT NOT NULL, FOREIGN KEY(role_id) REFERENCES roles(id), status ENUM('active', 'inactive', 'suspended') DEFAULT 'active', created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP, updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP)`);
    await dbConn.query(`CREATE TABLE IF NOT EXISTS students (id INT AUTO_INCREMENT PRIMARY KEY, user_id INT UNIQUE NOT NULL, admission_no VARCHAR(50) UNIQUE NOT NULL, class_id INT NOT NULL, FOREIGN KEY(user_id) REFERENCES users(id), FOREIGN KEY(class_id) REFERENCES classes(id))`);
    await dbConn.query(`CREATE TABLE IF NOT EXISTS teachers (id INT AUTO_INCREMENT PRIMARY KEY, user_id INT UNIQUE NOT NULL, employee_no VARCHAR(50) UNIQUE NOT NULL, FOREIGN KEY(user_id) REFERENCES users(id))`);
    await dbConn.query(`CREATE TABLE IF NOT EXISTS academic_session (id INT AUTO_INCREMENT PRIMARY KEY, session_name VARCHAR(50) UNIQUE NOT NULL, active BOOLEAN DEFAULT FALSE)`);
    await dbConn.query(`CREATE TABLE IF NOT EXISTS classes (id INT AUTO_INCREMENT PRIMARY KEY, class_name VARCHAR(100) NOT NULL, session_id INT NOT NULL, FOREIGN KEY(session_id) REFERENCES academic_session(id))`);
    await dbConn.query(`CREATE TABLE IF NOT EXISTS subjects (id INT AUTO_INCREMENT PRIMARY KEY, subjects VARCHAR(100) UNIQUE NOT NULL)`);
    await dbConn.query(`CREATE TABLE IF NOT EXISTS term (id INT AUTO_INCREMENT PRIMARY KEY, session_id INT NOT NULL, term_name ENUM('First Term', 'Second Term', 'Third term') NOT NULL, start_date DATE, end_date DATE, is_active BOOLEAN DEFAULT FALSE, FOREIGN KEY(session_id) REFERENCES academic_session(id))`);
    await dbConn.query(`CREATE TABLE IF NOT EXISTS class_subjects (class_id INT NOT NULL, subject_id INT NOT NULL, teacher_id INT NOT NULL, PRIMARY KEY(class_id, subject_id), FOREIGN KEY(class_id) REFERENCES classes(id), FOREIGN KEY(subject_id) REFERENCES subjects(id), FOREIGN KEY(teacher_id) REFERENCES teachers(id))`);
    await dbConn.query(`CREATE TABLE IF NOT EXISTS results (id INT AUTO_INCREMENT PRIMARY KEY, student_id INT NOT NULL, subject_id INT NOT NULL, class_id INT NOT NULL, term_id INT NOT NULL, CAT_1 DECIMAL(5,2) NOT NULL DEFAULT 0, CAT_2 DECIMAL(5,2) NOT NULL DEFAULT 0, exam DECIMAL(5,2) NOT NULL DEFAULT 0, total DECIMAL(5,2) DEFAULT 0, grade VARCHAR(2), FOREIGN KEY (student_id) REFERENCES students(id))`);
    await dbConn.query(`CREATE TABLE IF NOT EXISTS school_fees (id INT AUTO_INCREMENT PRIMARY KEY, student_id INT NOT NULL, amount DECIMAL(10,2) NOT NULL, payment_method VARCHAR(20) NOT NULL, term_id INT NOT NULL, reference_no VARCHAR(50) UNIQUE, FOREIGN KEY(student_id) REFERENCES students(id), FOREIGN KEY(term_id) REFERENCES term(id))`);
    await dbConn.query(`CREATE TABLE IF NOT EXISTS bus_fees (id INT AUTO_INCREMENT PRIMARY KEY, student_id INT NOT NULL, location VARCHAR(20) NOT NULL, amount DECIMAL(10,2) NOT NULL, payment_method VARCHAR(20) NOT NULL, term_id INT NOT NULL, reference_no VARCHAR(50) UNIQUE, FOREIGN KEY(student_id) REFERENCES students(id), FOREIGN KEY(term_id) REFERENCES term(id))`);
  } catch (err) {
    console.error('Error Creating tables', err.message);
  } finally {
    await dbConn.end
    process.exit(0)
  }
}
createTable();
