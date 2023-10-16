import React, { useState } from "react";
import { studentGradeList } from "../../utils/studentGradeList";

const Grades = () => {
  const storedData = localStorage.getItem("userData");

  const storedUser = JSON.parse(storedData);

  // calculate CGPA based on grades and credits
  const calculateCGPA = (courses) => {
    let totalCredits = 0;
    let totalWeightedGradePoints = 0;

    // grade to CGPA
    const gradeToCGPA = {
      O: 10,
      A: 9,
      B: 8,
      C: 7,
      D: 6,
      E: 5,
      F: 0,
    };

    courses.forEach((course) => {
      const gradePoint = gradeToCGPA[course.grade];
      const courseCredits = course.credits;
      totalWeightedGradePoints += gradePoint * courseCredits;
      totalCredits += courseCredits;
    });

    return (totalWeightedGradePoints / totalCredits).toFixed(2);
  };

  // calculate SGPA for a semester
  const calculateSGPA = (courses) => {
    const grades = courses.map((course) => course.grade);
    return calculateCGPA(courses);
  };

  // Find the selected student's data
  const selectedStudent = studentGradeList.find(
    (student) =>
      student.studentName === storedUser?.name &&
      student.studentID === storedUser?.id
  );

  return (
    <>
      {selectedStudent && (
        <div>
          <h2 className="font-bold text-2xl text-center">Grades</h2>
          {selectedStudent.semesters.map((semester, index) => (
            <div key={index} className="mx-auto max-w-4xl">
              <h3 className="mt-4 mb-2 text-lg font-semibold">
                {semester.semesterName}
              </h3>
              <table className="w-full border-collapse border border-gray-300">
                <thead>
                  <tr>
                    <th className="p-2 border border-gray-300">Course ID</th>
                    <th className="p-2 border border-gray-300">Course Name</th>
                    <th className="p-2 border border-gray-300">Grade</th>
                    <th className="p-2 border border-gray-300">Credits</th>
                  </tr>
                </thead>
                <tbody>
                  {semester.courses.map((course, courseIndex) => (
                    <tr key={courseIndex}>
                      <td className="p-2 border border-gray-300">
                        {course.courseID}
                      </td>
                      <td className="p-2 border border-gray-300">
                        {course.courseName}
                      </td>
                      <td className="p-2 border border-gray-300">
                        {course.grade}
                      </td>
                      <td className="p-2 border border-gray-300">
                        {course.credits}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <p className="mt-2">
                <strong>SGPA:</strong> {calculateSGPA(semester.courses)}
              </p>
            </div>
          ))}
          <div className="mx-auto max-w-4xl mt-4">
            <h3 className="text-lg font-semibold">Cumulative CGPA:</h3>
            <p>
              {(
                selectedStudent.semesters.reduce(
                  (sum, semester) =>
                    sum + parseFloat(calculateSGPA(semester.courses)),
                  0
                ) / selectedStudent.semesters.length
              ).toFixed(2)}
            </p>
          </div>
        </div>
      )}
    </>
  );
};

export default Grades;
