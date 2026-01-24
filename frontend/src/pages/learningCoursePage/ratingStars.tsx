import { Star } from "lucide-react";
import { useState } from "react";

function RatingStars(){
    const [hover,setHover] = useState(0)
    const [rating, setRating] = useState(0);
    return(
        <><div onMouseLeave={() => setHover(0)} className="stars w-full  gap-2 flex  justify-center">
            {[...Array(5)].map((_, id) => (
                <Star onClick={() => setRating(id + 1)} onMouseOver={() => setHover(id + 1)} className={`w-8 h-8 ${(hover || rating) >= id + 1 ? "fill-yellow-400" : ""} text-yellow-400 `} />
            ))}


        </div><button className={`cta main-btn text-[12px] px-2 py-3 ${rating > 0 ? "block" : "hidden"}  squircle sm:px-12 sm:py-3 sm:text-[16px] md:px-12 md:py-3 md:text-[18px] lg:px-12 lg:py-3 lg:text-[18px]`}>Save and Send</button></>
    )
}

export default RatingStars