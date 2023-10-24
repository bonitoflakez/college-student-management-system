import { Route, Routes, Navigate } from "react-router-dom";

import Navbar from "./components/Navbar/Navbar";
import Attendance from "./pages/Attendance/Attendance";
import Auth from "./pages/Auth/Auth";
import Grades from "./pages/Grades/Grades";
import Info from "./pages/Info/Info";
import NotFound from "./pages/NotFound/NotFound";

function PrivateRoute({ component: Component }) {
  const userLocalData = JSON.parse(localStorage.getItem("csmsUserData"));

  if (!userLocalData?.authToken) {
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
          <Route
            path="/attendance"
            element={<PrivateRoute component={Attendance} />}
          />
          <Route path="/" element={<PrivateRoute component={Info} />} />
          <Route path="/grades" element={<PrivateRoute component={Grades} />} />
          <Route path="/auth" element={<Auth />} />
          {/* Add a catch-all route for unmatched URLs */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
    </>
  );
};

export default App;
