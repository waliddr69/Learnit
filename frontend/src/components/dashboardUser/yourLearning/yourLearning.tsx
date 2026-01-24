import PieChartCompletion from "../../charts/pieChart/pie";
import UserCard from "../../userCard/userCard";

function YourLearning(){
    return(
        <div className="learning overflow-hidden  p-4 ">
            <h3 className="font-bold text-2xl mb-4">Your Learning</h3>
            
            <div className="chart p-8 border-2 border-[#0000003e] rounded-3xl  mb-6 w-full justify-between flex flex-col ">
                <div>
                    <h4 className="self-start">Learning Progress</h4>
                    
                </div>
                <div className="w-full items-center justify-center flex">
                    <PieChartCompletion />
                </div>
                <div className="stats self-center  w-full lg:w-[70%] flex flex-col sm:flex-row gap-2">
                    <div className="completed-stat border-1 border-[blue] flex flex-1 flex-col items-start   p-4 rounded-3xl">
                        <div className="flex items-center flex-row gap-2"><div className="h-6 bg-[blue] rounded-full w-6 "></div><h5 className="font-bold ">30%</h5></div>
                        <p className="text-[#2c2c2c]" style={{color:"var(--heading2-color)"}}>Completed</p>
                    </div>
                    <div className="uncompleted-stat flex border-1 border-[#63a9ff] flex-1 flex-col items-start   p-4 rounded-3xl">
                        <div className="flex items-center flex-row gap-2"><div className="h-6 bg-[#63a9ff] rounded-full w-6 "></div><h5 className="font-bold ">70%</h5></div>
                        <p className="text-[#666666]" style={{color:"var(--heading2-color)"}}>Uncompleted</p>
                    </div>
                    <div className="uncompleted-stat flex border-1 border-[#44444497] flex-1 flex-col items-start   p-4 rounded-3xl">
                        <h5 className="font-bold">6</h5>
                        <p className="text-[#666666]" style={{color:"var(--heading2-color)"}}>Total courses</p>
                    </div>
                </div>
                
            </div>
            <div className="overflow-x-auto flex gap-4" style={{scrollbarWidth:"none"}}>
                <UserCard isfavorite={false}/>
                <UserCard isfavorite={false}/>
                <UserCard isfavorite={false}/>  
            </div>
            
        </div>
    )
}

export default YourLearning