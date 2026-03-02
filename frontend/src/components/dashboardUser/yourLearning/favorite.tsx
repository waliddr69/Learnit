import { useEffect, useState } from "react";
import UserCard from "../../userCard/userCard";

import type { Courses } from "@/types/courses";
import CoursesCard from "@/components/coursesCard/coursesCard";
import EducationCard from "@/components/educationCard/educationCard";

function Favorite(){
    
    
        

    const [likes,setLikes] = useState<Courses[]>([])
    const [unrolledLikes,setUnrolledLikes] = useState<Courses[]>([])
    
    
        function getLikes(){
        fetch(import.meta.env.VITE_API_LIKES_URL + "/getFavorite", {
          method: "GET",
          headers: { "Content-Type": "application/json" },
          credentials: "include",
        })
    
        .then(res=>res.json())
        .then(res=>{
            console.log(res)
           
            if(res.success){
                
                setLikes(res.likes)
               
                setUnrolledLikes(res.unrolledLikes)
            }
        })
        }

        useEffect(()=>{
            getLikes()
        },[])
        
    return(
        
        <div className="favorite flex flex-col gap-10 p-4 ">
            {likes.length>0 || unrolledLikes.length>0 ? (
                <>
                {likes.length>0 && (
                    <div>
                        <h3 className="font-bold text-2xl mb-4">Favorite</h3><div className="overflow-x-auto flex gap-4" style={{ scrollbarWidth: "none" }}>
                            {likes.map((l:Courses) => {
                                if(l.type === "education"){
                                    return <UserCard key={l.id} type="education" isfavorite={true} liked={l} onDelete={(id) => setLikes(likes.filter(v => v.id !== id))} />;
                                }else{
                                    return <UserCard key={l.id} isfavorite={true} liked={l} onDelete={(id) => setLikes(likes.filter(v => v.id !== id))} />;
                                }
                                
                                
                            })}
                        </div>
                    </div>
                    
                )}
                {unrolledLikes.length>0 && (
                    <div>
                       <h3 className="font-bold text-2xl mb-4">Favorite unenrolled courses</h3><div className="overflow-x-auto flex gap-4" style={{ scrollbarWidth: "none" }}>
                            {unrolledLikes.map((l:Courses) => {
                                if(l.type === "education"){
                                    return <EducationCard courses={l} liked={true} inCart={false} _count={l.chapters!.reduce((acc:number,c:any)=>acc+c._count,0)}/>
                                }else{
                                   return <CoursesCard title={l.title} id={l.id} reviewsCs={l.reviewsCs} _count={l.chapters!.reduce((acc:number,c:any)=>acc+c._count,0)} photo={l.photo!} price={l.price!} difficulty={l.difficulty!} cat={l.cat!} domain={l.domain!} subdomain={l.subdomain!} creator={l.creator!} liked={true} inCart={null} />; 
                                }
                                
                            })}
                        </div> 
                    </div>
                    
                )}
                
                
                </>
            ):(
                <h3 className="text-center">You don't have any liked courses</h3>
            )}
            
        </div>
    )
}

export default Favorite