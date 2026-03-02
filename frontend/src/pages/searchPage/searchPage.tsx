import CoursesCard from "@/components/coursesCard/coursesCard";
import Header from "@/components/header/header";
import Search from "@/components/search/search";
import { getSearchFull } from "@/services/searchService";
import type { Courses } from "@/types/courses";
import { useEffect, useState } from "react";
import {  useNavigate, useSearchParams } from "react-router-dom";
import img from "../../assets/images/reading-side.svg"
import { getLikes } from "@/services/likesService";
import type { Likes } from "@/types/likes";
import { useAuth } from "@/context/authContext";
import { useCart } from "@/context/cartContext";

const SearchPage = () => {

    
    const [searchParams] = useSearchParams();
    const q = searchParams.get("q");
    const [results,setResults] = useState<{courses:Courses[],education:Courses[]}>({
        courses:[],
        education:[]
    })
    const { user,refreshUser } = useAuth();
    useEffect(()=>{
        
        refreshUser()
        
    },[])

    const [likes,setLikes] = useState<Likes[]>([])
    async function get(){
        
            const res = await getLikes()
            
            if(res.success){
                setLikes(res.likes)
            }
    
        }
    
        useEffect(()=>{
            get()
        },[])
    const navigate = useNavigate()
    
    useEffect(()=>{
        if(!q) navigate("/courses")
        const res = async()=>{
            const data = await getSearchFull(q!,user?.id)
            setResults(data)
        }
        res()
    },[q])
    function checkLikable(courseId:number){
        
        
        return likes.some(l => l.courseId === courseId);
        
    }
    const {cart} = useCart()
    function chackInCart(courseId:number){
        
       
        return cart!.some(l => l.courseId === courseId);
        
    }
  return (
    <main>
        <Header/>
        <div className="wrapper flex flex-col gap-4">
            <Search/>
            <div className="relative flex flex-col mb-20">
                
                    {results.courses.length > 0 || results.education.length > 0 ? (
                        <div className="courses w-full snap-x py-2 px-4 flex flex-col gap-4">
                            
                            
                            {results.courses.length > 0 && (
                            <>
                                <h3 className="text-lg font-semibold">Courses</h3>

                                <div className="flex flex-row overflow-x-auto h-full gap-4" style={{scrollbarWidth:"none"}}>
                                {results.courses.map((c: Courses) => (
                                    <CoursesCard
                                    key={c.id}
                                    title={c.title}
                                    photo={c.photo!}
                                    price={c.price!}
                                    difficulty={c.difficulty!}
                                    reviewsCs={c.reviewsCs!}
                                    liked={checkLikable(c.id)}
                                    inCart={chackInCart(c.id)}
                                    creator={c.creator!}
                                    cat={c.cat!}
                                    domain={c.domain!}
                                    subdomain={c.subdomain!}
                                    id={c.id}
                                    />
                                ))}
                                </div>
                            </>
                            )}

                            
                            {results.education.length > 0 && (
                            <>
                                <h3 className="text-lg font-semibold">Education</h3>

                                <div className="flex flex-row overflow-x-auto gap-4">
                                {results.education.map((e: Courses) => (
                                    <CoursesCard
                                    key={e.id}
                                    title={e.title}
                                    photo={e.photo!}
                                    price={e.price!}
                                    difficulty={e.difficulty!}
                                    reviewsCs={e.reviewsCs!}
                                    creator={e.creator!}
                                    cat={e.cat!}
                                    domain={e.domain!}
                                    subdomain={e.subdomain!}
                                    id={e.id}
                                    />
                                ))}
                                </div>
                            </>
                            )}

                        </div>
                        ) : (
                        <div className="flex w-full items-center justify-center flex-col">
                            <img src={img} width={100} alt="not found" />
                            <h3>We didn't find a match for "{q}"</h3>
                            <p>Try Searching for: English course, Web dev, AI...</p>
                        </div>
                        )}

                    
                
            </div>

        </div>
    </main>
  );
};

export default SearchPage;