import video from "../../assets/videos/hero (3).mp4"
import { ArrowDown, Notebook, Play, Send, UserStar, Video } from "lucide-react"
import star from "../../assets/icons/icons8-étoile-64.png"
import { Users } from 'lucide-react';
import vid from "../../assets/videos/hero (3).mp4"
import Header from "../../components/header/header";
import cart from "../../assets/icons/icons8-caddie-64 (1).png"
import favorite from "../../assets/icons/icons8-favorite-64.png"
import { Star } from 'lucide-react';
import "./learningCoursePage.css"
import { Hourglass } from 'lucide-react';
import easy from "../../assets/icons/easy.svg"
import { FileText } from 'lucide-react';
import { SquarePlay } from 'lucide-react';
import { NotebookPen } from 'lucide-react';
import { useState } from "react";
import { Blocks } from 'lucide-react';
import { Check } from 'lucide-react';
import { Layers } from 'lucide-react';
import { ChevronRight } from 'lucide-react';
import { MessageSquareQuote } from 'lucide-react';
import Review from "../../components/Review/review";
import RatingStars from "./ratingStars";
import Footer from "@/components/footer/footer";
function LearningCourse(){
    const [show,setShow] = useState(false)
    const [showRev,setShowRev] = useState(false)
    const [showRateCourse,setShowRateCourse] = useState(false)
    const [showRateIns,setShowRateIns] = useState(false)
    const [selectedCourse,setSelectedCourse] = useState<Number>()
    const [selectedChaps,setSelectedChaps] = useState<String[]>([]);
    return(
        <><main className="flex flex-col pb-20 md:pb-20 gap-6 md:p-5 bg-[#dbebff]  ">

            <div className="first-level-content flex-col lg:flex-row w-full flex-1  relative flex gap-6">
                <div className="left w-full lg:w-[70%] h-fit  bg-white lg:p-10 pb-10 rounded-3xl flex flex-col gap-6 shadow-lg border-2 border-[#E1E2F3]">



                    <div className="video-wrapper w-full relative h-[200px] sm:h-[300px] md:h-[400px] lg:h-[500px] border-1 rounded-3xl border-[#E1E2F3]">
                        <video src={vid} className="intro absolute inset-0 object-cover w-full h-full" poster="C:/Users/dell/Downloads/2245514_9563_2.jpg" controls></video>
                    </div>

                    <h3 className="text-[#061323] px-10 lg:px-0">ML for beginners</h3>
                    <div className="instructor bg-[#f1f1f1] p-2 rounded-3xl flex flex-col justify-start items-start md:flex-row gap-4 ">
                        <div className="flex flex-row shrink-0   gap-2 items-center">
                            <div className="instructor-photo bg-black rounded-3xl"></div>
                            <div className="flex flex-col gap-2">
                                <p className="text-lg">John Doe</p>
                                <div className="stars-rating flex gap-1">
                                    <Star className="fill-yellow-400" stroke="none" />
                                    <Star className="fill-yellow-400" stroke="none" />
                                    <Star className="fill-yellow-400" stroke="none" />
                                    <Star className="fill-yellow-400" stroke="none" />
                                    <Star className="stroke-2 stroke-yellow-400" />
                                </div>
                            </div>


                        </div>
                        <p className="bio ">Lorem ipsum dolor sit amet consectetur adipisicing elit. Impedit natus rem inventore minima eaque animi est perferendis quos eligendi sapiente?</p>

                    </div>
                    <div className="grid px-10 lg:px-0 grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4  justify-between">
                        <button onClick={() => setShow(!show)} className={`py-2 ${show ? "clicked" : ""} description-btn  px-3 bg-blue-500 rounded-3xl flex items-center w-fit text-white font-semibold cursor-pointer`}>Description <ChevronRight className="transition-all" /></button>
                        <button onClick={() => setShowRev(true)} className={`py-2 ${show ? "clicked" : ""}  px-3 bg-blue-500 rounded-3xl gap-2 flex w-fit items-center text-white font-semibold cursor-pointer`}><MessageSquareQuote />Write a review</button>
                        <button onClick={() => setShowRateCourse(true)} className={`py-2 ${show ? "clicked" : ""}  px-3 bg-blue-500 rounded-3xl gap-2 flex items-center w-fit text-white font-semibold cursor-pointer`}><Star />Rate this course</button>
                        <button onClick={() => setShowRateIns(true)} className={`py-2 ${show ? "clicked" : ""}  px-3 bg-blue-500 rounded-3xl gap-2 flex w-fit items-center text-white font-semibold cursor-pointer`}><UserStar />Rate this instructor</button>
                    </div>

                    <div className={`add-review flex flex-col gap-6 text-center ${showRev ? "flex" : "hidden"} -translate-y-1/2 translate-x-1/2 z-1000 p-4 w-[90%] md:w-1/2 fixed top-1/2 right-1/2 bg-white rounded-3xl `}>
                        <h3>Add your review on this course</h3>
                        <form action="" className="w-full items-center flex flex-col gap-4 justify-center">
                            <div className="form-group flex  items-center w-[90%] justify-center  border border-[#10305A]  rounded-3xl">
                                <textarea placeholder="Write your review..." name="message" className="flex-1 pl-2 py-6" />

                            </div>
                            <button type="submit" className="cta main-btn text-[12px] px-2 py-3  squircle sm:px-12 sm:py-3 sm:text-[16px] md:px-12 md:py-3 md:text-[18px] lg:px-12 lg:py-3 lg:text-[18px]">Send</button>
                        </form>

                    </div>
                    <div className={`add-review flex flex-col gap-6 text-center ${showRateCourse ? "flex" : "hidden"} w-[90%] md:w-1/2 -translate-y-1/2 h-fit translate-x-1/2 z-1000 p-4 w-1/2 fixed top-1/2 right-1/2 bg-white rounded-3xl `}>
                        <h3>Rate this Course</h3>
                        <RatingStars />

                    </div>
                    <div className={`add-review flex flex-col gap-6 text-center ${showRateIns ? "flex" : "hidden"} w-[90%] md:w-1/2 -translate-y-1/2 h-fit translate-x-1/2 z-1000 p-4 w-1/2 fixed top-1/2 right-1/2 bg-white rounded-3xl `}>
                        <h3>Rate this Instructor</h3>
                        <RatingStars />

                    </div>

                    <p className={`description ${show ? "block" : "hidden"} px-10 lg:px-0 `}>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>


                </div>
                <div className="course-content w-full sticky top-6 lg:w-[30%] h-fit bg-white p-10 rounded-3xl flex  flex-col gap-6 shadow-lg border-2 border-[#E1E2F3]">



                    <h4 className="font-bold">Course content:</h4>
                    <div className="flex gap-4 ">
                        <div className="other-info">
                            <div className="flex gap-2"><FileText color="#364559" /> <p className="text-[#364559]">3 articles</p></div>
                        </div>
                        <div className="other-info">
                            <div className="flex gap-2"><SquarePlay color="#364559" /> <p className="text-[#364559]">4 videos</p></div>
                        </div>

                    </div>
                    <div className="progress flex flex-col gap-2 pb-4 border-b-3 border-[#00000022]">
                        <h6>Progress</h6>
                        <div className="flex flex-row gap-4 items-center">
                            <div className="completion-wrapper h-4 flex-1 bg-[#E1E2F3] rounded-3xl overflow-hidden">
                                <div className="completion w-[60%] rounded-3xl h-full bg-[#2f2bff] ">

                                </div>
                            </div>
                            <p>60%</p>

                        </div>

                    </div>
                    <div className="chapters">
                        <div onClick={() => { selectedChaps.includes("chapter1") ? setSelectedChaps(selectedChaps.filter(f => f != "chapter1")) : setSelectedChaps([...selectedChaps, "chapter1"]); } } className="chapter chapter1 py-4 px-2 flex flex-row gap-2 border-b-2 border-[#B6BEC9] ">
                            <ChevronRight className={`${selectedChaps.includes("chapter1") ? "selected-chapter" : ""}`} /><p className="chapter-name font-semibold">Intro</p>
                        </div>
                        <div className={`chapter-content ${selectedChaps.includes("chapter1") ? "" : "hidden"}  px-4 py-3 rounded-b-3xl  border-[#B6BEC9] bg-white flex flex-col gap-3`}>
                            <ul className="lesson flex text-lg flex-col gap-4">
                                <li onClick={() => setSelectedCourse(1)} className={`flex gap-2 items-center ${selectedCourse == 1 ? "selected-course" : ""}`}><div className="h-6 w-6 rounded-md border-2 bg-green-500 flex justify-center items-center border-[#B6BEC9]"><Check color="white" className={`${selectedCourse == 1 ? "hidden" : ""}`} /><Play className={`${selectedCourse == 1 ? "block" : "hidden"} fill-[#ede8ff]`} size={15} stroke="#ede8ff" color="white" /></div><SquarePlay /> <p>Course intro</p></li>
                                <li onClick={() => setSelectedCourse(2)} className={`flex gap-2 items-center ${selectedCourse == 2 ? "selected-course" : ""}`}><div className="h-6 w-6 rounded-md border-2 bg-green-500 flex justify-center items-center border-[#B6BEC9]"><Check color="white" className={`${selectedCourse == 2 ? "hidden" : ""}`} /><Play className={`${selectedCourse == 2 ? "block" : "hidden"} fill-[#ede8ff]`} size={15} stroke="#ede8ff" color="white" /></div><SquarePlay /> <p>Course intro</p></li>
                                <li onClick={() => setSelectedCourse(3)} className={`flex gap-2 items-center ${selectedCourse == 3 ? "selected-course" : ""}`}><div className="h-6 w-6 rounded-md border-2  flex justify-center items-center border-[#B6BEC9]"><Play size={15} className={`${selectedCourse == 3 ? "block" : "hidden"} fill-[#ede8ff]`} stroke="#ede8ff" color="white" /></div><FileText /> <p>Course intro</p></li>
                            </ul>

                        </div>
                        <div className="chapter chapter1 py-4 px-2 flex flex-col gap-2 border-b-2 border-[#B6BEC9] ">
                            <div onClick={() => { selectedChaps.includes("chapter2") ? setSelectedChaps(selectedChaps.filter(f => f != "chapter2")) : setSelectedChaps([...selectedChaps, "chapter2"]); } } className="flex flex-row gap-2">
                                <ChevronRight className={`${selectedChaps.includes("chapter2") ? "selected-chapter" : ""}`} /><p className="chapter-name font-semibold">Chapter 1</p>
                            </div>
                            <div className={`chapter-content ${selectedChaps.includes("chapter2") ? "" : "hidden"}  px-4 py-3 rounded-b-3xl  border-[#B6BEC9] bg-white flex flex-col gap-3`}>
                                <ul className="lesson flex text-lg flex-col gap-4">
                                    <li onClick={() => setSelectedCourse(1)} className={`flex gap-2 items-center ${selectedCourse == 1 ? "selected-course" : ""}`}><div className="h-6 w-6 rounded-md border-2 bg-green-500 flex justify-center items-center border-[#B6BEC9]"><Check color="white" className={`${selectedCourse == 1 ? "hidden" : ""}`} /><Play className={`${selectedCourse == 1 ? "block" : "hidden"} fill-[#ede8ff]`} size={15} stroke="#ede8ff" color="white" /></div><SquarePlay /> <p>Course intro</p></li>
                                    <li onClick={() => setSelectedCourse(2)} className={`flex gap-2 items-center ${selectedCourse == 2 ? "selected-course" : ""}`}><div className="h-6 w-6 rounded-md border-2 bg-green-500 flex justify-center items-center border-[#B6BEC9]"><Check color="white" className={`${selectedCourse == 2 ? "hidden" : ""}`} /><Play className={`${selectedCourse == 2 ? "block" : "hidden"} fill-[#ede8ff]`} size={15} stroke="#ede8ff" color="white" /></div><SquarePlay /> <p>Course intro</p></li>
                                    <li onClick={() => setSelectedCourse(3)} className={`flex gap-2 items-center ${selectedCourse == 3 ? "selected-course" : ""}`}><div className="h-6 w-6 rounded-md border-2  flex justify-center items-center border-[#B6BEC9]"><Play size={15} className={`${selectedCourse == 3 ? "block" : "hidden"} fill-[#ede8ff]`} stroke="#ede8ff" color="white" /></div><FileText /> <p>Course intro</p></li>
                                </ul>

                            </div>

                        </div>

                    </div>

                </div>
            </div>

            {(showRev || showRateCourse || showRateIns) && <div className="overlay-course-page fixed inset-0 " onClick={() => { setShowRev(false); setShowRateCourse(false); setShowRateIns(false); } }></div>}
        </main><Footer /></>
                
    )
}

export default LearningCourse