import { useEffect, useState } from "react";
import PieChartCompletion from "../../charts/pieChart/pie";
import UserCard from "../../userCard/userCard";
import type { enrollements } from "@/types/enrollements";
import { useNavigate } from "react-router-dom";

function YourLearning(){

    const [enr,setEnr] = useState<enrollements[]>([])
    const [completed,setCompleted] = useState(0)
    const [uncompleted,setUnCompleted] = useState(0)
    async function getEnrollements(){
        const req = await fetch(import.meta.env.VITE_API_PAY_URL+"/getByUser",{
            method:"GET",
            credentials:"include"
        })

        const res = await req.json()
        if(res.success){
            setEnr(res.enr)

            setCompleted(Math.round((res.enr.filter((c:enrollements)=>c.progress===100).length*100)/res.enr.length))
            setUnCompleted(Math.round((res.enr.filter((c:enrollements)=>c.progress!==100).length*100)/res.enr.length))
            
        }
    }
    const navigate = useNavigate()
    useEffect(()=>{
        getEnrollements()
    },[])
    return(
        <div className="learning overflow-hidden  p-4 ">
            {enr.length>0?(
                <><h3 className="font-bold text-2xl mb-4">Your Learning</h3><div className="chart p-8 border-2 border-[#0000003e] rounded-3xl  mb-6 w-full justify-between flex flex-col ">
                    <div>
                        <h4 className="self-start">Learning Progress</h4>

                    </div>
                    <div className="w-full items-center justify-center flex">
                        <PieChartCompletion completed={completed} uncompleted={uncompleted} total={enr.length} completedC={enr.filter((c: enrollements) => c.progress === 100).length} />
                    </div>
                    <div className="stats self-center  w-full lg:w-[70%] flex flex-col sm:flex-row gap-2">
                        <div className="completed-stat border-2 border-[blue] flex flex-1 flex-col items-start   p-4 rounded-3xl">
                            <div className="flex items-center flex-row gap-2"><div className="h-6 bg-[blue] rounded-full w-6 "></div><h5 className="font-bold ">{completed}%</h5></div>
                            <p className="text-[#2c2c2c]" style={{ color: "var(--heading2-color)" }}>Completed</p>
                        </div>
                        <div className="uncompleted-stat flex border-2 border-[#63a9ff] flex-1 flex-col items-start   p-4 rounded-3xl">
                            <div className="flex items-center flex-row gap-2"><div className="h-6 bg-[#63a9ff] rounded-full w-6 "></div><h5 className="font-bold ">{uncompleted}%</h5></div>
                            <p className="text-[#666666]" style={{ color: "var(--heading2-color)" }}>Uncompleted</p>
                        </div>
                        <div className="uncompleted-stat flex border-2 border-[#93929244] flex-1 flex-col items-start   p-4 rounded-3xl">
                            <h5 className="font-bold">{enr.length}</h5>
                            <p className="text-[#666666]" style={{ color: "var(--heading2-color)" }}>Total courses</p>
                        </div>
                    </div>

                </div><div className="overflow-x-auto flex gap-4" style={{ scrollbarWidth: "none" }}>
                        {enr.map(c => {
                            return <UserCard isfavorite={false} enr={c} />;
                        })}


                    </div></>
            ):(
                <h3 className="text-center">You haven't enroll in any courses. <span onClick={()=>navigate("/courses")} style={{textDecoration:"underline",color:"blue",cursor:"pointer"}}>Go check courses </span></h3>
            )}
            
            
        </div>
    )
}

export default YourLearning