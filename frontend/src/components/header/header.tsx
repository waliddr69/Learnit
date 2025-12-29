import "./header.css"
import logo from "../../assets/images/full_logo.svg";
import { ArrowRight, BookSearch, Cast, ChevronDown, GraduationCap, Menu } from "../../icons";
import arrow from "../../assets/icons/Arrow Right Arrow-iconrepo-com.svg";
import {  useEffect, useRef, useState } from "react";
import close from "../../assets/icons/close-x-svgrepo-com (1).svg";
import { gsap } from "gsap";
import { Link, useNavigate } from "react-router-dom";


function Header(){
    const [menu,showMenu] = useState(false);
    const [hamMenu,showHamMenu] = useState(false);
    const [subhamMenu,showsubHamMenu] = useState(false);
    const learnRef = useRef(null)
    const navigate = useNavigate();
   
    useEffect(()=>{
        if(menu ){
            gsap.fromTo(".learn",{height:0,opacity:0},{height:"500px",opacity:1,duration:0.1,ease:"power2.out"})
        }
        
        if(hamMenu){
            gsap.fromTo(".ham-menu",{x:-20,opacity:0},{x:0,opacity:1,duration:0.1,ease:"power2.out"})
        }
    },[menu,hamMenu])
    
    return(
        <>
          <header className={menu?"menu-open":""}>
            <div className="wrapper flex justify-around sm:justify-between items-center">
                <img src={logo} alt="logo"  className="w-24 h-auto sm:w-28 md:w-48 lg:w-48"/>
                <nav className="hidden lg:block">
                    <ul>
                    <li><Link to={"/courses"} className="hidden lg:block" >Courses</Link></li>
                    <li><Link to={"/education"} className="hidden lg:block">Education</Link></li>
                    <li onMouseEnter={()=>showMenu(true)}  ><a className="dropdown hidden lg:block" >Learn</a> <ChevronDown className="hidden lg:block"/></li>
                </ul>
                </nav>

                <div className="btns flex justify-end shrink-0">
                    <button onClick={()=>navigate("/login")} className="cta main-btn text-[12px] px-2 py-3  squircle sm:px-12 sm:py-3 sm:text-[16px] md:px-12 md:py-3 md:text-[18px] lg:px-12 lg:py-3 lg:text-[18px] ">Sign up</button>
                    <button className="sec sec-btn squircle text-[12px] px-2 py-3  sm:px-12 sm:py-3 sm:text-[16px] md:px-12 md:py-3 md:text-[18px] lg:px-12 lg:py-3 lg:text-[18px] ">Log in</button>
                    <div className="lg:hidden ham">
                        {!hamMenu &&<Menu onClick={()=>showHamMenu(true)}/>}
                        {hamMenu && <img src={close} alt="close" className="w-8 h-8" onClick={()=>showHamMenu(false)}/>}
                    </div>
                    
                </div>
                
            </div>
            
            {menu && <div className="learn hidden lg:flex justify-between px-5 py-3  " ref={learnRef} onMouseEnter={()=>showMenu(true)} onMouseLeave={()=>showMenu(false)}>
                <div className="students flex flex-col gap-5 ">
                    <h5 className="font-black learn-head flex gap-3">For students <ArrowRight/></h5>
                    <div className="h-1 w-2/3" style={{backgroundColor:"#D3D3D3",borderRadius:"24px"}}></div>
                    <div className=" flex gap-5 items-center hover:bg-sky-100 rounded-3xl p-4 cursor-pointer w-max">
                        <BookSearch/> 
                        <div>
                            <h6 className="font-bold learn-subhead" style={{color:"#33333"}}>Courses</h6>
                            <p style={{color:"var(--subheading-color)"}}>Browse and enroll in courses</p>
                        </div>       
                    </div>
                    <div className="flex gap-5 items-center hover:bg-sky-100 rounded-3xl p-4 cursor-pointer">
                        <GraduationCap/>
                        <div>
                            <h6 className="font-bold learn-subhead" style={{color:"#33333"}}>Education</h6>
                            <p style={{color:"var(--subheading-color)"}}>Build your knowledge with structured learning</p>
                        </div>       
                    </div>
                </div>
                <div className=" flex flex-col gap-5">
                    <h5 className="font-black learn-head flex gap-3">For teachers <ArrowRight/></h5>
                    <div className="h-1 w-2/3" style={{backgroundColor:"#D3D3D3",borderRadius:"24px"}}></div>
                    <div className=" flex gap-5 items-center hover:bg-sky-100 rounded-3xl p-4 cursor-pointer">
                        <Cast/> 
                        <div onClick={()=>navigate("/teach/signup")}>
                            <h6 className="font-bold learn-subhead" style={{color:"#33333"}}>Teach</h6>
                            <p style={{color:"var(--subheading-color)"}} >Teach now</p>
                        </div>       
                    </div>
                    <div className=" flex gap-5 items-center hover:bg-sky-100 rounded-3xl p-4 cursor-pointer">
                        <BookSearch/> 
                        <div>
                            <h6 className="font-bold learn-subhead" style={{color:"#33333"}}>Courses</h6>
                            <p style={{color:"var(--subheading-color)"}}>Browse and enroll in courses</p>
                        </div>       
                    </div>
                </div>
                <div className=" flex flex-col gap-5 justify-center">
                    <h5 className="font-black learn-head flex gap-3">Getting started <ArrowRight/></h5>
                    <div className="h-1 w-2/3" style={{backgroundColor:"#D3D3D3",borderRadius:"24px"}}></div>
                    
                    <div className="bg-image"></div>
                    <p style={{color:"var(--subheading-color)"}}>your first steps on the platform</p>
                    <button className="font-bold flex cursor-pointer rounded-3xl hover:outline-2 hover:outline-[#10305A] p-2 w-[40%] transition-all ">See more <img src={arrow} alt="arrow" width={20}/></button>
                </div>
                
            </div>}

            {hamMenu && <div className="ham-menu flex flex-col gap-5 p-5 lg:hidden h-dvh bg-white">
                <div className="p-2 pl-4 border-b-2 border-gray-300">
                    <a className="ham-item font-bold">Courses</a>
                </div>
                <div className="p-2 pl-4 border-b-2 border-gray-300">
                    <a className="ham-item font-bold">Education</a>
                </div>
                <div className="p-2 pl-4 border-b-2 border-gray-300">
                    <a className="ham-item font-bold flex flex-row justify-between" onClick={()=>showsubHamMenu(!subhamMenu)}>Learn <img src={arrow} className={subhamMenu ? "rotate" : "arrow"} alt="arrow" width={20}/></a>
                    {subhamMenu && <div className="learn2 lg:hidden w-dvw flex flex-col gap-5  px-5 py-6 bg-white  " ref={learnRef}>
                <div className="students flex flex-col gap-5 ">
                    <h5 className="font-black learn-head flex gap-3">For students <ArrowRight/></h5>
                    <div className="h-1 w-2/3" style={{backgroundColor:"#D3D3D3",borderRadius:"24px"}}></div>
                    <div className=" flex gap-5 items-center hover:bg-sky-100 rounded-3xl p-4 cursor-pointer w-max">
                        <BookSearch/> 
                        <div>
                            <h6 className="font-bold learn-subhead" style={{color:"#33333"}}>Courses</h6>
                            <p style={{color:"var(--subheading-color)"}}>Browse and enroll in courses</p>
                        </div>       
                    </div>
                    <div className="flex gap-5 items-center hover:bg-sky-100 rounded-3xl p-4 cursor-pointer">
                        <GraduationCap/>
                        <div>
                            <h6 className="font-bold learn-subhead" style={{color:"#33333"}}>Education</h6>
                            <p style={{color:"var(--subheading-color)"}}>Build your knowledge with structured learning</p>
                        </div>       
                    </div>
                </div>
                <div className=" flex flex-col gap-5">
                    <h5 className="font-black learn-head flex gap-3">For teachers <ArrowRight/></h5>
                    <div className="h-1 w-2/3" style={{backgroundColor:"#D3D3D3",borderRadius:"24px"}}></div>
                    <div className=" flex gap-5 items-center hover:bg-sky-100 rounded-3xl p-4 cursor-pointer">
                        <Cast/> 
                        <div>
                            <h6 className="font-bold learn-subhead" style={{color:"#33333"}}>Teach</h6>
                            <p style={{color:"var(--subheading-color)"}}>Teach now</p>
                        </div>       
                    </div>
                    <div className=" flex gap-5 items-center hover:bg-sky-100 rounded-3xl p-4 cursor-pointer">
                        <BookSearch/> 
                        <div>
                            <h6 className="font-bold learn-subhead" style={{color:"#33333"}}>Courses</h6>
                            <p style={{color:"var(--subheading-color)"}}>Browse and enroll in courses</p>
                        </div>       
                    </div>
                </div>
                <div className=" flex flex-col gap-5 justify-center">
                    <h5 className="font-black learn-head flex gap-3">Getting started <ArrowRight/></h5>
                    <div className="h-1 w-2/3" style={{backgroundColor:"#D3D3D3",borderRadius:"24px"}}></div>
                    
                    <div className="bg-image"></div>
                    <p style={{color:"var(--subheading-color)"}}>your first steps on the platform</p>
                    <button className="font-bold flex cursor-pointer rounded-3xl hover:outline-2 hover:outline-[#10305A] p-2 w-[20%] transition-all ">See more <img src={arrow} alt="arrow" width={20}/></button>
                </div>
                
            </div>}
                </div>
            </div>}
            
        </header>
        {menu && <div className="overlay hidden lg:block" onClick={()=>showMenu(false)}></div>}
        </>
        
    )
}

export default Header