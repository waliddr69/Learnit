import { Notebook } from "lucide-react"

import { Users } from 'lucide-react';
import vid from "../../assets/videos/hero (3).mp4"
import Header from "../../components/header/header";
import cart from "../../assets/icons/icons8-caddie-64 (1).png"
import favorite from "../../assets/icons/icons8-favorite-64.png"
import { Star } from 'lucide-react';
import "./course.css"
import { Hourglass } from 'lucide-react';

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
import Footer from "@/components/footer/footer";

function Course(){
    const [selected,setSelected] = useState("Overview")
    const [selectedChaps,setSelectedChaps] = useState<String[]>([]);
    return(
    <><Header /><main className="flex flex-col gap-6 md:p-5 pb-20 bg-[#dbebff]  ">

            <div className="first-level-content relative flex gap-6">
                <div className="left lg:w-[70%] md:w-full bg-white p-5 md:p-10 rounded-3xl flex flex-col gap-6 shadow-lg border-2 border-[#E1E2F3]">
                    <div className="flex justify-between lg:hidden items-center">
                      <p style={{color:"#1F1CD9",fontWeight:"600"}}> <span style={{color:"#1f1cd99c"}}>Tech /</span>  Web Dev </p>  
                      <div className=" items-center py-1 px-6 gap-3     rounded-3xl flex border-[#00c93257]">
                      
                        <p className="text-green-400 font-medium p-2 border-1 border-[#00c93257] rounded-3xl" style={{color:"green", fontSize:"17px"}}>Beginner</p>
                        
                    </div>
                    
                    </div>
                    <div className="video-wrapper w-full relative h-[200px] sm:h-[300px] md:h-[400px] lg:h-[500px] border-1 rounded-3xl border-[#E1E2F3]">
                        <video src={vid} className="intro absolute inset-0 object-cover w-full h-full" poster="C:/Users/dell/Downloads/2245514_9563_2.jpg" controls></video>
                    </div>
                    
                    <h3 className="text-[#061323]">ML for beginners</h3>
                    <div className="instructor bg-[#f1f1f1] p-2 rounded-3xl flex flex-col justify-start items-start md:flex-row gap-4 ">
                        <div className="flex flex-row shrink-0   gap-2 items-center">
                            <div className="instructor-photo bg-black rounded-3xl"></div>
                            <div className="flex flex-col gap-2">
                               <p className="text-lg">John Doe</p> 
                               <div className="stars-rating flex gap-1">
                                <Star className="fill-yellow-400" stroke="none"/>
                                <Star className="fill-yellow-400" stroke="none"/>
                                <Star className="fill-yellow-400" stroke="none"/>
                                <Star className="fill-yellow-400" stroke="none"/>
                                <Star className="stroke-2 stroke-yellow-400"/>
                            </div>
                            </div>
                            

                        </div>
                        <p className="bio ">Lorem ipsum dolor sit amet consectetur adipisicing elit. Impedit natus rem inventore minima eaque animi est perferendis quos eligendi sapiente?</p>
                        
                    </div>
                    <p className="description">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
                    
                    <div className="course-info hidden md:flex  gap-6 border-2 p-4 border-[#00000061] rounded-3xl items-center justify-between">
                        <div className="rating flex  flex-col justify-center  w-[25%] items-center  gap-3 border-r-1">
                            <div className="stars-rating flex gap-1">
                                <Star className="fill-yellow-400" stroke="none"/>
                                <Star className="fill-yellow-400" stroke="none"/>
                                <Star className="fill-yellow-400" stroke="none"/>
                                <Star className="fill-yellow-400" stroke="none"/>
                                <Star className="fill-yellow-400" stroke="none"/>
                            </div>
                            <p><span className="text-2xl">4.7</span>/5</p>
                        </div>
                        <div className=" flex flex-col gap-3 items-center w-[25%] justify-center border-r-1">

                            <Notebook color="#0C2443" width={30} height={30}/>
                            <p>12 Courses</p>

                        </div>
                        <div className="enrolled flex flex-col items-center w-[25%] justify-center gap-3 border-r-1">
                            <Users color="#0C2443" width={30} height={30}/>
                            <p>1500 Enrolled</p>
                        </div>
                        <div className="duration flex flex-col items-center w-[25%] justify-center gap-3">
                            <Hourglass color="#0C2443" width={30} height={30}/>
                            <p>10h 50min</p>
                        </div>
                    </div>
                </div>

                <div className="payement hidden lg:flex sticky top-6 w-[30%] h-fit bg-white p-10 rounded-3xl  flex-col gap-6 shadow-lg border-2 border-[#E1E2F3]">
                    <div className="flex justify-between items-center">
                      <p style={{color:"#1F1CD9",fontWeight:"600"}}> <span style={{color:"#1f1cd99c"}}>Tech /</span>  Web Dev </p>  
                      <div className=" items-center py-1 px-6 gap-3     rounded-3xl flex border-[#00c93257]">
                       
                        <p className="text-green-400 font-medium p-2 border-1 border-[#00c93257] rounded-3xl" style={{color:"green", fontSize:"17px"}}>Beginner</p>
                        
                    </div>
                    
                    </div>
                    <h3 className="price-tag">6000 DA</h3>
                    <div className="pay flex gap-3 items-center">
                        <button className="cta main-btn text-[12px] px-2 py-3  squircle sm:px-12 sm:py-3 sm:text-[16px] md:px-12 md:py-3 md:text-[18px] w-[80%] lg:px-12 h-[70%] lg:py-5 lg:text-[18px]">Buy now</button>
                        <div className="items flex flex-col gap-2">
                            <img src={cart} alt="cart" width={50} className="p-2 cursor-pointer border-2 border-[#10305A] rounded-full"/>
                            <img src={favorite} alt="favorite" width={50} className="p-2 cursor-pointer border-2 border-[#10305A] rounded-full"/>
                        </div>
                    </div>
                    <h6 className="font-bold">Course content:</h6>
                    <div className="other-info">
                        <div className="flex gap-2"><FileText color="#364559"/> <p className="text-[#364559]">3 articles</p></div>
                    </div>
                    <div className="other-info">
                        <div className="flex gap-2"><SquarePlay color="#364559"/> <p className="text-[#364559]">4 videos</p></div>
                    </div>
                    <div className="other-info">
                        <div className="flex gap-2"><NotebookPen color="#364559"/> <p className="text-[#364559]">4 exercices</p></div>
                    </div>
                </div>
                <div className="payement-md flex lg:hidden fixed justify-between bottom-0 p-5 bg-[#0c2443f7] h-[150px] border-t border-t-[#000000] w-full right-0 left-0 z-10">
                    <div className="flex flex-col">
                        <h3 className="price-tag-md">6000 DA</h3>
                        <div className="flex justify-around">
                            <div className="flex flex-col gap-3 items-center"><Star className="fill-yellow-400" stroke="none"/> <p className="text-[#e0e0e0]">4.7/5</p></div>
                                
                        <div className="enrolled flex flex-col flex-1 items-center w-[25%] justify-center gap-3 ">
                            <Users color="#e0e0e0" width={30} height={30}/>
                            <p className="text-[#e0e0e0]">1500 Enrolled</p>
                        </div>
                        
                        </div>
                        
                    </div>

                    <div className="btns flex-1 flex flex-col items-center">
                        <button className="cta main-btn text-[12px] px-2 py-3  squircle sm:px-12 sm:py-3 sm:text-[16px] md:px-12 md:py-3 md:text-[18px] w-[80%] lg:px-12 h-[70%] lg:py-5 lg:text-[18px]">Buy now</button>
                        <div className="items flex flex-row self-center gap-2">
                            <img src={cart} alt="cart" width={50} className="p-2 bg-white cursor-pointer border-2 border-[#10305A] rounded-full"/>
                            <img src={favorite} alt="favorite" width={50} className="p-2 bg-white cursor-pointer border-2 border-[#10305A] rounded-full"/>
                        </div>
                    </div>
                    
                </div>
            </div>
            <div className="second-level-content overflow-x-auto min-w-[400px] flex gap-6 w-full bg-white p-5 md:p-10 rounded-3xl flex-col  shadow-lg border-2 border-[#E1E2F3]">
                <div className="select-menu flex justify-between py-2 px-1    rounded-3xl border-[#E1E2F3] border">
                    <div onClick={()=>setSelected("Overview")} className={`item ${selected!="Overview"?"not-selected":"selected"}  not-selected flex w-1/3 items-center py-5 justify-center`}>
                        <p>Overview</p>
                    </div>

                    <div onClick={()=>setSelected("Chapters")} className={`item ${selected=="Chapters"?"selected":selected=="Overview"?"border-r not-selected":"border-l not-selected"} border-[#babded]  not-selected flex w-1/3 items-center py-5 justify-center`}>
                        <p>Chapters</p>
                    </div>

                    <div onClick={()=>setSelected("Reviews")} className={`item ${selected!="Reviews"?"not-selected":"selected"} not-selected flex w-1/3 items-center py-5 justify-center`}>
                        <p>Reviews</p>
                    </div>
                </div>
                <div >
                   <div className={`overview ${selected == "Overview"?"":"hidden"} flex flex-col gap-6 `}>
                        <div className="flex gap-2 items-center"><Blocks width={30} height={30}/><h5 className="font-semibold">What you'll learn</h5></div>
                        <div className="learn-course rounded-3xl bg-[#dbebffb1] border-[#E1E2F3] border p-5 grid grid-cols-1 md:grid-cols-2">
                            <div className="first flex flex-col gap-6">
                                <div className="learn-item flex gap-2 justify-start items-start"><Check color="#00bd2f" className="shrink-0" width={30} height={30}/> <p className="w-[90%]">Lorem, ipsum dolor sit amet consectetur adipisicing elit. Eum necessitatibus rem doloribus corporis maxime ullam ab rerum enim eligendi pariatur architecto fugiat opti
                                o molestiae temporibus, atque, hic voluptatem iure reprehenderit!</p></div>
                                <div className="learn-item flex gap-2 justify-start items-start"><Check color="#00bd2f" className="shrink-0" width={30} height={30}/> <p className="w-[90%]">Lorem, ipsum dolor sit amet consectetur adipisicing elit. Eum necessitatibus rem doloribus corporis maxime ullam ab rerum enim eligendi pariatur architecto fugiat opti
                                o molestiae temporibus, atque, hic voluptatem iure reprehenderit!</p></div>
                                <div className="learn-item flex gap-2 justify-start items-start"><Check color="#00bd2f" className="shrink-0" width={30} height={30}/> <p className="w-[90%]">Lorem, ipsum dolor sit amet consectetur adipisicing elit. Eum necessitatibus rem doloribus corporis maxime ullam ab rerum enim eligendi pariatur architecto fugiat opti
                                o molestiae temporibus, atque, hic voluptatem iure reprehenderit!</p></div>
                            </div>
                            <div className="first flex flex-col gap-6">
                                <div className="learn-item flex gap-2 justify-start items-start"><Check color="#00bd2f" className="shrink-0" width={30} height={30}/> <p className="w-[90%]">Lorem, ipsum dolor sit amet consectetur adipisicing elit. Eum necessitatibus rem doloribus corporis maxime ullam ab rerum enim eligendi pariatur architecto fugiat opti
                                o molestiae temporibus, atque, hic voluptatem iure reprehenderit!</p></div>
                                <div className="learn-item flex gap-2 justify-start items-start"><Check color="#00bd2f" className="shrink-0" width={30} height={30}/> <p className="w-[90%]">Lorem, ipsum dolor sit amet consectetur adipisicing elit. Eum necessitatibus rem doloribus corporis maxime ullam ab rerum enim eligendi pariatur architecto fugiat opti
                                o molestiae temporibus, atque, hic voluptatem iure reprehenderit!</p></div>
                                <div className="learn-item flex gap-2 justify-start items-start"><Check color="#00bd2f" className="shrink-0" width={30} height={30}/> <p className="w-[90%]">Lorem, ipsum dolor sit amet consectetur adipisicing elit. Eum necessitatibus rem doloribus corporis maxime ullam ab rerum enim eligendi pariatur architecto fugiat opti
                                o molestiae temporibus, atque, hic voluptatem iure reprehenderit!</p></div>
                            </div>
                        </div>
                    </div> 
                    <div className={`chapters ${selected == "Chapters"?"":"hidden"} flex flex-col gap-6 `}>
                        <div className="flex gap-2 items-center"><Layers width={30} height={30}/><h5 className="font-semibold">Chapters</h5></div>
                        <div className="chapter-course bg-[#dbebffb1] px-2  flex flex-col rounded-3xl">
                            <div onClick={()=>{selectedChaps.includes("chapter1")?setSelectedChaps(selectedChaps.filter(f=>f!="chapter1")):setSelectedChaps([...selectedChaps,"chapter1"])}} className="chapter chapter1 py-4 px-2 flex flex-row gap-2 border-b-2 border-[#B6BEC9] ">
                                <ChevronRight className={`${selectedChaps.includes("chapter1")?"selected-chapter":""}`}/><p className="chapter-name">Intro</p>
                            </div>
                            <div className={`chapter-content ${selectedChaps.includes("chapter1")?"":"hidden"}  px-4 py-3 rounded-b-3xl border-b-2 border-r-2 border-l-2 border-[#B6BEC9] bg-white flex flex-col gap-3` }>
                                <div >
                                    <div className="flex gap-2"><FileText color="#364559"/> <p className="text-[#364559]">3 articles</p></div>
                                </div>
                                <div >
                                    <div className="flex gap-2"><SquarePlay color="#364559"/> <p className="text-[#364559]">4 videos</p></div>
                                </div>
                                <div>
                                    <div className="flex gap-2"><NotebookPen color="#364559"/> <p className="text-[#364559]">4 exercices</p></div>
                                </div>
                            
                            </div>
                            <div onClick={()=>{selectedChaps.includes("chapter2")?setSelectedChaps(selectedChaps.filter(f=>f!="chapter2")):setSelectedChaps([...selectedChaps,"chapter2"])}} className="chapter chapter2 py-4 px-2 flex flex-row gap-2 border-b">
                                <ChevronRight className={`${selectedChaps.includes("chapter2")?"selected-chapter":""}`}/><p className="chapter-name">Intro</p>
                            </div>
                            <div className={`chapter-content ${selectedChaps.includes("chapter2")?"":"hidden"} px-4 py-3 rounded-3xl bg-white flex flex-col gap-3` }>
                                <div >
                                    <div className="flex gap-2"><FileText color="#364559"/> <p className="text-[#364559]">3 articles</p></div>
                                </div>
                                <div >
                                    <div className="flex gap-2"><SquarePlay color="#364559"/> <p className="text-[#364559]">4 videos</p></div>
                                </div>
                                <div>
                                    <div className="flex gap-2"><NotebookPen color="#364559"/> <p className="text-[#364559]">4 exercices</p></div>
                                </div>
                            
                            </div>
                            <div onClick={()=>{selectedChaps.includes("chapter3")?setSelectedChaps(selectedChaps.filter(f=>f!="chapter3")):setSelectedChaps([...selectedChaps,"chapter3"])}} className="chapter chapter3 py-4 px-2 flex flex-row gap-2 border-b">
                                <ChevronRight className={`${selectedChaps.includes("chapter3")?"selected-chapter":""}`}/><p className="chapter-name">Intro</p>
                            </div>
                            <div className={`chapter-content ${selectedChaps.includes("chapter3")?"":"hidden"} mt-2 px-4 py-3 rounded-3xl bg-white flex flex-col gap-3` }>
                                <div >
                                    <div className="flex gap-2"><FileText color="#364559"/> <p className="text-[#364559]">3 articles</p></div>
                                </div>
                                <div >
                                    <div className="flex gap-2"><SquarePlay color="#364559"/> <p className="text-[#364559]">4 videos</p></div>
                                </div>
                                <div>
                                    <div className="flex gap-2"><NotebookPen color="#364559"/> <p className="text-[#364559]">4 exercices</p></div>
                                </div>
                            
                            </div>
                            <div onClick={()=>{selectedChaps.includes("chapter4")?setSelectedChaps(selectedChaps.filter(f=>f!="chapter4")):setSelectedChaps([...selectedChaps,"chapter4"])}} className="chapter chapter4 py-4 px-2 flex flex-row gap-2">
                                <ChevronRight className={`${selectedChaps.includes("chapter4")?"selected-chapter":""}`}/><p className="chapter-name">Intro</p>
                            </div>
                            <div className={`chapter-content ${selectedChaps.includes("chapter4")?"":"hidden"} mb-2 mt-2 px-4 py-3 rounded-3xl bg-white flex flex-col gap-3` }>
                                <div >
                                    <div className="flex gap-2"><FileText color="#364559"/> <p className="text-[#364559]">3 articles</p></div>
                                </div>
                                <div >
                                    <div className="flex gap-2"><SquarePlay color="#364559"/> <p className="text-[#364559]">4 videos</p></div>
                                </div>
                                <div>
                                    <div className="flex gap-2"><NotebookPen color="#364559"/> <p className="text-[#364559]">4 exercices</p></div>
                                </div>
                            
                            </div>

                        </div>
                    </div> 
                    <div className={`reviews ${selected == "Reviews"?"":"hidden"} flex flex-col gap-6 `}>
                        <div className="flex gap-2 items-center"><MessageSquareQuote width={30} height={30}/><h5 className="font-semibold">Reviews</h5></div>
                        <p className="text-[#006FFF]">270 reviews</p>
                        <div className="overflow-auto" style={{maxHeight:"400px",scrollbarWidth:"none"}}>
                            <div className="reviews-section grid-cols-1 grid md:grid-cols-2 gap-5 relative">
                            
                            <Review username={"User"} content={"Lorem ipsum, dolor sit amet consectetur adipisicing elit. Reprehenderit ad illum vero, mollitia culpa iure rem omnis alias illo! Deleniti reiciendis, accusantium perspiciatis quos alias et saepe sed vel nemo?" }/>
                            <Review username={"User"} content={"Lorem ipsum, dolor sit amet consectetur adipisicing elit. Reprehenderit ad illum vero, mollitia culpa iure rem omnis alias illo! Deleniti reiciendis, accusantium perspiciatis quos alias et saepe sed vel nemo?" }/>
                            <Review username={"User"} content={"Lorem ipsum, dolor sit amet consectetur adipisicing elit. Reprehenderit ad illum vero, mollitia culpa iure rem omnis alias illo! Deleniti reiciendis, accusantium perspiciatis quos alias et saepe sed vel nemo?" }/>
                            <Review username={"User"} content={"Lorem ipsum, dolor sit amet consectetur adipisicing elit. Reprehenderit ad illum vero, mollitia culpa iure rem omnis alias illo! Deleniti reiciendis, accusantium perspiciatis quos alias et saepe sed vel nemo?" }/>
                            

                            
                            
                        </div>
                        <div className="flex justify-center mt-5 mb-5">
                            <button className="px-6 py-3 rounded-3xl font-bold cursor-pointer text-[#10305A]  hover:outline-2 hover:outline-[#10305A]">
                            Load More
                            </button>
                        </div>
                        
                        </div>
                        
                    </div> 
                </div>
                
            </div>
        </main><Footer/></>
    )
}

export default Course