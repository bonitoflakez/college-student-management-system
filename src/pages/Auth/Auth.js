import { useState } from "react";
import styles from "./auth.module.css";

const Auth = () => {
  const [isStudent, setIsStudent] = useState(true);
  const [isRegistering, setIsRegistering] = useState(true);
  const [formData, setFormData] = useState({
    id: "",
    name: "",
    email: "",
    password: "",
    branch: "",
    session: "",
    role: "",
  });

  const toggleUserType = () => {
    setIsStudent(!isStudent);
  };

  const toggleRegistration = () => {
    setIsRegistering(!isRegistering);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!isStudent) {
      formData.role = "faculty";
    } else {
      formData.role = "student";
    }

    if (isRegistering) {
      localStorage.setItem("userData", JSON.stringify(formData));
    } else {
      const storedData = localStorage.getItem("userData");
      if (storedData) {
        const storedUser = JSON.parse(storedData);
        if (
          storedUser.email === formData.email &&
          storedUser.password === formData.password
        ) {
          console.log("Login successful");
        } else {
          console.log("Invalid login credentials");
        }
      } else {
        console.log("User not registered");
      }
    }
  };

  return (
    <div className="container mx-auto flex justify-center items-center">
      <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
        <h2 className="font-bold text-xl text-center">
          {isRegistering ? "Registration" : "Login"} (
          {isStudent ? "Student" : "Faculty"})
        </h2>
        <form onSubmit={handleSubmit}>
          {isRegistering && (
            <>
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2">
                  {isStudent ? "Student ID" : "Faculty ID"}
                </label>
                <input
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  name="id"
                  type="text"
                  placeholder={isStudent ? "Student ID" : "Faculty ID"}
                  value={formData.id}
                  onChange={handleChange}
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2">
                  Branch
                </label>
                <input
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  name="branch"
                  type="text"
                  placeholder="Branch"
                  value={formData.branch}
                  onChange={handleChange}
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2">
                  Session
                </label>
                <input
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  name="session"
                  type="text"
                  placeholder="Session"
                  value={formData.session}
                  onChange={handleChange}
                />
              </div>
            </>
          )}
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              {isRegistering ? "Name" : "Role"}
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              name={isRegistering ? "name" : "role"}
              type="text"
              placeholder={isRegistering ? "Name" : "Role"}
              value={formData.name}
              onChange={handleChange}
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Email
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              name="email"
              type="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
            />
          </div>
          <div className="mb-6">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Password
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
              name="password"
              type="password"
              placeholder="********"
              value={formData.password}
              onChange={handleChange}
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
              onClick={toggleUserType}
            >
              <p className="px-2">
                {isStudent ? "Switch to Faculty" : "Switch to Student"}
              </p>
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
      </div>
    </div>
  );
};

export default Auth;