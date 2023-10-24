import React, { useCallback, useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import ProgressBar from "@ramonak/react-progress-bar";
import Modal from "react-modal";
import jwtDecode from "jwt-decode";
import axios from "axios";

const Attendance = () => {
  const [studentAttendance, setStudentAttendance] = useState([]);
  const [isFacultyOrAdmin, setIsFacultyOrAdmin] = useState(false);
  const [inputStudentId, setInputStudentId] = useState("");
  const [isAddingAttendance, setIsAddingAttendance] = useState(false);
  const [attendanceFormData, setAttendanceFormData] = useState({
    student_id: "",
    student_name: "",
    present: false,
    attendance_date: "",
    subject_id: null,
  });

  const subjectNameMap = {
    1: "Introduction to Programming",
    2: "Data Structures and Algorithms",
    3: "Database Management",
    4: "Web Development",
    5: "Electric Circuits",
    6: "Digital Electronics",
    7: "Power Systems",
    8: "Control Systems",
    9: "Mechanics of Materials",
    10: "Thermodynamics",
    11: "Fluid Mechanics",
    12: "Machine Design",
    13: "Organic Chemistry",
    14: "Inorganic Chemistry",
    15: "Physical Chemistry",
    16: "Analytical Chemistry",
  };

  const storedData = JSON.parse(localStorage.getItem("csmsUserData"));

  const decodeToken = jwtDecode(storedData.authToken);

  // Function to open the modal for adding attendance
  const openAddAttendanceModal = () => {
    setIsAddingAttendance(true);
  };

  // Function to close the modal
  const closeAddAttendanceModal = () => {
    setIsAddingAttendance(false);
  };

  // Function to handle changes in form inputs
  const handleAttendanceFormChange = (e) => {
    const { name, value } = e.target;
    setAttendanceFormData({
      ...attendanceFormData,
      [name]: value,
    });
  };

  const fetchStudentAttendance = useCallback(
    async (studentID) => {
      const response = await axios.post(
        "http://localhost:8000/api/attendance/fetch",
        {
          student_id: studentID,
        },
        {
          headers: {
            Authorization: `Bearer ${storedData.authToken}`,
          },
        }
      );

      setStudentAttendance(response.data.resData);

      console.log(response.data.resData);
    },
    [storedData.authToken]
  );

  useEffect(() => {
    try {
      if (decodeToken.role === "Student") {
        const sID = decodeToken.id;
        fetchStudentAttendance(sID);
      } else {
        setIsFacultyOrAdmin(true);
      }
    } catch (error) {
      console.error(error);
    }
  }, [fetchStudentAttendance, decodeToken.role, decodeToken.id]);

  // Function to add attendance data
  const addAttendance = async () => {
    try {
      const response = await axios.post(
        "http://localhost:8000/api/attendance/mark",
        attendanceFormData,
        {
          headers: {
            Authorization: `Bearer ${storedData.authToken}`,
          },
        }
      );

      // Display a success message

      if (response) {
        toast.success("Attendance added successfully");
      }

      fetchStudentAttendance(attendanceFormData.student_id);
      // Close the modal
      closeAddAttendanceModal();
    } catch (error) {
      console.error(error);
      // Display an error message
      toast.error("Error adding attendance");
    }
  };

  const calculateTotalLectures = (subjectID) => {
    return studentAttendance.filter((record) => record.subject_id === subjectID)
      .length;
  };

  // Function to calculate the total unattended lectures for a specific subject
  const calculateTotalAttendedLectures = (subjectID) => {
    return studentAttendance.filter(
      (record) => record.subject_id === subjectID && record.present
    ).length;
  };

  const uniqueSubjectIDs = Array.from(
    new Set(studentAttendance.map((record) => record.subject_id))
  );

  return (
    <>
      <h2 className="font-bold text-2xl text-center">Attendance</h2>

      {/* Add student search and add attendance button for faculty/admin */}
      {isFacultyOrAdmin && (
        <>
          <div>
            <input
              type="text"
              placeholder="Enter Student ID"
              value={inputStudentId}
              onChange={(e) => setInputStudentId(e.target.value)}
              className="outline-none border px-2 py-1 rounded-sm m-2"
            />
            <button
              onClick={() => fetchStudentAttendance(inputStudentId)}
              className="border px-2 py-1 rounded-sm m-2"
            >
              Search
            </button>
          </div>
          <div>
            <button
              onClick={openAddAttendanceModal}
              className="border px-2 py-1 rounded-sm m-2"
            >
              Add Attendance
            </button>
          </div>
        </>
      )}

      {uniqueSubjectIDs.length > 0 ? (
        <div className="grid sm:grid-cols-1 md:grid-cols-4 gap-6">
          {uniqueSubjectIDs.map((subjectID) => (
            <div className="px-12" key={subjectID}>
              <h3>{subjectNameMap[subjectID]}</h3>
              <ProgressBar
                completed={Math.floor(
                  (calculateTotalAttendedLectures(subjectID) /
                    calculateTotalLectures(subjectID)) *
                    100
                )}
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
              <p>Attended: {calculateTotalAttendedLectures(subjectID)}</p>
              <p>Delivered: {calculateTotalLectures(subjectID)}</p>
              <table className="w-full table-auto border-collapse border border-slate-500">
                <thead>
                  <tr>
                    <th
                      style={{ background: "var(--accent)" }}
                      className="px-4 py-2 text-white font-semibold"
                    >
                      Student ID
                    </th>
                    <th
                      style={{ background: "var(--accent)" }}
                      className="px-4 py-2 text-white font-semibold"
                    >
                      Present
                    </th>
                    <th
                      style={{ background: "var(--accent)" }}
                      className="px-4 py-2 text-white font-semibold"
                    >
                      Attendance Date
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {studentAttendance
                    .filter((record) => record.subject_id === subjectID)
                    .map((attendanceRecord, index) => (
                      <tr key={index}>
                        <td className="px-4 py-2 text-center">
                          {attendanceRecord.student_id}
                        </td>
                        <td className="px-4 py-2 text-center">
                          {attendanceRecord.present ? "Yes" : "No"}
                        </td>
                        <td className="px-4 py-2 text-center">
                          {new Date(
                            attendanceRecord.attendance_date
                          ).toLocaleDateString()}
                        </td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>
          ))}
        </div>
      ) : (
        <p>No attendance data found</p>
      )}

      <Modal
        isOpen={isAddingAttendance}
        onRequestClose={closeAddAttendanceModal}
        contentLabel="Add Attendance Modal"
      >
        <h2>Add Attendance</h2>
        <div>
          Student ID:
          <input
            type="text"
            name="student_id"
            placeholder="Student ID"
            value={attendanceFormData.student_id}
            onChange={handleAttendanceFormChange}
            className="outline-none border rounded-sm px-2 py-1 m-2"
          />
        </div>
        <div>
          Student Name:
          <input
            type="text"
            name="student_name"
            placeholder="Student Name"
            value={attendanceFormData.student_name}
            onChange={handleAttendanceFormChange}
            className="outline-none border rounded-sm px-2 py-1 m-2"
          />
        </div>
        <div>
          Present:
          <select
            name="present"
            value={attendanceFormData.present}
            onChange={handleAttendanceFormChange}
            className="outline-none border rounded-sm px-2 py-1 m-2"
          >
            <option value={true}>Present</option>
            <option value={false}>Absent</option>
          </select>
        </div>
        <div>
          Subject:
          <select
            name="subject_id"
            value={attendanceFormData.subject_id}
            onChange={handleAttendanceFormChange}
            className="outline-none border rounded-sm px-2 py-1 m-2"
          >
            <option value={null}>Select a subject</option>
            {Object.keys(subjectNameMap).map((subjectID) => (
              <option key={subjectID} value={subjectID}>
                {subjectNameMap[subjectID]}
              </option>
            ))}
          </select>
        </div>
        <div>
          Attendance Date:
          <input
            type="date"
            name="attendance_date"
            value={attendanceFormData.attendance_date}
            onChange={handleAttendanceFormChange}
            className="outline-none border rounded-sm px-2 py-1 m-2"
          />
        </div>
        <button onClick={addAttendance} className="border rounded-md px-2 py-1">
          Add Attendance
        </button>
      </Modal>

      <ToastContainer />
    </>
  );
};

export default Attendance;
