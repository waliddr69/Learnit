import { MonitorPlay, Send, Star, User } from "lucide-react"
import "./instructorPage.css"
import Header from "@/components/header/header"
import CoursesCard from "@/components/coursesCard/coursesCard"
import Footer from "@/components/footer/footer"

function InstructorPage(){
    return(
        <main className="bg-[#dbebff]">
            <Header/>
            <div className="instructor-wrapper flex flex-col gap-20">
                <div className="flex  gap-20 sm:px-5 px-2 flex-col lg:flex-row border-b pb-10 border-b-[#2d2d2d74]">
                    <div className="metadata w-full self-center sm:w-fit bg-[#ffffff] shadow-lg rounded-3xl p-4 flex gap-8 flex-col items-center">
                        <div className="profile-pic h-22 w-22 rounded-full bg-black"></div>
                        <div className="info flex flex-row gap-2">
                            <div className="info-item">
                                <h6 className="flex font-bold text-lg flex-row gap-1 items-center"><User strokeWidth={3}/>1303</h6>
                                <small>enrollements</small>
                            </div>
                            <div className="info-item">
                                <h6 className="flex font-bold text-lg flex-row gap-1 items-center"><Star fill="black" strokeWidth={3}/>4.6/5</h6>
                                <small>rating</small>
                            </div>
                            <div className="info-item">
                                <h6 className="flex font-bold text-lg flex-row gap-1 items-center"><MonitorPlay strokeWidth={3}/>15</h6>
                                <small>courses</small>
                            </div>
                        </div>
                    </div>

                    <div className="main-data flex flex-col gap-4">
                        <h3 className="text-start" >Formateur</h3>
                        <div className="flex flex-col gap-2">
                            <p className="font-semibold text-[#333333] text-lg">Personnel informartions</p>
                            <p className="text-[#494949]">Lorem, ipsum dolor sit amet consectetur adipisicing elit. Et rerum voluptas aspernatur deserunt consectetur quo possimus commodi itaque! Necessitatibus, quidem?</p>
                        </div>
                        <button className="px-4 py-2 rounded-3xl bg-white w-fit self-end hover:bg-[#f2f6fb] transition-all text-[#2a7ae2] font-medium flex flex-row gap-2 cursor-pointer items-center">Send message<Send strokeWidth={2}/></button>
                    </div>
                </div>

                <div className="courses">
                    <h4 className="font-bold">Courses</h4>
                    <div className="courses relative right-0 w-full snap-x py-2 snap-mandatory  flex flex-row overflow-x-auto gap-4">
                    
                        <CoursesCard/>
                        <CoursesCard/>
                        <CoursesCard/>
                        <CoursesCard/>
                        <CoursesCard/>
                        <CoursesCard/>
                        <CoursesCard/>
                        <CoursesCard/>
                    </div>
                    
                </div>
                <div className="courses">
                    <h4 className="font-bold">Educational Courses</h4>
                    <div className="courses relative right-0 w-full snap-x py-2 snap-mandatory  flex flex-row overflow-x-auto gap-4">
                    
                        <CoursesCard/>
                        <CoursesCard/>
                        <CoursesCard/>
                        <CoursesCard/>
                        <CoursesCard/>
                        <CoursesCard/>
                        <CoursesCard/>
                        <CoursesCard/>
                    </div>
                    
                </div>
            </div>
            <Footer/>
        </main>
    )
}

export default InstructorPage