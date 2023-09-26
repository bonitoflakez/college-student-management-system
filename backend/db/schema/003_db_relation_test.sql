-- write better tests



-- Test 1: Inserting a student with an invalid foreign key reference
-- This should fail because the student_id in student_info does not exist in the student table
INSERT INTO
  student_info (
    student_id,
    name,
    email,
    phone_no,
    branch,
    group_no,
    department,
    current_year,
    current_sem
  )
VALUES
  (
    3,
    'Invalid Student',
    'invalid@example.com',
    '123-456-7890',
    'Computer Science',
    'A',
    'Engineering',
    2,
    4
  );

-- Test 2: Updating a student's primary key (student_id)
-- This should fail because primary keys should not be updated
UPDATE
  student
SET
  student_id = 3
WHERE
  student_id = 1;

-- Test 3: Deleting a student with related records in other tables
-- This should fail because of foreign key constraints
DELETE FROM
  student
WHERE
  student_id = 1;

-- Test 4: Query to retrieve a student's course information
-- This should return a student's course information if the foreign keys are set up correctly
SELECT
  *
FROM
  student_course_info
WHERE
  student_id = 2;

-- Test 5: Query to retrieve a student's personal information
-- This should return a student's personal information if the foreign keys are set up correctly
SELECT
  *
FROM
  student_personal_info
WHERE
  student_id = 2;