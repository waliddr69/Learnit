import cart from "../../assets/icons/icons8-caddie-64 (1).png"
import favorite from "../../assets/icons/icons8-favorite-64.png"
import star from "../../assets/icons/icons8-étoile-64.png"
import easy from "../../assets/icons/easy.svg"
import { Notebook } from 'lucide-react';
import "./coursesCard.css"
import { useNavigate } from "react-router-dom";
function CoursesCard(){
    const history = useNavigate();
    return(
        <div className="card px-2 min-w-80 lg:min-w-90    py-2 border-2 bg-[#F8FAFF] border-[#E1E2F3] rounded-3xl   flex flex-col gap-4">
            <div className="thumbnail relative rounded-3xl">
                <div className="icons flex gap-2 absolute  top-2 right-2 w-full justify-end">
                    <img src={cart} alt="cart" width={40} className="p-2 cursor-pointer border-2 border-[#10305A] rounded-full"/>
                    <img src={favorite} alt="favorite" width={40} className="p-2 cursor-pointer border-2 border-[#10305A] rounded-full"/>
                </div>
            </div>

            <h5 className="font-semibold">Ml for begginers</h5>

            <div className="teacher flex gap-2 items-center">
                <div className="teacher-img" style={{backgroundImage: "url('../../assets/images/black_guy.png')"}}></div>
                <p>Formateur</p>
            </div>
            <div className="course-info flex gap-10 items-center">
                <div className="rating flex items-center">
                    <img src={star} alt="star" width={50} height={20}/>
                    <p><span className="text-2xl">4.7</span>/5</p>
                </div>
                <div className="difficulty-course items-center py-1 px-6 gap-3     rounded-3xl flex border-[#00c93257]">
                    <img src={easy} alt="easy" width={40}/>
                    <p className="text-green-400 font-medium" style={{color:"green", fontSize:"17px"}}>Easy</p>
                </div>

                

            </div>
            <div className="num-courses flex items-center">
                    <Notebook color="#0C2443" />
                    <p>12 Courses</p>
                </div>

            <div className="main-card-info flex justify-between items-center px-2 mt-4">
                <p className="price">6000 DA</p>
                <button onClick={()=>history("/course")} className="enroll-btn cta cta main-btn text-[12px] px-1 py-3  squircle sm:px-5 sm:py-3 sm:text-[16px] md:px-5 md:py-3 md:text-[18px] lg:px-5 lg:py-3 lg:text-[18px]">Enroll Now</button>
            </div>
        </div>
    )
}

export default CoursesCard