import React from "react";
import { ToastContainer, toast } from "react-toastify";
import ProgressBar from "@ramonak/react-progress-bar";
import { StudentAttendance } from "../../utils/attendance";

const Attendance = () => {
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
        Attendance data not found for {storedUser?.name};
      </div>
    );
  }

  return (
    <>
      <h2 className="font-bold text-2xl text-center">Attendance</h2>
      <div className="container p-4 m-4 flex item-center border max-w-screen mx-auto">
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

                <table className="table-auto mt-4 w-full">
                  <thead>
                    <tr>
                      <th>Date</th>
                      <th>Type</th>
                    </tr>
                  </thead>
                  <tbody>
                    {subject.dailyAttendance.map((entry, index) => (
                      <tr key={index}>
                        <td className="text-center">{entry.date}</td>
                        <td className="text-center">{entry.attendanceType}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </span>
            );
          })}
        </div>
      </div>
      <ToastContainer />
    </>
  );
};

export default Attendance;
