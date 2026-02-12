import { useEffect, useState } from "react";
import UserCard from "../../userCard/userCard";

import type { Courses } from "@/types/courses";
import CoursesCard from "@/components/coursesCard/coursesCard";

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
        
        <div className="favorite p-4 ">
            {likes.length>0 || unrolledLikes.length>0 ? (
                <>
                {likes.length>0 && (
                    <><h3 className="font-bold text-2xl mb-4">Favorite</h3><div className="overflow-x-auto flex gap-4" style={{ scrollbarWidth: "none" }}>
                            {likes.map(l => {
                                return <UserCard key={l.id} isfavorite={true} liked={l} onDelete={(id) => setLikes(likes.filter(v => v.id !== id))} />;
                            })}
                        </div></>
                )}
                {unrolledLikes.length>0 && (
                    <><h3 className="font-bold text-2xl mb-4">Favorite unenrolled courses</h3><div className="overflow-x-auto flex gap-4" style={{ scrollbarWidth: "none" }}>
                            {unrolledLikes.map(l => {
                                return <CoursesCard title={l.title} id={l.id} photo={l.photo!} price={l.price!} difficulty={l.difficulty!} rating={0} cat={l.cat!} domain={l.domain!} subdomain={l.subdomain!} creator={{
                                    photo: l.creator?.photo!,
                                    fname: l.creator?.fname!,
                                    lname: l.creator?.lname!
                                }} liked={true} inCart={null} />;
                            })}
                        </div></>
                )}
                
                
                </>
            ):(
                <h3 className="text-center">You don't have any liked courses</h3>
            )}
            
        </div>
    )
}

export default Favorite