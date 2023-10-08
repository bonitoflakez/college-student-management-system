import React from "react";
import ProgressBar from "@ramonak/react-progress-bar";
import { Subjects } from "../../utils/attendance";

const Attendance = () => {
  return (
    <>
      <h2 className="font-bold text-2xl text-center">Attendance</h2>
      <div className="container p-4 m-4 flex item-center border max-w-screen mx-auto">
        {/* todo: add show attendance by session/semester */}
        <div className="container flex justify-center">
          {Subjects.map((s) => {
            // counters
            let attended = 0;
            let delivered = 0;

            s.dailyAttendance.forEach((entry) => {
              if (entry.attendanceType === "P") {
                attended++;
                delivered++;
              } else if (entry.attendanceType === "A") {
                delivered++;
              }
            });

            const attendancePercentage = (attended / delivered) * 100;

            return (
              <span key={s.id} className="px-4 w-full">
                <p className="font-bold">{s.subjectName}</p>
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
                    {s.dailyAttendance.map((entry, index) => (
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
    </>
  );
};

export default Attendance;
