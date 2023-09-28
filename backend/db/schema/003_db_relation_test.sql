-- Retrieve all students with their respective roles
SELECT
  s.name AS student_name,
  r.role_name
FROM
  student s
  JOIN roles r ON s.role_id = r.role_id;

-- Retrieve all faculty members with their branches
SELECT
  f.name AS faculty_name,
  b.branch_name
FROM
  faculty f
  JOIN branches b ON f.branch_id = b.branch_id;

-- Retrieve all courses along with their course coordinators and branch names
SELECT
  c.course_name,
  c.course_cordinator,
  b.branch_name
FROM
  courses c
  JOIN branches b ON c.branch_id = b.branch_id;

-- Retrieve student information along with their corresponding personal details
SELECT
  si.name AS student_name,
  si.email,
  si.phone_no,
  si.branch_id,
  si.group_no,
  si.current_year,
  si.current_sem,
  spi.tenth_grades,
  spi.twelfth_grades,
  spi.adhaar_no,
  spi.guardian_name,
  spi.guardian_contact,
  spi.blood_group
FROM
  student_info si
  JOIN student_personal_info spi ON si.student_id = spi.student_id;

-- Retrieve student enrollment details for a specific course and semester
SELECT
  sci.name AS student_name,
  c.course_name,
  sci.semester,
  sci.course_cordinator
FROM
  student_course_info sci
  JOIN courses c ON sci.course_id = c.course_id
WHERE
  c.course_name = 'Introduction to Programming'
  AND sci.semester = 4;

-- Retrieve student grades for a specific course
SELECT
  s.name AS student_name,
  c.course_name,
  sgi.exam_type,
  sgi.grades_secured,
  sgi.total_marks,
  sgi.semester
FROM
  student_grade_info sgi
  JOIN student s ON sgi.student_id = s.student_id
  JOIN courses c ON sgi.course_id = c.course_id
WHERE
  c.course_name = 'Electrical Circuits';

-- Retrieve student attendance for a specific course and semester
SELECT
  s.name AS student_name,
  c.course_name,
  sai.lectures_attended,
  sai.lectures_delivered,
  sai.semester
FROM
  student_attendance_info sai
  JOIN student s ON sai.student_id = s.student_id
  JOIN courses c ON sai.course_id = c.course_id
WHERE
  c.course_name = 'Introduction to Programming'
  AND sai.semester = 3;