-- roles
CREATE TABLE roles (
  role_id INT PRIMARY KEY,
  role_name VARCHAR(255)
);

-- branches
CREATE TABLE branches (
  branch_id INT PRIMARY KEY,
  branch_name VARCHAR(255)
);

-- student
CREATE TABLE student (
  student_id INT PRIMARY KEY,
  uuid UUID UNIQUE,
  name VARCHAR(255),
  email VARCHAR(255),
  password VARCHAR(255),
  role_id INT,
  FOREIGN KEY (role_id) REFERENCES roles (role_id)
);

-- admin
CREATE TABLE admin_users (
  admin_id INT PRIMARY KEY,
  uuid UUID UNIQUE,
  name VARCHAR(255),
  email VARCHAR(255),
  password VARCHAR(255),
  role_id INT,
  FOREIGN KEY (role_id) REFERENCES roles (role_id)
);

-- faculty
CREATE TABLE faculty (
  faculty_id INT PRIMARY KEY,
  uuid UUID UNIQUE,
  name VARCHAR(255),
  email VARCHAR(255),
  password VARCHAR(255),
  role_id INT,
  branch_id INT,
  -- try subroles
  FOREIGN KEY (role_id) REFERENCES roles (role_id),
  FOREIGN KEY (branch_id) REFERENCES branches (branch_id)
);

-- courses
CREATE TABLE courses (
  course_id INT PRIMARY KEY,
  course_name VARCHAR(255),
  course_cordinator VARCHAR(255),
  branch_id INT,
  FOREIGN KEY (branch_id) REFERENCES branches (branch_id)
);

-- student_info
CREATE TABLE student_info (
  student_id INT,
  name VARCHAR(255),
  email VARCHAR(255),
  phone_no VARCHAR(20),
  branch_id INT,
  group_no VARCHAR(255),
  current_year INT,
  current_sem INT,
  FOREIGN KEY (student_id) REFERENCES student (student_id),
  FOREIGN KEY (branch_id) REFERENCES branches (branch_id)
);

-- student_course_info
CREATE TABLE student_course_info (
  student_id INT,
  branch_id INT,
  name VARCHAR(255),
  course_id INT,
  mentor VARCHAR(255),
  faculty VARCHAR(255),
  lecture_delivered INT,
  lecture_attended INT,
  semester INT,
  course_cordinator VARCHAR(255),
  FOREIGN KEY (student_id) REFERENCES student (student_id),
  FOREIGN KEY (course_id) REFERENCES courses (course_id),
  FOREIGN KEY (branch_id) REFERENCES branches (branch_id)
);

-- student_grade_info
CREATE TABLE student_grade_info (
  student_id INT,
  course_id INT,
  exam_type VARCHAR(255),
  grades_secured DECIMAL(5, 2),
  total_marks DECIMAL(5, 2),
  semester INT,
  FOREIGN KEY (student_id) REFERENCES student (student_id),
  FOREIGN KEY (course_id) REFERENCES courses (course_id)
);

-- student_personal_info
CREATE TABLE student_personal_info (
  student_id INT,
  name VARCHAR(255),
  email VARCHAR(255),
  phone_no VARCHAR(20),
  branch VARCHAR(255),
  tenth_grades VARCHAR(10),
  twelfth_grades VARCHAR(10),
  adhaar_no VARCHAR(12),
  guardian_name VARCHAR(255),
  guardian_contact VARCHAR(20),
  blood_group VARCHAR(5),
  FOREIGN KEY (student_id) REFERENCES student (student_id)
);

-- student_attendance_info
CREATE TABLE student_attendance_info (
  student_id INT,
  course_id INT,
  lectures_attended INT,
  lectures_delivered INT,
  semester INT,
  FOREIGN KEY (student_id) REFERENCES student (student_id),
  FOREIGN KEY (course_id) REFERENCES courses (course_id)
);