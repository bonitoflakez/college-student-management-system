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

  const [courses, setCourses] = useState([]);
  const [branches, setBranches] = useState([]);
  const [groups, setGroups] = useState([]);

  useEffect(() => {
    // Fetch course names
    axios.get("http://localhost:8000/api/fetch/course").then((courseRes) => {
      setCourses(courseRes.data.resData);
    });

    // Fetch branch names
    axios.get("http://localhost:8000/api/fetch/branch").then((branchRes) => {
      setBranches(branchRes.data.resData);
    });

    // Fetch group names
    axios.get("http://localhost:8000/api/fetch/group").then((groupRes) => {
      setGroups(groupRes.data.resData);
    });
  }, []);

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
    try {
      const response = await axios.post(
        "http://localhost:8000/api/student/add-details",
        formData,
        {
          headers: {
            Authorization: `Bearer ${userLocalData.authToken}`,
          },
        }
      );

      if (response.status === 200) {
        toast.success("Successfully added student data");
      }

      closeAddStudentDetailsModal();
    } catch (error) {
      console.error(error);
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
              <div>
                Student Name:
                <input
                  type="text"
                  name="name"
                  placeholder="Name"
                  value={formData.name}
                  onChange={handleFormChange}
                  className="outline-none border px-2 py-1 rounded-sm m-2"
                />
              </div>

              <div>
                Student Phone Number:
                <input
                  type="text"
                  name="phone_number"
                  placeholder="Phone Number"
                  value={formData.phone_number}
                  onChange={handleFormChange}
                  className="outline-none border px-2 py-1 rounded-sm m-2"
                />
              </div>

              <div>
                Guardian Name:
                <input
                  type="text"
                  name="guardian_name"
                  placeholder="Guardian Name"
                  value={formData.guardian_name}
                  onChange={handleFormChange}
                  className="outline-none border px-2 py-1 rounded-sm m-2"
                />
              </div>

              <div>
                Guardian Email:
                <input
                  type="text"
                  name="guardian_email"
                  placeholder="Guardian Email"
                  value={formData.guardian_email}
                  onChange={handleFormChange}
                  className="outline-none border px-2 py-1 rounded-sm m-2"
                />
              </div>

              <div>
                Guardian Phone Number:
                <input
                  type="text"
                  name="guardian_phone_number"
                  placeholder="Guardian Phone Number"
                  value={formData.guardian_phone_number}
                  onChange={handleFormChange}
                  className="outline-none border px-2 py-1 rounded-sm m-2"
                />
              </div>

              <div>
                Joining Session:
                <input
                  type="text"
                  name="joining_session"
                  placeholder="Joining Session"
                  value={formData.joining_session}
                  onChange={handleFormChange}
                  className="outline-none border px-2 py-1 rounded-sm m-2"
                />
              </div>

              <select
                name="course_name"
                value={formData.course_name}
                onChange={handleFormChange}
                className="outline-none border px-2 py-1 rounded-sm mx-2"
              >
                <option value="">Select Course</option>
                {courses.map((course) => (
                  <option key={course.course_id} value={course.course_name}>
                    {course.course_name}
                  </option>
                ))}
              </select>

              <select
                name="branch_name"
                value={formData.branch_name}
                onChange={handleFormChange}
                className="outline-none border px-2 py-1 rounded-sm mx-2"
              >
                <option value="">Select Branch</option>
                {branches.map((branch) => (
                  <option key={branch.branch_id} value={branch.branch_name}>
                    {branch.branch_name}
                  </option>
                ))}
              </select>

              <select
                name="group_id"
                value={formData.group_id}
                onChange={handleFormChange}
                className="outline-none border px-2 py-1 rounded-sm mx-2"
              >
                <option value="">Select Group</option>
                {groups.map((group) => (
                  <option key={group.group_id} value={group.group_id}>
                    {group.group_name}
                  </option>
                ))}
              </select>

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
