import React, { useEffect, useState } from "react";
import jwtDecode from "jwt-decode";
import axios from "axios";
import { toast } from "react-toastify";
import Modal from "react-modal"; // Import the modal library
import JohnImg from "../../utils/images/john.jpg";

// Set the root element for the modal
Modal.setAppElement("#root");

const Info = () => {
  const [student, setStudent] = useState({
    name: "",
    email: "",
    student_id: "",
    phone_number: "",
    guardian_name: "",
    guardian_email: "",
    guardian_phone_number: "",
    group_id: "",
    course_name: "",
    branch_name: "",
    joining_session: "",
  });

  const [isFacultyOrAdmin, setIsFacultyOrAdmin] = useState(false);

  const [formData, setFormData] = useState({
    student_id: "",
    name: "",
    phone_number: "",
    guardian_name: "",
    guardian_email: "",
    guardian_phone_number: "",
    group_id: "",
    course_name: "",
    branch_name: "",
    joining_session: "",
  });

  const [isAddingStudentDetails, setIsAddingStudentDetails] = useState(false);

  const userLocalData = JSON.parse(localStorage.getItem("csmsUserData"));

  useEffect(() => {
    const fetchData = async () => {
      if (userLocalData.authToken) {
        const token = userLocalData.authToken;
        const decodeToken = jwtDecode(token);
        const userRole = decodeToken.role;

        if (userRole === "Student") {
          try {
            const response = await axios.post(
              "http://localhost:8000/api/student/get-details",
              null,
              {
                headers: {
                  Authorization: `Bearer ${token}`,
                },
              }
            );

            setStudent(response.data.resData[0]);
          } catch (error) {
            console.error(error.response);

            if (error.response && error.response.status === 401) {
              toast.error("Unauthorized access");
            }
          }
        } else if (userRole === "Faculty" || userRole === "Admin") {
          // Set a flag to indicate that the user is Faculty or Admin
          setIsFacultyOrAdmin(true);
        }
      }
    };

    fetchData();
  }, [userLocalData.authToken]);

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSearchStudent = async () => {
    // Implement the logic to search for students based on student_id
    try {
      const response = await axios.post(
        "http://localhost:8000/api/student/search",
        {
          student_id: formData.student_id,
        },
        { 
          headers: {
            Authorization: `Bearer ${userLocalData.authToken}`,
          },
        }
      );

      setStudent(response.data.resData[0]);

      console.log(response);
    } catch (error) {
      console.error(error);
      // Handle errors
    }
  };

  const openAddStudentDetailsModal = () => {
    setIsAddingStudentDetails(true);
  };

  const closeAddStudentDetailsModal = () => {
    setIsAddingStudentDetails(false);
  };

  const handleSaveStudentDetails = async () => {
    // Implement the logic to add student details based on formData
    try {
      const response = await axios.post(
        "http://localhost:8000/api/add-student-details",
        formData,
        {
          headers: {
            Authorization: `Bearer ${userLocalData.authToken}`,
          },
        }
      );

      closeAddStudentDetailsModal();
    } catch (error) {
      console.error(error);
      // Handle errors
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6 max-w-lg mx-auto mt-16">
      <h2 className="font-bold text-2xl mb-4">Student Info</h2>
      {isFacultyOrAdmin && (
        <>
          <div>
            <input
              type="text"
              name="student_id"
              placeholder="Search student by ID"
              value={formData.student_id}
              onChange={handleFormChange}
              className="outline-none border px-2 py-1 rounded-sm"
            />
            <button
              onClick={handleSearchStudent}
              className="border px-2 py-1 rounded-sm"
            >
              Search
            </button>
          </div>
          <div>
            <button
              onClick={openAddStudentDetailsModal}
              className="border px-2 py-1 rounded-sm"
            >
              Add Student Details
            </button>
            <Modal
              isOpen={isAddingStudentDetails}
              onRequestClose={closeAddStudentDetailsModal}
              contentLabel="Add Student Details Modal"
            >
              {/* Input fields for adding student details */}
              {/* Include dropdowns for branch_name, course_name, etc. */}
              <input
                type="text"
                name="name"
                placeholder="Name"
                value={formData.name}
                onChange={handleFormChange}
                className="outline-none border px-2 py-1 rounded-sm"
              />
              {/* Include other input fields for faculty/admin here */}
              <button
                className="border px-2 py-1 rounded-sm"
                onClick={handleSaveStudentDetails}
              >
                Save Student Details
              </button>
              <button
                className="border px-2 py-1 rounded-sm"
                onClick={closeAddStudentDetailsModal}
              >
                Cancel
              </button>
            </Modal>
          </div>
        </>
      )}
      <div className="flex items-center mb-4">
        <img
          src={JohnImg}
          alt={student?.name}
          className="h-24 w-24 rounded-full mr-4"
        />
        <div>
          <h3 className="text-xl font-semibold">
            Name: {student?.name || "Not available"}
          </h3>
          <p className="text-gray-600">
            <span className="font-bold">ID:</span>{" "}
            {student?.student_id || "Not available"}
          </p>
          <p className="text-gray-600">
            <span className="font-bold">Phone:</span>{" "}
            {student?.phone_number || "Not available"}
          </p>
          <p className="text-gray-600">
            <span className="font-bold">Email:</span>{" "}
            {student?.email || "Not available"}
          </p>
          <p className="text-gray-600">
            <span className="font-bold">Group Number:</span>{" "}
            {student?.group_id || "Not available"}
          </p>
        </div>
      </div>
      <hr />
      <div>
        <p className="text-gray-600">
          <span className="font-bold">Course Name:</span>{" "}
          {student?.course_name || "Not available"}
        </p>
        <p className="text-gray-600">
          <span className="font-bold">Branch Name:</span>{" "}
          {student?.branch_name || "Not available"}
        </p>
        <p className="text-gray-600">
          <span className="font-bold">Current Subjects:</span>
        </p>
        <ul className="list-disc pl-6">
          {/* {student?.currentSubjects.map((subject) => (
            <li key={subject.courseId} className="text-gray-600">
              {subject.subjectName} ({subject.courseId})
            </li>
          ))} */}
        </ul>
        <hr />
        <p className="text-gray-600">
          <span className="font-bold">Guardian Name:</span>{" "}
          {student?.guardian_name || "Not available"}
        </p>
        <p className="text-gray-600">
          <span className="font-bold">Guardian Phone:</span>{" "}
          {student?.guardian_phone_number || "Not available"}
        </p>
        <p className="text-gray-600">
          <span className="font-bold">Guardian Email:</span>{" "}
          {student?.guardian_email || "Not available"}
        </p>
      </div>
    </div>
  );
};

export default Info;
