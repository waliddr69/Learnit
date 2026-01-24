import { ArrowRight } from "lucide-react"
import "./userCard.css"
import { RotateCcw } from 'lucide-react';
import { Loader } from 'lucide-react';
import { CircleCheck } from 'lucide-react';
import { Heart } from "lucide-react";

type params={
    isfavorite:boolean
}

function UserCard({isfavorite}:params){
    return(
        <><div className="user-card px-2 min-w-80   lg:min-w-90 py-2 pb-4 border-2 bg-[#F8FAFF] border-[#E1E2F3] rounded-3xl   flex flex-col gap-4">
            <div className="thumbnail relative rounded-3xl">
                {isfavorite && (
                    <Heart  size={40} className="p-2 bg-[#ffffffa9] fill-red-500 absolute top-2 right-2 cursor-pointer border-2 border-[#10305A] rounded-full"/>
                )}
            </div>
            <p className="text-black px-5  rounded-3xl w-[30%] flex  items-center justify-center">Formateur</p>
            <div className="progress p-2 text-black bg-[ # 0410fb7e] border border-[#00000032] w-fit rounded-3xl flex flex-row gap-2"><Loader/>In progress</div>
            <h5 className="font-semibold">Ml for begginers</h5>
            <div className="flex flex-row gap-4 items-center">
                <div className="completion-wrapper h-4 flex-1 bg-[#E1E2F3] rounded-3xl overflow-hidden">
                    <div className="completion w-[60%] rounded-3xl h-full bg-[#2f2bff] ">

                    </div>
                </div>
                <p>60%</p>

            </div>

            <button className=" main-btn text-[12px]  px-2 py-3 flex user-btn gap-2 items-center justify-center  squircle sm:px-12 sm:py-3 sm:text-[16px] md:px-8 md:py-3 md:text-[18px] lg:px-12 lg:py-2 lg:text-[18px]">Continue watching <ArrowRight /></button>

        </div>
        <div className="user-card px-2 min-w-80   lg:min-w-90 py-2 pb-4 border-2 bg-[#F8FAFF] border-[#E1E2F3] rounded-3xl   flex flex-col gap-4">
                <div className="thumbnail relative rounded-3xl">

                </div>
                <p className="text-black px-5  rounded-3xl w-[30%] flex  items-center justify-center">Formateur</p>
                <div className="progress p-2 text-black bg-[# 04fb637e] border-[#00000032] border w-fit rounded-3xl flex flex-row gap-2"><CircleCheck className="fill-green-400"/>Completed</div>
                <h5 className="font-semibold">Ml for begginers</h5>
                <div className="flex flex-row gap-4 items-center">
                    <div className="completion-wrapper h-4 flex-1 bg-[#E1E2F3] rounded-3xl overflow-hidden">
                        <div className="completion w-[100%] rounded-3xl h-full bg-green-400 ">

                        </div>
                    </div>
                    <p>100%</p>

                </div>

                <button className=" main-btn text-[12px] completed  px-2 py-3 flex  gap-2 items-center justify-center  squircle sm:px-12 sm:py-3 sm:text-[16px] md:px-12 md:py-3 md:text-[18px] lg:px-12 lg:py-2 lg:text-[18px]"> Rewatch <RotateCcw /></button>

            </div></>
    )
}

export default UserCard