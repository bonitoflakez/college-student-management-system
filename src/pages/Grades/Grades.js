import React, { useCallback, useEffect, useState } from "react";
import axios from "axios";
import jwtDecode from "jwt-decode";
import Modal from "react-modal";
import { ToastContainer, toast } from "react-toastify";

const Grades = () => {
  const [studentGrades, setStudentGrades] = useState([]);
  const [isFacultyOrAdmin, setIsFacultyOrAdmin] = useState(false);
  const [inputStudentId, setInputStudentId] = useState("");

  // State for modal
  const [isAddingGrade, setIsAddingGrade] = useState(false);

  // State for form inputs
  const [gradeFormData, setGradeFormData] = useState({
    student_id: "",
    subject_name: "",
    max_grades: "",
    secured_grades: "",
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

  console.log(decodeToken);

  const fetchStudentGrades = useCallback(async () => {
    try {
      const response = await axios.post(
        "http://localhost:8000/api/grades/fetch",
        {
          student_id: decodeToken.id,
        },
        {
          headers: {
            Authorization: `Bearer ${storedData.authToken}`,
          },
        }
      );

      setStudentGrades(response.data.resData);
    } catch (error) {
      console.error(error);
    }
  }, [decodeToken.id, storedData.authToken]);

  useEffect(() => {
    if (decodeToken.role === "Student") {
      fetchStudentGrades();
    } else {
      setIsFacultyOrAdmin(true);
    }
  }, [decodeToken.role, fetchStudentGrades]);

  const getStudentGrades = async (inputId) => {
    try {
      const response = await axios.post(
        "http://localhost:8000/api/grades/fetch",
        {
          student_id: inputId,
        },
        {
          headers: {
            Authorization: `Bearer ${storedData.authToken}`,
          },
        }
      );

      if (response.status === 200) {
        setStudentGrades(response.data.resData);
      }
    } catch (error) {
      console.error(error);
    }
  };

  // Function to open the modal
  const openAddGradeModal = () => {
    setIsAddingGrade(true);
  };

  const closeAddGradeModal = () => {
    setIsAddingGrade(false);
  };

  // Function to handle changes in form inputs
  const handleGradeFormChange = (e) => {
    const { name, value } = e.target;
    setGradeFormData({
      ...gradeFormData,
      [name]: value,
    });
  };

  // Function to add a grade
  const addGrade = async () => {
    try {
      await axios.post("http://localhost:8000/api/grades/add", gradeFormData, {
        headers: {
          Authorization: `Bearer ${storedData.authToken}`,
        },
      });
      setIsAddingGrade(false);
      getStudentGrades(inputStudentId);
      toast.success("Added grades successfully");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <div>
        <h2 className="font-bold text-2xl text-center">Grades</h2>
        {isFacultyOrAdmin && (
          <div>
            <input
              type="text"
              placeholder="Enter Student ID"
              value={inputStudentId}
              onChange={(e) => setInputStudentId(e.target.value)}
              className="outline-none border px-2 py-1 rounded-sm m-2"
            />
            <button
              onClick={() => getStudentGrades(inputStudentId)}
              className="border px-2 py-1 rounded-sm m-2"
            >
              Get Student Grades
            </button>
            <button
              onClick={openAddGradeModal}
              className="border px-2 py-1 rounded-sm m-2"
            >
              Add Grade
            </button>
          </div>
        )}
        {studentGrades.length > 0 ? (
          <table className="border-collapse border border-gray-300 w-fit mx-auto">
            <thead>
              <tr>
                <th
                  style={{ background: "var(--accent)" }}
                  className="p-2 border border-gray-300 text-white"
                >
                  Student ID
                </th>
                <th
                  style={{ background: "var(--accent)" }}
                  className="p-2 border border-gray-300 text-white"
                >
                  Subject Name
                </th>
                <th
                  style={{ background: "var(--accent)" }}
                  className="p-2 border border-gray-300 text-white"
                >
                  Max Grades
                </th>
                <th
                  style={{ background: "var(--accent)" }}
                  className="p-2 border border-gray-300 text-white"
                >
                  Secured Grades
                </th>
                <th
                  style={{ background: "var(--accent)" }}
                  className="p-2 border border-gray-300 text-white"
                >
                  Percentage
                </th>
              </tr>
            </thead>
            <tbody>
              {studentGrades.map((grade, index) => (
                <tr key={index}>
                  <td className="p-2 border border-gray-300">
                    {grade.student_id}
                  </td>
                  <td className="p-2 border border-gray-300">
                    {grade.subject_name}
                  </td>
                  <td className="p-2 border border-gray-300">
                    {grade.max_grades}
                  </td>
                  <td className="p-2 border border-gray-300">
                    {grade.secured_grades}
                  </td>
                  <td className="p-2 border border-gray-300">
                    {`${Math.floor(
                      (grade.secured_grades / grade.max_grades) * 100
                    )}%`}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p className="text-center font-bold text-2xl">
            No data found for this user's grades
          </p>
        )}
        <>
          <Modal
            isOpen={isAddingGrade}
            onRequestClose={closeAddGradeModal}
            contentLabel="Add Grade Modal"
          >
            <h2>Add Grade</h2>
            <div>
              Student ID:
              <input
                type="text"
                name="student_id"
                placeholder="Student ID"
                value={gradeFormData.student_id}
                onChange={handleGradeFormChange}
                className="outline-none border rounded-sm px-2 py-1 m-2"
              />
            </div>
            <div>
              <div>
                Subject Name:
                <select
                  name="subject_name"
                  value={gradeFormData.subject_name}
                  onChange={handleGradeFormChange}
                  className="outline-none border rounded-sm px-2 py-1 m-2"
                >
                  <option value="">Select a subject</option>
                  {Object.values(subjectNameMap).map((subjectName) => (
                    <option key={subjectName} value={subjectName}>
                      {subjectName}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            <div>
              Max Grades:
              <input
                type="text"
                name="max_grades"
                placeholder="Max Grades"
                value={gradeFormData.max_grades}
                onChange={handleGradeFormChange}
                className="outline-none border rounded-sm px-2 py-1 m-2"
              />
            </div>
            <div>
              Secured Grades:
              <input
                type="text"
                name="secured_grades"
                placeholder="Secured Grades"
                value={gradeFormData.secured_grades}
                onChange={handleGradeFormChange}
                className="outline-none border rounded-sm px-2 py-1 m-2"
              />
            </div>
            <button onClick={addGrade} className="border rounded-md px-2 py-1">
              Add Grade
            </button>
          </Modal>
        </>
      </div>
      <ToastContainer/>
    </>
  );
};

export default Grades;
