-- Roles Table
CREATE TABLE roles (
  role_id SERIAL PRIMARY KEY,
  role_name VARCHAR(255) NOT NULL
);

-- Subroles Table
CREATE TABLE subroles (
  subrole_id SERIAL PRIMARY KEY,
  subrole_name VARCHAR(255) NOT NULL
);

-- Courses Table
CREATE TABLE courses (
  course_id SERIAL PRIMARY KEY,
  course_name VARCHAR(255) NOT NULL
);

-- Branches Table
CREATE TABLE branches (
  branch_id SERIAL PRIMARY KEY,
  branch_name VARCHAR(255) NOT NULL
);

-- Subjects Table
CREATE TABLE subjects (
  subject_id SERIAL PRIMARY KEY,
  subject_name VARCHAR(255) NOT NULL,
  course_id INT REFERENCES courses(course_id),
  branch_id INT REFERENCES branches(branch_id)
);

-- Groups Table
CREATE TABLE groups (
  group_id SERIAL PRIMARY KEY,
  branch_name VARCHAR(255) NOT NULL,
  group_name VARCHAR(255) NOT NULL
);

-- Users Table (for Admin, Student, Faculty)
CREATE TABLE users (
  uid SERIAL PRIMARY KEY,
  user_id VARCHAR(255) UNIQUE NOT NULL,
  email VARCHAR(255) UNIQUE NOT NULL,
  username VARCHAR(255) UNIQUE NOT NULL,
  password VARCHAR(255) NOT NULL,
  role_id INT,
  FOREIGN KEY (role_id) REFERENCES roles (role_id)
);

-- Student Details Table
CREATE TABLE student_details (
  sid SERIAL PRIMARY KEY,
  name VARCHAR(255),
  email VARCHAR(255) NOT NULL,
  student_id VARCHAR(255) UNIQUE NOT NULL,
  phone_number VARCHAR(20),
  guardian_name VARCHAR(255),
  guardian_email VARCHAR(255),
  guardian_phone_number VARCHAR(20),
  group_id INT REFERENCES groups(group_id),
  course_name VARCHAR(255),
  branch_name VARCHAR(255),
  joining_session INT
);

CREATE TABLE student_subjects (
  student_id VARCHAR(255) REFERENCES student_details(student_id),
  subject_id INT REFERENCES subjects(subject_id)
);

-- Faculty Details Table
CREATE TABLE faculty_details (
  fid SERIAL PRIMARY KEY,
  name VARCHAR(255),
  email VARCHAR(255) NOT NULL,
  faculty_id VARCHAR(255) UNIQUE NOT NULL,
  phone_number VARCHAR(20),
  subrole_id INT REFERENCES subroles(subrole_id),
  group_id INT REFERENCES groups(group_id),
  course_name VARCHAR(255),
  branch_name VARCHAR(255),
  joining_session INT
);

-- Student Attendance Table
CREATE TABLE student_attendance (
  attendance_id SERIAL PRIMARY KEY,
  student_id VARCHAR(255) REFERENCES student_details(student_id),
  student_name VARCHAR(255),
  present BOOLEAN,
  attendance_date DATE,
  subject_id INT REFERENCES subjects(subject_id)
);

-- Student Grades Table

-- CREATE TABLE student_grades (
--   grade_id SERIAL PRIMARY KEY,
--   student_id VARCHAR(255) REFERENCES student_details(student_id),
--   subject_id INT REFERENCES subjects(subject_id),
--   max_grades INT,
--   secured_grades INT
-- );

CREATE TABLE student_grades (
  grade_id SERIAL PRIMARY KEY,
  student_id VARCHAR(255) REFERENCES student_details(student_id),
  subject_name VARCHAR(255), -- Store subject name instead of subject_id
  max_grades INT,
  secured_grades INT
);
