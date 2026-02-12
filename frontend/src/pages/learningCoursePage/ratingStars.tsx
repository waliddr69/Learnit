import { addReview } from "@/services/reviewsC";
import { addReviewI } from "@/services/reviewsI";
import { Star } from "lucide-react";
import { useState } from "react";


type params = {
    type:string
    courseId?:number
    creatorId?:number
    onClick:()=>void
}
function RatingStars({type,courseId,onClick,creatorId}:params){
    async function onSubmit(){
        if(type=="course"){
            const res = await addReview(courseId!,rating)
            if(res.success){
                onClick()
                return
            }
        }
        if(type=="instructor"){
            const res = await addReviewI(creatorId!,rating)
            console.log(res)
            if(res.success){
                onClick()
                return
            }
        }
    }
    const [hover,setHover] = useState(0)
    const [rating, setRating] = useState(0);
    return(
        <><div onMouseLeave={() => setHover(0)} className="stars w-full  gap-2 flex  justify-center">
            {[...Array(5)].map((_, id) => (
                <Star onClick={() => setRating(id + 1)} onMouseOver={() => setHover(id + 1)} className={`w-8 h-8 ${(hover || rating) >= id + 1 ? "fill-yellow-400" : ""} text-yellow-400 `} />
            ))}


        </div><button onClick={onSubmit} className={`cta main-btn text-[12px] px-2 py-3 ${rating > 0 ? "block" : "hidden"}  squircle sm:px-12 sm:py-3 sm:text-[16px] md:px-12 md:py-3 md:text-[18px] lg:px-12 lg:py-3 lg:text-[18px]`}>Save and Send</button></>
    )
}

export default RatingStars