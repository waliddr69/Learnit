import Header from "../../components/header/header";

import Search from "../../components/search/search";
import "./courses.css";

import DomainCard from "../../components/domainCard/domain";
import {  useEffect, useState } from "react";

import { X } from 'lucide-react';
import { SlidersHorizontal } from 'lucide-react';
import CoursesCard from "../../components/coursesCard/coursesCard";
import gsap from "gsap";
import { domains } from "@/models/domains";
import Footer from "@/components/footer/footer";
import type { Courses } from "@/types/courses";
import MinimumDistanceSlider from "./Slider";
import type { Likes } from "@/types/likes";

import { useAuth } from "@/context/authContext";
import { useCart } from "@/context/cartContext";
import { getLikes } from "@/services/likesService";
import { useSearchParams } from "react-router-dom";
function Courses(){
    
    const [search] = useSearchParams()
    const [selected, isSelected] = useState(search.get("domain") ?? "All");
  useEffect(()=>{
    if(search.get("domain")){
        isSelected(search.get("domain")!)
    }
  },[search])
    
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

    const [Message,setMessage] = useState("")
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
    const [difficulty,setDifficulty] = useState("")
    const [cat,setCat] = useState("")
    const[lessons,setLessons] = useState([])

    const [max,setMax] = useState(1)
    const [showedCourses,setShowedCourses] = useState<Courses[]>([])

    const [courses,setCourses] = useState<Courses[]>([])

    const [price,setPrice] = useState<number>(100)
    
    const [id,setId] = useState(0)

    const { user } = useAuth();
                
    async function getUser(){
        
        if(user){
            setId(user.id)
                  
        }
                  
    }

    
                

    function getCourses(){
        fetch(`${import.meta.env.VITE_API_COURSE_URL}/getFilteredCourses?type=course&domain=`+selected+"&difficulty="+difficulty+"&cat="+cat+"&min="+priceRange[0]+"&max="+priceRange[1]+"&id="+id,{
            method:"GET",
            credentials:"include"
        
        })
        .then(res=>res.json())
        .then(res=>{
            
            
            
            if(res.success && res.courses){
                setMessage("")
                const c = res.courses
                
                setCourses(c)
                if (price === 100) { 
                    const backendMax = Math.max(...c.map((v: any) => Number(v.price) || 0));
                    setPrice(backendMax);
                    setPriceRange([0, backendMax]); 
                    }
                
                updateShowed(c,max*6)
                

                const lessonsCount = res.courses.map(
                    (course: { chapters: any[] }) =>
                    course.chapters.reduce(
                        (acc: number, curr: any) => acc + curr._count.lessons,
                        0
                    )
                )

                setLessons(lessonsCount)
                

                
            }
            else{
                setCourses([])
                setShowedCourses([])
                setMessage(res.message)
            }
             
        })
    }
    const [parts,setParts] = useState(1)
    const [priceRange, setPriceRange] = useState<[number|undefined, number|undefined]>([undefined, undefined]);
    
    function updateShowed(c:Courses[],n:number){
        setShowedCourses(c.slice(0, n));
        setParts(Math.ceil(c.length / 6));
    }

    const [likes,setLikes] = useState<Likes[]>([])

    async function get(){
    
        const res = await getLikes()
        
        if(res.success){
            setLikes(res.likes)
        }

    }

    const {cart} = useCart()

    
    
    useEffect(()=>{
        
        getUser()
        
    },[user])

    useEffect(()=>{
       
        
        get()
        
    },[])

    useEffect(()=>{
        
        getCourses()
        
    },[selected,difficulty,cat,priceRange])

    function checkLikable(courseId:number){
        
        
        return likes.some(l => l.courseId === courseId);
        
    }
     function chackInCart(courseId:number){
        
       
        return cart!.some(l => l.courseId === courseId);
        
    }

    
    
    return(
        <main className="min-h-vh">
            <Header />
            <Search />
            
            <button onClick={handleClick} className="flex filter font-semi gap-4 px-12 py-3 border-3 text-2xl items-center  rounded-3xl  sticky top-5 left-1/2 transform -translate-x-1/2 z-1 mt-5 text-[12px] px-2 py-3  squircle sm:px-12 sm:py-3 sm:text-[16px] md:px-12 md:py-3 md:text-[18px] lg:px-12 lg:py-3 lg:text-[18px]"><SlidersHorizontal/> <span>Filters</span></button>
            <div className="filters  items-center  w-1/2 overflow-x-scroll hidden sticky py-6 opacity-0  top-5 left-1/2 transform   rounded-3xl    -translate-x-1/2 z-50 mt-5 ">
                <div className="filter-dif flex flex-col gap-4 items-center px-4">
                    <p className="font-medium text-lg whitespace-nowrap">Difficulty :</p>
                    <select name="dif"  onChange={(e)=>setDifficulty(e.target.value)}>
                        <option value="mixed">All</option>
                        <option value="all">All levels</option>
                        <option value="easy">Beginner</option>
                        <option value="medium">Intermediate</option>
                        <option value="hard">Advanced</option>
                    </select>
                </div>
                <div className="filter-price flex-col flex gap-4 items-center px-4">
                    <p className="font-medium text-lg whitespace-nowrap">Price :</p>
                    <MinimumDistanceSlider min={0} max={price??100} onChange={(range)=>{
                        
                        if (range) {
                            setPriceRange(range as [number|undefined, number|undefined])
                        }
                        
                    }}/>
                    
                </div>
                <div className="filter-format flex-col flex gap-4 items-center px-4">
                    <p className="font-medium text-lg whitespace-nowrap">Type :</p>
                    <select name="format" onChange={(e)=>setCat(e.target.value)}>
                        <option value="all">All</option>
                        <option value="lessons">Lessons</option>
                        <option value="exercices">Exercices</option>
                        


                        
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
                {Message && (
                    <div className="flex justify-center items-center">
                        <h3>{Message}</h3>

                    </div>
                )}
                <div className="relative flex flex-col mb-20">
                    
                    {Array.from({ length: parts }).map((_, rowIndex) => {
                        const start = rowIndex * 6;
                        const end = start + 6;
                        const rowCourses = showedCourses.slice(start, end);

                        return (
                            <div
                            key={rowIndex}
                            className="courses w-full snap-x py-2 px-4 flex flex-row overflow-x-auto gap-4"
                            >
                            {rowCourses.map((course: Courses,i) => (
                                <CoursesCard
                                key={course.id}
                                title={course.title}
                                photo={course.photo!}
                                price={course.price!}
                                difficulty={course.difficulty!}
                                liked={checkLikable(course.id)}
                                inCart={chackInCart(course.id)}
                                reviewsCs={course.reviewsCs!}
                                _count={lessons[i]}
                                creator={course.creator!}
                                cat={course.cat!}
                                domain={course.domain!}
                                subdomain={course.subdomain!}
                                id={course.id}
                                />
                            ))}
                            </div>
                        );
                        })}

                    
                    {courses.length>max && <button onClick={()=>{
                        const m = max*6
                        setMax(m)
                        updateShowed(courses,m)
                    }} className="load w-[90%] hover:outline-4 transition-all mt-10 p-5 rounded-3xl font-bold self-center outline-black outline-2">Load more ....</button>}
                    <div className="pointer-events-none absolute right-0 top-0 h-full w-50 sm:w-100 bg-linear-to-l from-white to-transparent z-30"></div>
                </div>
                
                

                </div>

                
                
         <Footer/>   
        </main>
    )
}

export default Courses;