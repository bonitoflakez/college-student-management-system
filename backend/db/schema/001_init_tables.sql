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
  student_id VARCHAR(255) NOT NULL,
  phone_number VARCHAR(20),
  guardian_name VARCHAR(255),
  guardian_email VARCHAR(255),
  guardian_phone_number VARCHAR(20),
  course_name VARCHAR(255),
  branch_name VARCHAR(255),
  joining_session INT
);