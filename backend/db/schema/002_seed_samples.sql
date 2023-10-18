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