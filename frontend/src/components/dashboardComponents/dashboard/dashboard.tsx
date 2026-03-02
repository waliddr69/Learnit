import {  Star, Users, Wallet } from "lucide-react";
import ApexChart from "../../charts/enrollChart/chart";
import ColumnChart from "../../charts/columnChart/columnChart";
import { useEffect, useState } from "react";
import type { enrollements } from "@/types/enrollements";
import type { Courses } from "@/types/courses";
import type { ReviewsI } from "@/types/reviewsI";

function Dashboard(){

    const [price,setPrice] = useState(0)
    const [enr,setEnr] = useState(0)
    const [dataSet,setDataSet] = useState<{ day: string; enroll: number; }[]>([])
    const [reviews,setReviews] = useState(0)
    const [columnData,setColumndata] = useState<number[]>([0,0,0,0,0])
    async function getEnr(){
        const req = await fetch(import.meta.env.VITE_API_PAY_URL+"/getByIns",{
            method:"GET",
            credentials:"include"
        })

        const res = await req.json()
        
        console.log(res)
        const p = res.enr.reduce((acc:any,cur:any)=>acc+(cur.price * (cur.enrollements.length)),0)
        const e = res.enr.reduce((acc:any,cur:any)=>acc+(cur.enrollements.length),0)
        
        setPrice(p)
        setEnr(e)
        const counts: Record<string, number> = {};
        res.enr.map((c:Courses)=>{
            (c.enrollements ?? []).forEach((e: enrollements) => {
                  const date = new Date(e.createdAt).toISOString().split("T")[0]
        
                  if (counts[date]) {
                    counts[date]+=c.price!
                  } else {
                    counts[date] = c.price!
                  }
                })
        })
        
        const total = res.enr[0].creator.receivedReviews.reduce((acc:any,curr:ReviewsI)=>{
            return curr.rating+acc
        },0)
        setReviews(total/res.enr[0].creator.receivedReviews.length)
        const data = [0,0,0,0,0]
        res.enr[0].creator.receivedReviews.map((r:ReviewsI)=>{
           
            if (r.rating >= 1 && r.rating <= 5) {
                data[r.rating - 1]++;
            }
        })
        setColumndata(data)
        const dataset = Object.entries(counts).map(([day, enroll]) => ({
        day,
        enroll
        }))
        
        
        setDataSet(dataset)
    }

    useEffect(()=>{
        getEnr()
    },[])
    return(
        <div className="dashboard flex flex-col gap-12">
            <h3>Dashboard</h3>
            {enr>0 ? (
            <div className="stats flex flex-row flex-wrap lg:flex-nowrap justify-between gap-4">
                <div className="stat-card flex-1 flex flex-col p-4 gap-2 border-2 rounded-3xl border-[#08203e76]">
                    <div className='flex flex-row gap-2 items-center'><Users className='bg-[#e9e9e9] border border-[#c5c5c5] p-2 rounded-3xl' size={40}/><p>Total enrollements</p></div>
                    <h4 className='font-semibold'>{enr}</h4>
                </div>
                <div className="stat-card flex-1 flex flex-col p-4 gap-2 border-2 rounded-3xl border-[#08203e76]">
                    <div className='flex flex-row gap-2 items-center'><Wallet className='bg-[#e9e9e9] border border-[#c5c5c5] p-2 rounded-3xl' size={40}/><p>Total revenue</p></div>
                    <h4 className='font-semibold'>{price} DA</h4>
                </div>
                {reviews>0 && (
                <div className="stat-card flex-1 flex gap-2 flex-col p-4 border-2 rounded-3xl border-[#08203e76]">
                    <div className='flex flex-row gap-2 items-center'><Star className='bg-[#e9e9e9] border border-[#c5c5c5] p-2 rounded-3xl' size={40}/><p>Your rating</p></div>
                    <h4 className='font-semibold'>{reviews.toFixed(1)}/5</h4>
                </div>
                )}
                
            </div>
            ):(
                <h3>You don't have any enrollments yet!</h3>
            )}
            
            {price>0 &&
            <div className="chart w-full">
                <h4>Total revenue chart</h4>
                <ApexChart name="Revenue" data={dataSet}/>
            </div> }
            <div className="column">
                
                <ColumnChart columnData={columnData}/>
            </div>
        </div>
    )
}

export default Dashboard