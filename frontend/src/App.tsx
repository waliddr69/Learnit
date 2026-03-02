import Course from "./pages/coursePage/course";

import Courses from "./pages/coursespage/courses";
import Home from "./pages/homepage/home";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from "./pages/loginPage/login";
import Signup from "./pages/signupPage/signup";
import SignupTeach from "./pages/signupPageTeach/signup";
import DashboardTeach from "./pages/dashboardTeach/dashboard";
import Content from "./components/dashboardComponents/content/content";
import FirstCourse from "./pages/firstCoursePage/firstcourse";
import LoginTeach from "./pages/loginPageTeach/login";
import CourseManage from "./components/courseManagement/courseManage";
import Messages from "./components/dashboardComponents/messages/messages";
import Dashboard from "./components/dashboardComponents/dashboard/dashboard";
import DashboardUser from "./pages/dashboardUser/dashboardUser";
import YourLearning from "./components/dashboardUser/yourLearning/yourLearning";
import MessageView from "./components/dashboardComponents/messages/messageView";
import LearningCourse from "./pages/learningCoursePage/learningCoursePage";
import Favorite from "./components/dashboardUser/yourLearning/favorite";
import CartPage from "./pages/cartPage/cart";
import Payement from "./pages/payementPage/payement";
import InstructorPage from "./pages/instructorPage/instructorPage";
import Account from "./pages/accountPage/account";
import AddEdCourse from "./pages/addEdCourse/addEdCourse";
import Education from "./pages/educationPage/educationPage";
import EducationCourse from "./pages/educationCoursePage/educationCoursePage";
import ProtectedRoutes from "./auth/protectedRoutes";
import RoleRoute from "./auth/roleRoutes";
import PublicRoutes from "./auth/publicRoutes";
import SearchPage from "./pages/searchPage/searchPage";
import SuccessPay from "./pages/successPayPage/successPay";
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/courses" element={<Courses />} />
        <Route path="/education" element={<Education />} />
        <Route path="/course/:id" element={<Course />} />
        <Route path="/educationCourse/:id" element={<EducationCourse />} />

        <Route element={<PublicRoutes />}>
          <Route path="/" element={<Home />} />
          <Route path="/home" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/teach/signup" element={<SignupTeach />} />
          <Route path="/teach/login" element={<LoginTeach />} />
        </Route>

        <Route element={<ProtectedRoutes />}>
          <Route element={<RoleRoute />}>
            <Route path="/teach/createCourse" element={<FirstCourse />} />
            <Route path="/teach/createEdCourse" element={<AddEdCourse />} />
            <Route path="/teach" element={<DashboardTeach />}>
              <Route path="content" element={<Content />} />
              <Route path="messages" element={<Messages />} />
              <Route path="messages/:id" element={<MessageView />} />
              <Route path="dashboard" element={<Dashboard />} />
              <Route path="content/:id" element={<CourseManage />} />
            </Route>
            <Route path="account" element={<Account />} />
          </Route>

          <Route path="/dashboard" element={<DashboardUser />}>
            <Route path="yourLearning" element={<YourLearning />} />
            <Route path="favorite" element={<Favorite />} />

            <Route path="messages" element={<Messages />} />
            <Route path="messages/:id" element={<MessageView />} />
          </Route>
          <Route path="enr/:id" element={<LearningCourse />} />
          <Route path="cart" element={<CartPage />} />
          <Route path="payement" element={<Payement />} />
          <Route path="success" element={<SuccessPay />} />
        </Route>
        <Route path="/search" element={<SearchPage />} />
        <Route path="instructor/:id" element={<InstructorPage />} />
      </Routes>
    </Router>
  );
}

export default App;
