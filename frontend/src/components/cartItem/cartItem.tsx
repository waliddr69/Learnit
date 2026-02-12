import { Star, Trash } from "lucide-react";
import "./cartItem.css"


import type { Courses } from "@/types/courses";

type CartItemProps = {
  course: Courses
  courseId: number
  onClick: (id:number) => void
}
function CartItem({ course, courseId, onClick }: CartItemProps){
    function deleteCart(){
            fetch(import.meta.env.VITE_API_CART_URL + "/deleteCart",{
                method:"DELETE",
                credentials:"include",
                headers:{"Content-Type":"application/json"},
                body:JSON.stringify({id:courseId})
            })
            .then(res=>res.json())
            .then(res=>{
                if(res.success){
                    onClick(courseId)
                }

            })
        }
    
    return(
        <div className="cart-item border-b sm:p-2 flex justify-between sm:pr-3 pb-2 h-30 sm:h-35 md:h-40 flex-row">
            <div className="flex flex-row h-full shrink-0 flex-1  gap-2 sm:gap-10">
                <div className="cart-img w-[80%] sm:w-[30%] p-3 h-full" style={{
                backgroundImage: course.photo
                    ? `url(${import.meta.env.VITE_API_FILE_URL}/${course.photo})`
                    : 'none'
                }}>

            </div>
            <div className="flex flex-col justify-between">
                <p className="font-medium text-lg sm:text-2xl wrap-break-word">{course.title}</p>
                <div className=" flex items-center flex-row gap-2">
                    
                    <p className="text-[#333333] hidden sm:block">{course.creator?.fname} {course.creator?.lname}</p>
                    <p className="text-[#333333] block sm:hidden">By {course.creator?.fname} {course.creator?.lname}</p>
                </div>
                <div className="rating flex flex-row items-center gap-1">
                    <p className="text-[#333333] sm:text-md md:text-lg">{course.rating}</p>
                    {Array.from({length:5}).map((_v,i)=>{
                                    if(i+1<=Math.round(course?.rating!)){
                                        return (
                                            <Star className="fill-yellow-400" stroke="none"/>
                                        )
                                    }else{
                                        return(
                                            <Star className="stroke-2 stroke-yellow-400"/>
                                        )
                                    }

                                })}
                    <p className="text-[#333333]">(856)</p>
                </div>
            </div>
            
            </div>
            <div className="flex flex-col justify-around">
                <p className="font-semibold text-lg sm:text-2xl">{course.price==0?"Free":course.price+"DA"} </p>
                <button onClick={deleteCart} className="remove cursor-pointer hover:bg-red-300 hover:text-red-600 transition-all p-2 rounded-3xl flex flex-row gap-2 text-blue-400"><Trash/>Remove</button>

            </div>
            
        </div>
    )
}

export default CartItem