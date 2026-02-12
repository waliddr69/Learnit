import Footer from "@/components/footer/footer";
import Header from "@/components/header/header";
import PayementInfo from "@/components/payementInfo/payementInfo";
import Alert from "@/components/alertMsg/alert";
import { CreditCard, Mail, Phone } from "lucide-react";
import { useEffect, useRef, useState, type FormEvent } from "react";
import {  useNavigate, useSearchParams } from "react-router-dom";
import { useCheckout } from "@/context/checkoutContext";


function Payement(){

  const navigate = useNavigate()
  const [Message,setMessage] = useState("")
  async function handleSubmit(e:FormEvent<HTMLFormElement>){
    e.preventDefault()
    

    const req = await fetch(import.meta.env.VITE_API_PAY_URL+"/create",{
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify({
        
        tel: phoneRef.current!.value,
        price,
        courses:ids?ids.split(",").map(c=>Number(c)):Number(id)
      })
    })

    const res = await req.json()
    console.log(res)
    if(res.response){
      navigate(res.checkout_url)
    }else{
      setMessage(res.message)
    }

    
  }

  const {allowed,resetCheckout} = useCheckout()

  
  
  const [searchParams] = useSearchParams();
  
  useEffect(()=>{
    if (!allowed) {
    navigate("/cart");
    return;
  }

  
  resetCheckout();
    
  },[searchParams,navigate])

  const price = searchParams.get("price") || 0
  const items = searchParams.get("items") || 0
  const ids= searchParams.get("ids") || null
  const id= searchParams.get("id") || null
      const [disabled, setDisabled] = useState(true);
      
      const phoneRef = useRef<HTMLInputElement>(null);
      
      function handleDisabled() {
        if (
          phoneRef.current &&
          
          phoneRef.current.value.length > 0 
          
    
        ) {
          setDisabled(false);
        } else {
          setDisabled(true);
        }
      }
      
    return(
        <><Header /><main className="bg-[#dbebff]  relative h-fit sm:p-4 sm:pb-20 pb-20">

            <div className="cart-wrapper gap-20 flex flex-col justify-center">
                <h2 className="text-center">Payement</h2>
                <div className="flex flex-col lg:flex-row gap-4 justify-between">
                    <div className="left p-3 py-12 w-full lg:w-[70%] flex flex-col gap-5 bg-white rounded-3xl shadow-lg">
                        <form onSubmit={handleSubmit} className="flex flex-col gap-8 items-center ">
                      <Alert message={Message} color="red"/>
            
            <div className="w-[80%] flex flex-col gap-2">
              <label htmlFor="" className="font-medium text-[#333333]">Phone</label>
              <div className="phone  flex items-center border-[#cccee7de] border rounded-3xl  justify-between p-3">
                <input
                  onChange={handleDisabled}
                  ref={phoneRef}
                  type="tel"
                  name="tel"
                  className="flex-1"
                  placeholder="Exp: 0798492603"
                />
                <Phone color="#9CA3AF" />
              </div>
            </div>

            <button
              type="submit"
              disabled={disabled}
              className={` ${
                disabled ? "disabled" : "cta"
              } w-[80%] flex items-center justify-center gap-2  text-[12px] px-2 py-3 shadow-lg  squircle sm:px-12 sm:py-3 sm:text-[16px] md:px-12 md:py-3 md:text-[18px] lg:px-12 lg:py-3 lg:text-[18px] `}
            
            >
              Pay <CreditCard/>
            </button>
            
          </form>
                        
                  </div>
                    <PayementInfo text="Pay" items={Number(items)} total={Number(price)}/>
                </div>
            </div>
            
        </main><Footer/></>
    )
}

export default Payement