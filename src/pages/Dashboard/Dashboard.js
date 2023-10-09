import React from "react";

import JohnImg from "../../utils/images/john.jpg";
import { studentInfo } from "../../utils/studentInfo";

import ProgressBar from "@ramonak/react-progress-bar";
import { StudentAttendance } from "../../utils/attendance";

import { notificationData } from "../../utils/notificationData";
import { ToastContainer, toast } from "react-toastify";

const Dashboard = () => {
  const student = studentInfo[0];

  const storedData = localStorage.getItem("userData");

  const storedUser = JSON.parse(storedData);

  // Find the student's attendance data based on name and ID
  const studentAttendance = StudentAttendance.find(
    (student) =>
      student.studentName === storedUser?.name &&
      student.studentID === storedUser?.id
  );

  if (!studentAttendance) {
    toast(`Attendance data not found for ${storedUser?.name}`);
    return (
      <div className="font-bold text-red-500">
        Attendance data not found for {storedUser?.name}.
      </div>
    );
  }

  return (
    <div className="flex">
      <div className="w-3/4 p-4">
        {/* student info section */}
        <>
          <div className="bg-white rounded-lg shadow-md border p-6 max-w-full">
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
                <span className="font-bold">Course Name:</span>{" "}
                {student.courseName}
              </p>
              <p className="text-gray-600">
                <span className="font-bold">Branch Name:</span>{" "}
                {student.branchName}
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
        </>
        {/* Attendance section */}
        <>
          <div className="container shadow-lg rounded-lg p-4 m-4 flex item-center border max-w-full mx-auto">
            <div className="container flex justify-center">
              {studentAttendance.subjects.map((subject) => {
                // Calculate attendance percentage for each subject
                const attended = subject.dailyAttendance.filter(
                  (entry) => entry.attendanceType === "P"
                ).length;
                const delivered = subject.dailyAttendance.length;
                const attendancePercentage = (attended / delivered) * 100;

                return (
                  <span key={subject.subjectID} className="px-4 w-full">
                    <p className="font-bold">{subject.subjectName}</p>
                    <ProgressBar
                      completed={Math.floor(attendancePercentage)}
                      bgColor={"var(--attendance-progress)"}
                      height={"20px"}
                      width={"100%"}
                      borderRadius={"2em"}
                      labelAlignment="right"
                      baseBgColor={"#e0e0de"}
                      labelColor={"#fff"}
                      labelSize={"15px"}
                      isLabelVisible={true}
                      dir={"ltr"}
                      ariaValuemin={0}
                      ariaValuemax={100}
                      ariaValuetext={null}
                      maxCompleted={100}
                    />
                    <p className="text-sm">Attended: {attended}</p>
                    <p className="text-sm">Delivered: {delivered}</p>
                  </span>
                );
              })}
            </div>
          </div>
        </>
      </div>
      {/* notifications section */}
      <div className="w-1/4 p-4">
        <div className="container shadow-lg rounded-lg p-4 m-4 flex item-center border max-w-fit mx-auto">
          <div className="max-h-[50vh] overflow-y-auto flex flex-col">
            {notificationData.map((notification) => (
              <div
                key={notification.id}
                className="flex-shrink-0 w-full my-2 border bg-white rounded-lg shadow-md"
              >
                <div className="p-4">
                  <p className="font-bold text-lg">{notification.title}</p>
                  <p className="text-gray-600">{notification.content}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default Dashboard;
