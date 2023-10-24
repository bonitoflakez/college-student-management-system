import React, { useState } from "react";
import styles from "./navbar.module.css";
import { Link } from "react-router-dom";

const Navbar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  const logOut = () => {
    localStorage.removeItem("csmsUserData");
    window.location("/auth");
  };

  return (
    <nav className={`p-4 ${styles.navbar}`}>
      <div className="container mx-auto flex items-center justify-between">
        <div className="text-white text-xl font-bold">XYZ University</div>

        <div className="hidden md:flex space-x-4">
          <Link to="/attendance" className={`font-bold ${styles.nav_font}`}>
            Attendance
          </Link>
          <Link to="/grades" className={`font-bold ${styles.nav_font}`}>
            Grades
          </Link>
          <Link to="/" className={`font-bold ${styles.nav_font}`}>
            Info
          </Link>
          <Link to="/auth" className={`font-bold ${styles.nav_font}`}>
            Login/Signup
          </Link>
          <Link
            to="/auth"
            className={`font-bold ${styles.nav_font}`}
            onClick={logOut}
          >
            Logout
          </Link>
        </div>

        <div className="md:hidden">
          <button
            onClick={toggleMobileMenu}
            className={`${styles.nav_mob_btn_font} ${styles.nav_btn}`}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </button>

          {mobileMenuOpen && (
            <div
              className={`absolute top-16 right-0 bg-white p-4 mt-2 rounded shadow-md`}
            >
              <Link
                to="/attendance"
                className={`block font-semibold mb-2 ${styles.nav_mob_link_font}`}
              >
                Attendance
              </Link>
              <Link
                to="/grades"
                className={`block font-semibold mb-2 ${styles.nav_mob_link_font}`}
              >
                Grades
              </Link>
              <Link
                to="/"
                className={`block font-semibold mb-2 ${styles.nav_mob_link_font}`}
              >
                Info
              </Link>
              <Link to="/auth" className={`font-bold ${styles.nav_font}`}>
                Login/Signup
              </Link>
              <Link
                to="/auth"
                className={`font-bold ${styles.nav_font}`}
                onClick={logOut}
              >
                Logout
              </Link>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
