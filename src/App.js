import { Route, Routes, Navigate } from "react-router-dom";

import Navbar from "./components/Navbar/Navbar";
import Dashboard from "./pages/Dashboard/Dashboard";
import Attendance from "./pages/Attendance/Attendance";
import Auth from "./pages/Auth/Auth";
import Grades from "./pages/Grades/Grades";
import StudentInfo from "./pages/StudentInfo/StudentInfo";
import NotFound from "./pages/NotFound/NotFound";

function PrivateRoute({ component: Component }) {
  const userLocalData = JSON.parse(localStorage.getItem("userData"));

  if (!userLocalData?.id) {
    return <Navigate to="/auth" />;
  }

  return <Component />;
}

const App = () => {
  return (
    <>
      <Navbar />
      <main>
        <Routes>
          <Route path="/" element={<PrivateRoute component={Dashboard} />} />
          <Route
            path="/attendance"
            element={<PrivateRoute component={Attendance} />}
          />
          <Route path="/grades" element={<PrivateRoute component={Grades} />} />
          <Route
            path="/studentInfo"
            element={<PrivateRoute component={StudentInfo} />}
          />
          <Route path="/auth" element={<Auth />} />
          {/* Add a catch-all route for unmatched URLs */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
    </>
  );
};

export default App;
