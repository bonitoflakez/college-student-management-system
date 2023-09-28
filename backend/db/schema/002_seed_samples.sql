-- Enable the uuid-ossp extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- roles
INSERT INTO roles (role_id, role_name) VALUES
(1, 'Admin'),
(2, 'Faculty'),
(3, 'Student');

-- branches
INSERT INTO branches (branch_id, branch_name) VALUES
(1, 'Computer Science'),
(2, 'Electrical Engineering'),
(3, 'Mechanical Engineering');

-- student
INSERT INTO student (student_id, uuid, name, email, password, role_id) VALUES
(1, uuid_generate_v4(), 'John Doe', 'john@example.com', 'password123', 3),
(2, uuid_generate_v4(), 'Jane Smith', 'jane@example.com', 'securepass', 3);

-- admin
INSERT INTO admin_users (admin_id, uuid, name, email, password, role_id) VALUES
(1, uuid_generate_v4(), 'Admin1', 'admin1@example.com', 'adminpass', 1);

-- faculty
INSERT INTO faculty (faculty_id, uuid, name, email, password, role_id, branch_id) VALUES
(1, uuid_generate_v4(), 'Professor A', 'professorA@example.com', 'faculty123', 2, 1),
(2, uuid_generate_v4(), 'Professor B', 'professorB@example.com', 'faculty456', 2, 2);

-- courses
INSERT INTO courses (course_id, course_name, course_cordinator, branch_id) VALUES
(1, 'Introduction to Programming', 'Professor A', 1),
(2, 'Electrical Circuits', 'Professor B', 2);

-- student_info
INSERT INTO student_info (student_id, name, email, phone_no, branch_id, group_no, current_year, current_sem) VALUES
(1, 'John Doe', 'john@example.com', '123-456-7890', 1, 'Group A', 2, 4),
(2, 'Jane Smith', 'jane@example.com', '987-654-3210', 2, 'Group B', 3, 3);

-- student_course_info
INSERT INTO student_course_info (student_id, branch_id, name, course_id, mentor, faculty, lecture_delivered, lecture_attended, semester, course_cordinator) VALUES
(1, 1, 'John Doe', 1, 'Mentor A', 'Professor A', 20, 18, 4, 'Professor A'),
(2, 2, 'Jane Smith', 2, 'Mentor B', 'Professor B', 15, 14, 3, 'Professor B');

-- student_grade_info
INSERT INTO student_grade_info (student_id, course_id, exam_type, grades_secured, total_marks, semester) VALUES
(1, 1, 'Midterm', 85.5, 100, 4),
(2, 2, 'Final', 92.0, 100, 3);

-- student_personal_info
INSERT INTO student_personal_info (student_id, name, email, phone_no, branch, tenth_grades, twelfth_grades, adhaar_no, guardian_name, guardian_contact, blood_group) VALUES
(1, 'John Doe', 'john@example.com', '123-456-7890', 'Computer Science', '95%', '88%', '1234567890', 'Parent A', '987-654-3210', 'A+'),
(2, 'Jane Smith', 'jane@example.com', '987-654-3210', 'Electrical Engineering', '88%', '90%', '0987654321', 'Parent B', '123-456-7890', 'B+');

-- student_attendance_info
INSERT INTO student_attendance_info (student_id, course_id, lectures_attended, lectures_delivered, semester) VALUES
(1, 1, 18, 20, 4),
(2, 2, 14, 15, 3);
