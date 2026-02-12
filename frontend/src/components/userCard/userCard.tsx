import { ArrowRight, CirclePlay } from "lucide-react"
import "./userCard.css"
import { RotateCcw } from 'lucide-react';
import { Loader } from 'lucide-react';
import { CircleCheck } from 'lucide-react';
import { Heart } from "lucide-react";
import type { enrollements } from "@/types/enrollements";

import type { Courses } from "@/types/courses";
import { useNavigate } from "react-router-dom";

type params={
    isfavorite:boolean,
    enr?:enrollements
    liked?:Courses,
    onDelete?:(id:number)=>void
}

function UserCard({isfavorite,enr,liked,onDelete}:params){

  const navigate = useNavigate()
    function deleteLike() {
    fetch(import.meta.env.VITE_API_LIKES_URL + "/deleteLike", {
      method: "DELETE",
      credentials: "include",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id:liked!.id }),
    })
      .then((res) => res.json())
      .then((res) => {
        if (res.success) {
          if(onDelete) onDelete(liked?.id!)
        } 
      });
  }
    
    const progress = enr?.progress ?? liked?.enrollements![0].progress

    return(
        <><div className="user-card px-2 min-w-80   lg:min-w-90 py-2 pb-4 border-2 bg-[#F8FAFF] border-[#E1E2F3] rounded-3xl   flex flex-col gap-4">
            <div className="thumbnail-learning relative rounded-3xl" style={{backgroundImage:`url(${import.meta.env.VITE_API_FILE_URL}/${enr?.course.photo ?? liked?.photo})`}}>
                {isfavorite && (
                    <Heart
                  size={39}
                  color="#10305A"
                  onClick={deleteLike}
                  className={`cursor-pointer p-2 rounded-full absolute right-2 top-2 border-[#10305A] border-2 bg-[#ffffffa9]  fill-red-500`}
                  strokeWidth={2.9}
                />
                )}
            </div>
            <p className="text-black px-5  rounded-3xl w-[100%] flex  ">{enr?.course.creator?.fname ?? liked?.creator?.fname} {enr?.course.creator?.lname ?? liked?.creator?.lname}</p>
            <div className="progress p-2 text-black bg-[ # 0410fb7e] border border-[#00000032] w-fit rounded-3xl flex flex-row gap-2">{progress!<100?(<><Loader/>In progress</>):(<><CircleCheck className="fill-green-400"/>Completed</>)}</div>
            <h5 className="font-semibold">{enr?.course.title ?? liked?.title}</h5>
            <div className="flex flex-row gap-4 items-center">
                <div className="completion-wrapper h-4 flex-1 bg-[#E1E2F3] rounded-3xl overflow-hidden">
                    <div style={{ width: `${progress}%` }} className={`completion  rounded-3xl h-full ${progress!<100?"bg-[#2f2bff]":"bg-green-400"}  `}>

                    </div>
                </div>
                <p>{progress}%</p>

            </div>

            <button onClick={()=>navigate("/enr/"+enr?.id)} className=" main-btn text-[12px]  px-2 py-3 flex user-btn gap-2 items-center justify-center  squircle sm:px-12 sm:py-3 sm:text-[16px] md:px-8 md:py-3 md:text-[18px] lg:px-12 lg:py-2 lg:text-[18px]">{
            progress==100?(<>Rewatch <RotateCcw /></>):progress==0?(<>Start watching <CirclePlay/></>):(<>Continue watching <ArrowRight /></>)
            }</button>

        </div>
       </>
    )
}

export default UserCard