import {  Star, Users, Wallet } from "lucide-react";
import ApexChart from "../../charts/enrollChart/chart";
import ColumnChart from "../../charts/columnChart/columnChart";

function Dashboard(){
    return(
        <div className="dashboard flex flex-col gap-12">
            <h3>Dashboard</h3>
            <div className="stats flex flex-row flex-wrap lg:flex-nowrap justify-between gap-4">
                <div className="stat-card flex-1 flex flex-col p-4 gap-2 border-2 rounded-3xl border-[#08203e76]">
                    <div className='flex flex-row gap-2 items-center'><Users className='bg-[#DBEBFF] p-2 rounded-3xl' size={40}/><p>Total enrollements</p></div>
                    <h4 className='font-semibold'>24569</h4>
                </div>
                <div className="stat-card flex-1 flex flex-col p-4 gap-2 border-2 rounded-3xl border-[#08203e76]">
                    <div className='flex flex-row gap-2 items-center'><Wallet className='bg-[#F9D6E5] p-2 rounded-3xl' size={40}/><p>Total revenue</p></div>
                    <h4 className='font-semibold'>11200 DA</h4>
                </div>
                
                <div className="stat-card flex-1 flex gap-2 flex-col p-4 border-2 rounded-3xl border-[#08203e76]">
                    <div className='flex flex-row gap-2 items-center'><Star className='bg-[#FCEBD2] p-2 rounded-3xl' size={40}/><p>Your rating</p></div>
                    <h4 className='font-semibold'>4.7/5</h4>
                </div>
            </div>
            <div className="chart w-full">
                <h4>Total revenue chart</h4>
                <ApexChart/>
            </div>
            <div className="column">
                <h4>Users rating</h4>
                <ColumnChart/>
            </div>
        </div>
    )
}

export default Dashboard