import { useState } from "react";
import styles from "./auth.module.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Auth = () => {
  const [isRegistering, setIsRegistering] = useState(true);

  // Separate states for registration and login data
  const [registrationData, setRegistrationData] = useState({
    username: "",
    password: "",
    email: "",
    role: "Student",
  });

  const [loginData, setLoginData] = useState({
    userId: "",
    password: "",
  });

  const navigate = useNavigate();

  const toggleRegistration = () => {
    setIsRegistering(!isRegistering);

    // Reset input fields when switching forms
    // setRegistrationData({
    //   username: "",
    //   password: "",
    //   email: "",
    //   role: "Student",
    // });

    // setLoginData({
    //   userId: "",
    //   password: "",
    // });
  };

  const handleRegistrationChange = (e) => {
    const { name, value } = e.target;
    setRegistrationData({
      ...registrationData,
      [name]: value,
    });
  };

  const handleLoginChange = (e) => {
    const { name, value } = e.target;
    setLoginData({
      ...loginData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (isRegistering) {
      // Handle registration
      // Check if any of the required fields are empty
      if (
        !registrationData.username ||
        !registrationData.password ||
        !registrationData.email
      ) {
        toast.error("Invalid data in input fields.");
        return;
      }

      try {
        const response = await axios.post(
          "http://localhost:8000/api/auth/register",
          registrationData,
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );

        if (response.status === 201) {
          const responseData = response.data;

          toast.success(
            `${responseData.message} - ID: ${response.data.response.user_id}`
          );
        } else {
          toast.error("Registration failed");
        }
      } catch (error) {
        toast.error(
          error.response.data.message || "Error while registering this user"
        );
      }
    } else {
      // Handle login
      // Check if any of the required fields are empty
      if (!loginData.userId || !loginData.password) {
        toast.error("Invalid data in input fields.");
        return;
      }

      let data = {
        user_id: loginData.userId,
        password: loginData.password,
      };

      try {
        const response = await axios.post(
          "http://localhost:8000/api/auth/login",
          data,
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );

        if (response.status === 201) {
          const responseData = response.data;

          // If logged in successfully then store response data in localstorage
          localStorage.setItem(
            "csmsUserData",
            JSON.stringify(responseData.info)
          );

          toast.success(`${responseData.message}`);

          navigate("/");
        } else {
          toast.error("Invalid login credentials");
        }
      } catch (error) {
        toast.error(error.response.data.message || "Error while loggin in");
      }
    }
  };

  return (
    <div className="container mx-auto pt-10 flex justify-center items-center">
      <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
        <h2 className="font-bold text-xl text-center">
          {isRegistering ? "Registration" : "Login"}
        </h2>
        <form onSubmit={handleSubmit}>
          {isRegistering && (
            <>
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2">
                  Username*
                </label>
                <input
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  name="username"
                  type="text"
                  placeholder="Username"
                  value={registrationData.username}
                  onChange={handleRegistrationChange}
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2">
                  Email*
                </label>
                <input
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  name="email"
                  type="email"
                  placeholder="Email"
                  value={registrationData.email}
                  onChange={handleRegistrationChange}
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2">
                  Role*
                </label>
                <select
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  name="role"
                  value={registrationData.role}
                  onChange={handleRegistrationChange}
                >
                  <option value="Student">Student</option>
                  <option value="Faculty">Faculty</option>
                  <option value="Admin">Admin</option>
                </select>
              </div>
            </>
          )}
          {!isRegistering && (
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2">
                User ID*
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                name="userId"
                type="text"
                placeholder="User ID"
                value={loginData.userId}
                onChange={handleLoginChange}
              />
            </div>
          )}
          <div className="mb-6">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Password*
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
              name="password"
              type="password"
              placeholder="********"
              value={
                isRegistering ? registrationData.password : loginData.password
              }
              onChange={
                isRegistering ? handleRegistrationChange : handleLoginChange
              }
            />
          </div>
          <div className="flex items-center justify-between">
            <button
              className={`${styles.button} text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline`}
              type="submit"
            >
              {isRegistering ? "Register" : "Login"}
            </button>
            <button
              className={`inline-block align-baseline font-bold text-sm ${styles.txt}`}
              type="button"
              onClick={toggleRegistration}
            >
              <p className="px-2">
                {isRegistering ? "Switch to Login" : "Switch to Registration"}
              </p>
            </button>
          </div>
        </form>
        <ToastContainer />
      </div>
    </div>
  );
};

export default Auth;
