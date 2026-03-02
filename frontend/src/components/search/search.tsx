import "./search.css"
import search from "../../assets/icons/search.svg"
import { useEffect, useState, type FormEvent } from "react";
import { BookSearch, RotateCcw, SearchIcon } from "lucide-react";

import { debouncing } from "@/services/debounce";
import { getSearch, getSearchFull } from "@/services/searchService";
import type { Courses } from "@/types/courses";
import { useLocation, useNavigate } from "react-router-dom";
import type { User } from "@/types/users";
import { useAuth } from "@/context/authContext";

function Search() {
    const [value,setValue] = useState("")
    const location = useLocation()
    const [recents,setRecents] = useState([])
    const debouncedQuery = debouncing(value, 400);
    const [show,setShow] = useState(false)
    const { user,refreshUser } = useAuth();
                    
    useEffect(()=>{
        
        refreshUser()
        
    },[])
    const [results,setResults]=useState<{courses:Courses[],users:User[],education:Courses[]}>({
        courses:[],
        education:[],
        users:[]
    })
    const handleChange = (e:any)=>{
        setValue(e.target.value)
        if(e.target.value=="") setShow(false)
    }
    useEffect(() => {
        const stored = JSON.parse(localStorage.getItem("recents") || "[]");
        setRecents(stored);
    }, []);

    const handleSubmit = async(e:any)=>{
        e?.preventDefault()
        setResults({courses:[],education:[],users:[]})
        const searched = JSON.parse(localStorage.getItem('recents')||"[]")
        const filtered = searched.filter((item: string) => item !== value); 
        const updated = [value, ...filtered].slice(0, 5);
        localStorage.setItem("recents", JSON.stringify(updated));
        navigate("/search?q="+value)

        
    }
    useEffect(()=>{
        if(!debouncedQuery.trim()) return
            const get = async () => {
            const data = await getSearch(debouncedQuery,user?.id);
            
            setShow(true)
            setResults(data)
        };
    get()

    },[debouncedQuery,user])
    useEffect(() => {
        setResults({ courses: [], education: [], users: [] });
        setShow(false)
    }, [location.search]);
    
    const navigate = useNavigate()

    return (
        <section className="mt-5 w-full">
            <div className="search-wrapper relative  flex flex-col gap-2 justify-center items-center">
                <div className="sm:w-[70%] search md:w-[50%] w-[90%] sm:h-12.5 md:h-15 pr-2 rounded-full border-[#a8c4e7] border-2 bg-gray-100 transition-all ease-in-out">
                    <form onSubmit={e=>handleSubmit(e)} className="w-full flex h-full items-center  justify-between">
                     <input onChange={e=>handleChange(e)} value={value} className="w-[90%] rounded-full p-2 h-[95%] bg-gray-100"
                     type="search"  name="search" placeholder="What are you looking for?" />
                     <img src={search} alt="search" className="h-[80%]"/>  
                    </form>
                    
                </div>
                {(results.courses?.length>0 || results.users?.length>0 || results.education?.length>0 || recents.length>0) && (show) ? (

                    <div className="suggestions-container border-2 p-4 transition-all gap-2 border-[#e0e0e0] absolute bg-[#f3f3f3] top-full z-20 sm:w-[70%] md:w-[50%] w-[90%] rounded-3xl flex flex-col">
                        {recents.length>0 && (
                            <div className="rounded-3xl flex flex-col">
                       <h6 className="font-semibold  suggestion-header text-[#091436]">Recents</h6> 
                       <div className="content-sug bg-transparent pl-2">
                            {recents.map((c:any)=>{
                                return <p onClick={(e)=>handleSubmit(e)} className="flex flex-row cursor-pointer items-center p-2 hover:bg-[#DBEBFF] gap-2 rounded-md text-lg"><RotateCcw size={20}/>{c}</p>
                            })}
                            
                            
                            
                            

                       </div>
                       
                    </div>
                        )}
                        {results.courses?.length>0 && (
                            <div className="rounded-3xl flex flex-col">
                       <h6 className="font-semibold  suggestion-header text-[#091436]">Courses</h6> 
                       <div className="content-sug bg-transparent pl-2">
                            {results.courses.map((c:Courses)=>{
                                return <p onClick={()=>navigate("/course/"+c.id)} className="flex flex-row cursor-pointer items-center p-2 hover:bg-[#DBEBFF] gap-2 rounded-md text-lg"><SearchIcon size={20}/>{c.title}</p>
                            })}
                            
                            
                            
                            

                       </div>
                       
                    </div>
                        )}
                    
                    {results.education?.length>0 && (
                            <div className="rounded-3xl flex flex-col">
                       <h6 className="font-semibold  suggestion-header text-[#091436]">Education</h6> 
                       <div className="content-sug bg-transparent pl-2">
                            {results.education.map((c:Courses)=>{
                                return <p onClick={()=>{
                                    navigate("/education/"+c.id)
                                    
                                }} className="flex flex-row cursor-pointer items-center p-2 hover:bg-[#DBEBFF] gap-2 rounded-md text-lg"><SearchIcon size={20}/>{c.title}</p>
                            })}
                            
                            
                            
                            

                       </div>
                       
                    </div>
                        )}

                    {results.users?.length>0 && (
                            <div className="rounded-3xl flex flex-col">
                       <h6 className="font-semibold  suggestion-header text-[#091436]">Instructors</h6> 
                       <div className="content-sug bg-transparent pl-2">
                            {results.users.map((c:User)=>{
                                return <p onClick={()=>navigate("/instructor/"+c.id)} className="flex flex-row cursor-pointer items-center p-2 hover:bg-[#DBEBFF] gap-2 rounded-md text-lg"><div className="instructor-photoo h-8 w-8 rounded-md" style={{backgroundImage:`url(${import.meta.env.VITE_API_FILE_URL}/${c?.photo})`}}></div>{c.fname} {c.lname}</p>
                            })}
                            
                            
                            
                            

                       </div>
                       
                    </div>
                        )}
                    
                    

                </div>
                ):value.trim()!=="" && (
                   <div className="suggestions-container border-2 p-4 transition-all gap-2 border-[#e0e0e0] absolute bg-[#f3f3f3] top-full z-20 sm:w-[70%] md:w-[50%] w-[90%] rounded-3xl flex flex-col">
                       
                       <div className="content-sug bg-transparent pl-2">
                            <p onClick={e=>handleSubmit(e)}  className="flex flex-row cursor-pointer items-center p-2 hover:bg-[#DBEBFF] gap-2 rounded-md text-lg"><SearchIcon size={20}/>{value}</p>
                       </div>
                       
                    </div> 
                )}
                
                
            </div>
        </section>
    );
}

export default Search;