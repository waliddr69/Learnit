import Header from "../../components/header/header";
import CartItem from "../../components/cartItem/cartItem"
import "./cart.css"
import { Shield } from 'lucide-react';
import Footer from "@/components/footer/footer";
import PayementInfo from "@/components/payementInfo/payementInfo";
import { useNavigate } from "react-router-dom";
function CartPage(){

    
    return(
        <><Header /><main className="bg-[#dbebff]  relative h-fit sm:p-4 sm:pb-20 pb-20">

            <div className="cart-wrapper gap-20 flex flex-col justify-center">
                <h2 className="text-center">Cart</h2>
                <div className="flex flex-col lg:flex-row gap-4 justify-between">
                    <div className="left p-3 w-full lg:w-[70%] flex flex-col gap-5 bg-white rounded-3xl shadow-lg">

                        <CartItem />
                        <CartItem />
                        <CartItem />
                        <CartItem />
                    </div>
                    <PayementInfo items={4} total={12000} text="Checkout"/>
                </div>
            </div>
            
        </main><Footer/></>
    )
}

export default CartPage