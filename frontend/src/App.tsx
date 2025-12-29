import Course from "./pages/coursePage/course";

import Courses from "./pages/coursespage/courses";
import Home from "./pages/homepage/home";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from "./pages/loginPage/login";
import Signup from "./pages/signupPage/signup";
import SignupTeach from "./pages/signupPageTeach/signup";
import DashboardTeach from "./pages/dashboardTeach/dashboard";
import Content from "./components/dashboardComponents/content";
import FirstCourse from "./pages/firstCoursePage/firstcourse";
import LoginTeach from "./pages/loginPageTeach/login";
import CourseManage from "./components/courseManagement/courseManage";
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/home" element={<Home />} />
        <Route path="/courses" element={<Courses />} />
        <Route path="/course" element={<Course />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/teach/signup" element={<SignupTeach />} />
        <Route path="/teach/login" element={<LoginTeach />} />
        <Route path="/teach/firstCourse" element={<FirstCourse />} />
        <Route path="/teach" element={<DashboardTeach />}>
          <Route path="content" element={<Content />} />
          <Route path="content/course" element={<CourseManage/>}/>
          
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
