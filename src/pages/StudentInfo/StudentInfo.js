import React from "react";
import { studentInfo } from "../../utils/studentInfo";

import JohnImg from "../../utils/images/john.jpg";

const StudentInfo = () => {
  const student = studentInfo[0];

  return (
    <div className="bg-white rounded-lg shadow-md p-6 max-w-lg mx-auto mt-16">
      <h2 className="font-bold text-2xl mb-4">Student Info</h2>
      <div className="flex items-center mb-4">
        <img
          src={JohnImg}
          alt={student.name}
          className="h-24 w-24 rounded-full mr-4"
        />
        <div>
          <h3 className="text-xl font-semibold">{student.name}</h3>
          <p className="text-gray-600">
            <span className="font-bold">Phone:</span> {student.phone}
          </p>
          <p className="text-gray-600">
            <span className="font-bold">Email:</span> {student.email}
          </p>
          <p className="text-gray-600">
            <span className="font-bold">University Email:</span>{" "}
            {student.universityEmail}
          </p>
          <p className="text-gray-600">
            <span className="font-bold">Group Number:</span>{" "}
            {student.groupNumber}
          </p>
        </div>
      </div>
      <hr />
      <div>
        <p className="text-gray-600">
          <span className="font-bold">Course Name:</span> {student.courseName}
        </p>
        <p className="text-gray-600">
          <span className="font-bold">Branch Name:</span> {student.branchName}
        </p>
        <p className="text-gray-600">
          <span className="font-bold">Current Subjects:</span>
        </p>
        <ul className="list-disc pl-6">
          {student.currentSubjects.map((subject) => (
            <li key={subject.courseId} className="text-gray-600">
              {subject.subjectName} ({subject.courseId})
            </li>
          ))}
        </ul>
        <hr />
        <p className="text-gray-600">
          <span className="font-bold">Guardian Name:</span>{" "}
          {student.guardianName}
        </p>
        <p className="text-gray-600">
          <span className="font-bold">Guardian Phone:</span>{" "}
          {student.guardianPhone}
        </p>
        <p className="text-gray-600">
          <span className="font-bold">Guardian Email:</span>{" "}
          {student.guardianEmail}
        </p>
      </div>
    </div>
  );
};

export default StudentInfo;
