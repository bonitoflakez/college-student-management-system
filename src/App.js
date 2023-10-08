import { Route, Routes } from "react-router-dom";

import Navbar from "./components/Navbar/Navbar";
import Dashboard from "./pages/Dashboard/Dashboard";
import Attendance from "./pages/Attendance/Attendance";
import Auth from "./pages/Auth/Auth";
import Grades from "./pages/Grades/Grades";
import StudentInfo from "./pages/StudentInfo/StudentInfo";
import NotFound from "./pages/NotFound/NotFound";

const App = () => {
  return (
    <>
      <Navbar />
      <main>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/attendance" element={<Attendance />} />
          <Route path="/grades" element={<Grades />} />
          <Route path="/studentInfo" element={<StudentInfo />} />
          <Route path="/auth" element={<Auth />} />
          {/* Add a catch-all route for unmatched URLs */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
    </>
  );
};

export default App;
