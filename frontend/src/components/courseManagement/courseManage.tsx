import {
  ChevronRight,
  FileText,
  
  PlaySquare,
  Plus,
 
  Users,
} from "lucide-react";
import { MessageSquareQuote } from "lucide-react";
import { Star } from "lucide-react";
import "./courseManage.css";
import { useEffect, useState } from "react";
import Review from "../Review/review";
import { X } from "lucide-react";
import { Wallet } from "lucide-react";
import ApexChart from "../charts/enrollChart/chart";
import ApexGrid from "../charts/apexGrid/apexGrid";
import { useLocation, useNavigate } from "react-router-dom";
import type { Courses } from "@/types/courses";

import Chapters from "../chapters/chapters";
import CreateCourseForm from "../createForm/createForm";
import type { enrollements } from "@/types/enrollements";


function CourseManage() {
  const [reviews, showReviews] = useState(false);
  
 

  
  
  

  

  const[course,setCourse] = useState<Courses>()

  

  //overview + students
  const [selected, setSelected] = useState("Overview");

  



  

  const location = useLocation()
  const navigate = useNavigate()
  const id = location.pathname.split("/").pop()
  const [dataSet,setDataSet] = useState({})
  
  function getCourse(){
    
    fetch(import.meta.env.VITE_API_COURSE_URL + "/getCourse/"+id,{
      method:"GET",
      credentials:"include"
    })

    .then(res=>res.json())
    .then(res=>{
      if(res.success){
        console.log(res.course)
        setCourse(res.course)

        const counts: Record<string, number> = {};

        (res.course?.enrollements ?? []).forEach((e: enrollements) => {
          const date = new Date(e.createdAt).toISOString().split("T")[0]

          if (counts[date]) {
            counts[date]++
          } else {
            counts[date] = 1
          }
        })

        setDataSet(counts)
        console.log(counts)

        
        
      }else{
        navigate(-1)
      }
    })
  }

  useEffect(()=>{
    
    getCourse()
  
    
  },[id])

  const [refresh,setRefresh] = useState(0)

  useEffect(()=>{
    getCourse()
  },[refresh])

  

     

      

  
  

  

  

  return (
    <div className="manage flex flex-col gap-12">
      <div className="flex head flex-row justify-between">
        <h3>{course?.title}</h3>
        <div className={`status text-black px-5 ${course?.visibility === "published" ? "bg-[#4CAF50] text-white" : "bg-[#F5BB62]"} rounded-3xl w-[10%] flex  items-center justify-center`}>
          {course?.visibility}
        </div>
      </div>
      <p style={{ color: "#1F1CD9", fontWeight: "600", width: "100%" }}>
        {" "}
        <span style={{ color: "#1f1cd99c" }}>{course?.domain} /</span> {course?.subdomain}{" "}
      </p>
      <div className="flex flex-row justify-center gap-6">
        <p
          className={`p-4 hover:bg-[#2A7AE2] hover:text-white font-semibold cursor-pointer transition-all rounded-sm ${
            selected === "Overview" ? "text-[#2A7AE2]" : ""
          }`}
          onClick={() => setSelected("Overview")}
        >
          Overview
        </p>
        <p
          className={`p-4 hover:bg-[#2A7AE2] hover:text-white font-semibold cursor-pointer transition-all rounded-sm ${
            selected === "Students" ? "text-[#2A7AE2]" : ""
          }`}
          onClick={() => setSelected("Students")}
        >
          Students
        </p>
      </div>
      <div
        className={`${
          selected == "Overview" ? "flex" : "hidden"
        } overview flex flex-col gap-8`}
      >
        {course?.enrollements?.length!>0 ? (
          <><div className="stats flex flex-row flex-wrap lg:flex-nowrap justify-between gap-4">
            <div className="stat-card flex-1 flex flex-col p-4 gap-2 border-2 rounded-3xl border-[#08203e76]">
              <div className="flex flex-row gap-2 items-center">
                <Users className="bg-[#DBEBFF] p-2 rounded-3xl" size={40} />
                <p>Enrollements in this course</p>
              </div>
              <h4 className="font-semibold">{course?.enrollements?.length}</h4>
            </div>
            {course?.price!==0 && (
              <div className="stat-card flex-1 flex flex-col p-4 gap-2 border-2 rounded-3xl border-[#08203e76]">
              <div className="flex flex-row gap-2 items-center">
                <Wallet className="bg-[#F9D6E5] p-2 rounded-3xl" size={40} />
                <p>Revenue in this course</p>
              </div>
              <h4 className="font-semibold">{course?.enrollements?.length! * course?.price!} DA</h4>
            </div>
            )}
            
            <div className="stat-card flex-1 flex gap-2 flex-col p-4 border-2 rounded-3xl border-[#08203e76]">
              <div className="flex flex-row gap-2 items-center">
                <div className="rounded-3xl overflow-hidden">
                  <MessageSquareQuote className="bg-[#D5F3F0] p-2 " size={40} />
                </div>
                <p>Total reviews</p>
              </div>
              <h4 className="font-semibold">278</h4>
              <button
                className="view-link cursor-pointer self-end"
                onClick={() => showReviews(true)}
              >
                View &gt;
              </button>
            </div>
            {course?.rating! > 0 && <div className="stat-card flex-1 flex gap-2 flex-col p-4 border-2 rounded-3xl border-[#08203e76]">
              <div className="flex flex-row gap-2 items-center">
                <Star className="bg-[#FCEBD2] p-2 rounded-3xl" size={40} />
                <p>Course rating</p>
              </div>
              <h4 className="font-semibold">4.7/5</h4>
            </div>}

          </div><div className="chart">
              <ApexChart name="Enrollments" data={Object.values(dataSet)} date={Object.keys(dataSet)}/>
            </div></>
        ):course?.enrollements?.length==0 && course.visibility == "draft"?(
          <h3>Your course is in draft. when ready publish it to get enrollments</h3>
        ):(
          <h3>You on't have any enrollments yet!</h3>
        )}
        
        
        <Chapters id={Number(id)}/>
        <CreateCourseForm id={Number(id)} onSuccess={()=>setRefresh(refresh+1)}/>
              
              

        
        
        <div
          className={`reviews fixed ${
            reviews ? "flex" : "hidden"
          } z-20 bg-white p-4 top-0 bottom-0 left-1/2 transform -translate-x-1/2 flex-col gap-6 `}
        >
          <div className="flex gap-2 items-center">
            <MessageSquareQuote width={30} height={30} />
            <h5 className="font-semibold">Reviews</h5>{" "}
            <X
              className="self-end cursor-pointer ml-auto"
              onClick={() => showReviews(false)}
            />
          </div>
          <p className="text-[#006FFF]">270 reviews</p>
          <div
            className="overflow-auto"
            style={{ maxHeight: "450px", scrollbarWidth: "none" }}
          >
            <div className="reviews-section flex  flex-row md:grid grid-cols-2 gap-5 relative">
              <Review
                username={"User"}
                content={
                  "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Reprehenderit ad illum vero, mollitia culpa iure rem omnis alias illo! Deleniti reiciendis, accusantium perspiciatis quos alias et saepe sed vel nemo?"
                }
              />
              <Review
                username={"User"}
                content={
                  "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Reprehenderit ad illum vero, mollitia culpa iure rem omnis alias illo! Deleniti reiciendis, accusantium perspiciatis quos alias et saepe sed vel nemo?"
                }
              />
              <Review
                username={"User"}
                content={
                  "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Reprehenderit ad illum vero, mollitia culpa iure rem omnis alias illo! Deleniti reiciendis, accusantium perspiciatis quos alias et saepe sed vel nemo?"
                }
              />
              <Review
                username={"User"}
                content={
                  "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Reprehenderit ad illum vero, mollitia culpa iure rem omnis alias illo! Deleniti reiciendis, accusantium perspiciatis quos alias et saepe sed vel nemo?"
                }
              />
            </div>
            <div className="flex justify-center mt-5 mb-5">
              <button className="px-6 py-3 rounded-3xl font-bold cursor-pointer text-[#10305A]  hover:outline-2 hover:outline-[#10305A]">
                Load More
              </button>
            </div>
          </div>
        </div>

        
      </div>

      <div
        className={` ${
          reviews  ? "block" : "hidden"
        } bg-[rgba(0,0,0,0.4)]  fixed inset-0`}
        onClick={() => {
          showReviews(false);
          
        }}
      ></div>
      {selected == "Students" && <ApexGrid />}
    </div>
    
  );
}

export default CourseManage;
