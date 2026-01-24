import Header from "../../components/header/header";

import Search from "../../components/search/search";
import "./courses.css";

import DomainCard from "../../components/domainCard/domain";
import { useEffect, useState } from "react";

import { X } from 'lucide-react';
import { SlidersHorizontal } from 'lucide-react';
import CoursesCard from "../../components/coursesCard/coursesCard";
import gsap from "gsap";
import { domains } from "@/models/domains";
import Footer from "@/components/footer/footer";
function Courses(){
    
    const [selected,isSelected] = useState("All");
    const handleClick = function(){
        const tl = gsap.timeline();
        tl.to(".filter *",{
            opacity:0,
            
        })
        .to(".filter",{
            width:"50%",
            border:"2px solid #626a73bf",
            outline:"none"
        })
        .to(".filter",{
            display:"none"
        })
        .to(".filters *",{
            opacity:1
        },0)
        .to(".filters",{
            padding:"16px 0px",
            width:"50%",
            display:"flex",
            opacity:1,
            stagger:0.1
        },"+=0.0000001")
        
    }
    const handleDelete = function(){
        const tl = gsap.timeline();
        tl.to(".filters *",{
            opacity:0,
            
        },0)
        .to(".filters",{
            
            width:"15%",
            
            
        },0)
        
        .to(".filters",{
            display:"none"
        })
        
        .to(".filter",{
            width:"auto",
            height:"auto",
            display:"flex",
            opacity:1,
            stagger:0.1
        })
        .to(".filter *",{
            display:"flex",
            opacity:1,
            stagger:0.1
        })
        
    }
    
    return(
        <main className="min-h-vh">
            <Header />
            <Search />
            
            <button onClick={handleClick} className="flex filter font-semi gap-4 px-12 py-3 border-3 text-2xl items-center  rounded-3xl  sticky top-5 left-1/2 transform -translate-x-1/2 z-1 mt-5 text-[12px] px-2 py-3  squircle sm:px-12 sm:py-3 sm:text-[16px] md:px-12 md:py-3 md:text-[18px] lg:px-12 lg:py-3 lg:text-[18px]"><SlidersHorizontal/> <span>Filters</span></button>
            <div className="filters  items-center  w-1/2 overflow-x-scroll hidden sticky py-4 opacity-0  top-5 left-1/2 transform   rounded-3xl    -translate-x-1/2 z-50 mt-5 ">
                <div className="filter-dif flex gap-4 items-center px-4">
                    <p className="font-medium text-lg whitespace-nowrap">Difficulty :</p>
                    <select name="dif" id="">
                        <option value="all">All levels</option>
                        <option value="beginner">Beginner</option>
                        <option value="intermediate">Intermediate</option>
                        <option value="advanced">Advanced</option>
                    </select>
                </div>
                <div className="filter-price flex gap-4 items-center px-4">
                    <p className="font-medium text-lg whitespace-nowrap">Price :</p>
                    <select name="price" id="">
                        <option value="all">All</option>
                        <option value="free">Free</option>
                        <option value="paid">Paid</option>

                    </select>
                </div>
                <div className="filter-format flex gap-4 items-center px-4">
                    <p className="font-medium text-lg whitespace-nowrap">Type :</p>
                    <select name="format" id="">
                        <option value="all">All</option>
                        <option value="video">Lessons</option>
                        <option value="video">Exercices</option>
                        


                        
                    </select>
                </div>
                
                <X className="cursor-pointer shrink-0" onClick={handleDelete}/>
            </div>
            <div className="courses-wrapper flex flex-col gap-15">
                <div className="domains flex gap-4 overflow-x-auto items-center font-medium sm:text-lg justify-start lg:justify-center mt-10">
                {Object.entries(domains).map(([domain, icon], index)=>{
                        return <DomainCard key={index} domain={domain} isselected={selected === domain?true:false} onClick={()=>{isSelected(domain)}} icon={icon ?? undefined} />
                        
                    
                })}
            </div>
                <div className="relative mb-20">
                    <div className="courses w-full snap-x py-2 snap-mandatory px-4 flex flex-row overflow-x-auto gap-4">
                    
                        <CoursesCard/>
                        <CoursesCard/>
                        <CoursesCard/>
                        <CoursesCard/>
                        <CoursesCard/>
                        <CoursesCard/>
                        <CoursesCard/>
                        <CoursesCard/>
                    </div>
                    <div className="pointer-events-none absolute right-0 top-0 h-full w-50 sm:w-100 bg-linear-to-l from-white to-transparent z-30"></div>
                </div>
                
                

                </div>

                
                
         <Footer/>   
        </main>
    )
}

export default Courses;