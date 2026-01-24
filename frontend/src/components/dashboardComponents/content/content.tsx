import { useState } from "react";
import { Plus } from "lucide-react";
import "./content.css";
import add from "../../../assets/images/undraw_add-post_prex.svg";
import education from "../../../assets/images/education.avif"
import { ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";
import TeachCourseCard from "../../teachcoursecard/courseCard";
function Content() {
  const navigate = useNavigate();

  const [selected, setselected] = useState("Courses");
  return (
    <div className="content h-fit flex flex-col gap-20 justify-start items-start">
      <div className="content-type flex gap-3 border-b border-b-[#00000025]  w-full">
        <h6
          className={`p-4 cursor-pointer transition-colors ${
            selected === "Courses"
              ? "border-b-[#006efd] border-b-3 font-bold text-[#006efd]"
              : ""
          }`}
          onClick={() => setselected("Courses")}
        >
          Your courses
        </h6>
        <h6
          className={`p-4 cursor-pointer transition-colors ${
            selected === "Education"
              ? "border-b-[#006efd] border-b-3 font-bold text-[#006efd]"
              : ""
          }`}
          onClick={() => setselected("Education")}
        >
          Your educational courses
        </h6>
      </div>

      {selected== "Courses" ? (<><div className="no-content  w-fit bg-white flex-wrap md:flex-nowrap rounded-3xl shadow-lg border-2 p-8 gap-9 jus border-[#E1E2F3] flex">
        <img src={add} alt="add" className="w-[100px] md:w-[200px]" />
        <div className="flex flex-col items-start gap-10 ">
          <h4 className="font-bold">You haven’t created any courses yet !</h4>
          <p className="text-[#333333]">
            Create your first course and start teaching today. It takes less
            than 5 minutes.
          </p>
          <button
            className="self-end start cta flex gap-2 font-bold p-5"
            onClick={() => navigate("/teach/createCourse")}
          >
            Create your first course <ArrowRight />
          </button>
        </div>
      </div><div className="cards flex flex-row">
          <TeachCourseCard onClick={() => navigate("/teach/content/course")} />
        </div><div
          className="add-course flex items-center justify-center rounded-full cursor-pointer shadow-md w-20 h-20"
          onClick={() => navigate("/teach/createCourse")}
        >
          <Plus color="white" size={40}  />
        </div></>)
        ://education
        (
          <>
        <div className="no-content  w-fit bg-white flex-wrap md:flex-nowrap rounded-3xl shadow-lg border-2 p-8 gap-9 jus border-[#E1E2F3] flex">
          <img src={education} alt="add" className="w-[100px] md:w-[250px]" />
          <div className="flex flex-col items-start gap-10 ">
            <h4 className="font-bold">You haven’t created any educational courses yet !</h4>
            <p className="text-[#333333]">
              Create your first course and start teaching today. It takes less
              than 5 minutes.
            </p>
            <button
              className="self-end start cta cta-education flex gap-2 font-bold p-5"
              onClick={() => navigate("/teach/createEdCourse")}
            >
              Create your first course <ArrowRight />
            </button>
        </div>
      </div><div className="cards flex flex-row">
          <TeachCourseCard onClick={() => navigate("/teach/content/course")} />
        </div><div
          className="add-education flex items-center justify-center rounded-full cursor-pointer shadow-md w-20 h-20"
          onClick={() => navigate("/teach/createEdCourse")}
        >
          <Plus color="white" size={40} />
        </div></>
        )}
    </div>
  );
}

export default Content;
