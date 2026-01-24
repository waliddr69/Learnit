import cart from "../../assets/icons/icons8-caddie-64 (1).png"
import favorite from "../../assets/icons/icons8-favorite-64.png"

import { Notebook } from 'lucide-react';
import "./coursesCard.css"
import { useNavigate } from "react-router-dom";
import { Star } from 'lucide-react';
function CoursesCard(){
    const history = useNavigate();
    return(
        <div className="card p-2  min-w-80 lg:min-w-90     border-2 bg-[#F8FAFF] border-[#E1E2F3] rounded-3xl   flex flex-col gap-4">
            <div className="thumbnail relative rounded-3xl">
                <div className="icons flex gap-2 absolute  top-2 right-2 w-full justify-end">
                    <img src={cart} alt="cart" width={40} className="p-2 cursor-pointer border-2 border-[#10305A] rounded-full"/>
                    <img src={favorite} alt="favorite" width={40} className="p-2 cursor-pointer border-2 border-[#10305A] rounded-full"/>
                </div>
            </div>
            <div className="px-2 flex flex-col gap-4">
                <h5 className="font-semibold">Ml for begginers</h5>

            <div className="teacher flex gap-2 items-center">
                <div className="teacher-img" style={{backgroundImage: "url('../../assets/images/black_guy.png')"}}></div>
                <p>Formateur</p>
            </div>
            <div className="rating flex flex-row gap-1 items-center">
                    <Star size={40} color="#FF8000"/>
                    <p className="font-semibold"><span className="text-2xl">4.7</span>/5 (1,248 reviews)</p>
            </div>
            <div className="course-info  gap-2 flex justify-between">
                
                <div className="difficulty-course items-center  gap-3 flex-col     rounded-3xl flex border-[#00c93257]">
                    
                    <p className="text-green-400 font-medium p-2 border-1 border-[#00c93257] rounded-3xl" style={{color:"green", fontSize:"17px"}}>Beginner</p>
                </div>
                <div className="num-courses flex-row gap-3 flex items-center">
                    <Notebook color="#0C2443" />
                    <p>12 lessons</p>
                </div> 
               

            </div>
            
            

            <div className="main-card-info flex justify-between items-center px-2 mt-4">
                <p className="price">6000 DA</p>
                <button onClick={()=>history("/course")} className="enroll-btn cta cta main-btn text-[12px] px-1 py-3  squircle sm:px-5 sm:py-3 sm:text-[16px] md:px-5 md:py-3 md:text-[18px] lg:px-5 lg:py-3 lg:text-[18px]">Enroll Now</button>
            </div>
            </div>

            
        </div>
    )
}

export default CoursesCard