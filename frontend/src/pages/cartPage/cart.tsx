import Header from "../../components/header/header";
import CartItem from "../../components/cartItem/cartItem"
import "./cart.css"

import Footer from "@/components/footer/footer";
import PayementInfo from "@/components/payementInfo/payementInfo";

import { useEffect, useState } from "react";
import type { Cart } from "@/types/cart";
import { useNavigate } from "react-router-dom";

function CartPage(){

    const [cart,setCart] = useState<Cart[]>([])
    
    const navigate = useNavigate()
    async function getAllCart(){
        const res = await fetch(`${import.meta.env.VITE_API_CART_URL}/getAllCart`,{
            method:"GET",
            headers:{"Content-Type":"application/json"},
            credentials:"include"
        })

        const data = await res.json()
        console.log(data)
        if(data.success){
            
            setCart(data.cart)
            
        }

    }

    useEffect(()=>{
        getAllCart()
    },[])
    
    return(
        <><Header />
        <main className="bg-[#dbebff]  relative h-fit sm:p-4 sm:pb-20 pb-20">

            <div className="cart-wrapper gap-20 flex flex-col justify-center">
                <h2 className="text-center">Cart</h2>
                {cart.length>0 ?(
                    <div className="flex flex-col lg:flex-row gap-4 justify-between">
                    <div className="left p-3 w-full lg:w-[70%] flex flex-col gap-5 bg-white rounded-3xl shadow-lg">

                        {cart.map(c=>{
                            return <CartItem onClick={(id)=>setCart(cart.filter(l=>l.courseId!==id))} key={c.courseId} courseId={c.courseId} course={c.course} />
                        })

                        }
                    </div>
                    <PayementInfo cartId={cart} items={cart.length} total={cart.reduce((acc:number,curr:Cart)=>{
                return curr.course.price!+acc
            },0)} text="Checkout"/>
                </div> 
                ):(
                    <div className="flex flex-col gap-2 items-center">
                        <h3>No items in cart!</h3>
                        <p onClick={()=>navigate("/courses")} style={{textDecoration:"underline"}} className="font-medium  text-[blue] cursor-pointer">Go to courses</p>
                    </div>
                )}
               
            </div>
            
        </main><Footer/></>
    )
}

export default CartPage