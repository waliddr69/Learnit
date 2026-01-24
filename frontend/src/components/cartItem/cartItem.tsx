import { Star, Trash } from "lucide-react";
import "./cartItem.css"
function CartItem(){
    return(
        <div className="cart-item border-b sm:p-2 flex justify-between sm:pr-3 pb-2 h-30 sm:h-35 md:h-40 flex-row">
            <div className="flex flex-row h-full shrink-0 flex-1  gap-2 sm:gap-10">
                <div className="cart-img w-[80%] sm:w-[30%] p-3 h-full">

            </div>
            <div className="flex flex-col justify-between">
                <p className="font-medium text-lg sm:text-2xl wrap-break-word">ML for begginers</p>
                <div className=" flex items-center flex-row gap-2">
                    <div className="photo bg-black hidden sm:block h-5 w-6 md:h-12 md:w-13 rounded-3xl"></div>
                    <p className="text-[#333333] hidden sm:block">Formateur</p>
                    <p className="text-[#333333] block sm:hidden">By Formateur</p>
                </div>
                <div className="rating flex flex-row items-center gap-1">
                    <p className="text-[#333333] sm:text-md md:text-lg">4.6</p>
                    <Star className="stroke-0 w-4 sm:w-6 fill-yellow-400"/>
                    <Star className="stroke-0 w-4 sm:w-6 fill-yellow-400"/>
                    <Star className="stroke-0 w-4 sm:w-6 fill-yellow-400"/>
                    <Star className="stroke-0 w-4 sm:w-6 fill-yellow-400"/>
                    <Star className="stroke-yellow-400 sm:w-6 w-4"/>
                    <p className="text-[#333333]">(856)</p>
                </div>
            </div>
            
            </div>
            <div className="flex flex-col justify-around">
                <p className="font-semibold text-lg sm:text-2xl">6000 DA</p>
                <button className="remove cursor-pointer hover:bg-red-300 hover:text-red-600 transition-all p-2 rounded-3xl flex flex-row gap-2 text-blue-400"><Trash/>Remove</button>

            </div>
            
        </div>
    )
}

export default CartItem