-- Insert sample data into the roles table
INSERT INTO
  roles (role_name)
VALUES
  ('Admin'),
  ('Faculty'),
  ('Student');

-- Insert sample data into the subroles table
INSERT INTO
  subroles (subrole_name)
VALUES
  ('Mentor'),
  ('Faculty'),
  ('Trainer');

-- Insert sample data into the courses table
INSERT INTO
  courses (course_name)
VALUES
  ('Computer Science and Engineering'),
  ('Electrical Engineering'),
  ('Mechanical Engineering'),
  ('Chemistry');

-- Insert sample data into the branches table
INSERT INTO
  branches (branch_name)
VALUES
  ('Computer Science'),
  ('Electrical and Electronics'),
  ('Mechanical Engineering'),
  ('Chemistry');

-- Insert 5 groups for Computer Science branch
INSERT INTO
  groups (branch_name, group_name)
VALUES
  ('Computer Science', 'CS1'),
  ('Computer Science', 'CS2'),
  ('Computer Science', 'CS3'),
  ('Computer Science', 'CS4'),
  ('Computer Science', 'CS5');

-- Insert 5 groups for Electrical and Electronics branch
INSERT INTO
  groups (branch_name, group_name)
VALUES
  ('Electrical and Electronics', 'EE1'),
  ('Electrical and Electronics', 'EE2'),
  ('Electrical and Electronics', 'EE3'),
  ('Electrical and Electronics', 'EE4'),
  ('Electrical and Electronics', 'EE5');

-- Insert 5 groups for Mechanical Engineering branch
INSERT INTO
  groups (branch_name, group_name)
VALUES
  ('Mechanical Engineering', 'ME1'),
  ('Mechanical Engineering', 'ME2'),
  ('Mechanical Engineering', 'ME3'),
  ('Mechanical Engineering', 'ME4'),
  ('Mechanical Engineering', 'ME5');

-- Insert 5 groups for Chemistry branch
INSERT INTO
  groups (branch_name, group_name)
VALUES
  ('Chemistry', 'CH1'),
  ('Chemistry', 'CH2'),
  ('Chemistry', 'CH3'),
  ('Chemistry', 'CH4'),
  ('Chemistry', 'CH5');

-- Insert sample data into the subjects table
INSERT INTO
  subjects (subject_name, course_id, branch_id)
VALUES
  -- Subjects for Computer Science
  ('Introduction to Programming', 1, 1),
  ('Data Structures and Algorithms', 1, 1),
  ('Database Management', 1, 1),
  ('Web Development', 1, 1),
  -- Subjects for Electrical Engineering
  ('Electric Circuits', 2, 2),
  ('Digital Electronics', 2, 2),
  ('Power Systems', 2, 2),
  ('Control Systems', 2, 2),
  -- Subjects for Mechanical Engineering
  ('Mechanics of Materials', 3, 3),
  ('Thermodynamics', 3, 3),
  ('Fluid Mechanics', 3, 3),
  ('Machine Design', 3, 3),
  -- Subjects for Chemistry
  ('Organic Chemistry', 4, 4),
  ('Inorganic Chemistry', 4, 4),
  ('Physical Chemistry', 4, 4),
  ('Analytical Chemistry', 4, 4);