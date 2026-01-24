import Footer from "@/components/footer/footer";
import Header from "@/components/header/header";
import PayementInfo from "@/components/payementInfo/payementInfo";
import { CreditCard, Eye, EyeClosed, Mail, Phone } from "lucide-react";
import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

function Payement(){
    
      const [disabled, setDisabled] = useState(true);
      const emailRef = useRef<HTMLInputElement>(null);
      const phoneRef = useRef<HTMLInputElement>(null);
      const firstRef = useRef<HTMLInputElement>(null);
      const lastRef = useRef<HTMLInputElement>(null);
      function handleDisabled() {
        if (
          phoneRef.current &&
          emailRef.current &&
          firstRef.current &&
          lastRef.current &&
          phoneRef.current.value.length > 0 &&
          emailRef.current.value.length > 0 &&
          firstRef.current.value.length > 0 &&
          lastRef.current.value.length > 0 
    
        ) {
          setDisabled(false);
        } else {
          setDisabled(true);
        }
      }
      const navigate = useNavigate();
    return(
        <><Header /><main className="bg-[#dbebff]  relative h-fit sm:p-4 sm:pb-20 pb-20">

            <div className="cart-wrapper gap-20 flex flex-col justify-center">
                <h2 className="text-center">Payement</h2>
                <div className="flex flex-col lg:flex-row gap-4 justify-between">
                    <div className="left p-3 py-12 w-full lg:w-[70%] flex flex-col gap-5 bg-white rounded-3xl shadow-lg">
                        <form action="" className="flex flex-col gap-8 items-center ">
            <div className="w-[80%]  flex gap-6">
                <div className="flex flex-col gap-2 w-1/2">
                    <label className="font-medium text-[#333333]">First name</label>
                    <input ref={firstRef} type="text" placeholder="Exp: Dari" className="border fullname w-full border-[#cccee7de]  rounded-3xl   p-3" />
                </div>

                <div className="flex flex-col gap-2 w-1/2">
                    <label className="font-medium text-[#333333]">Last name</label>
                    <input ref={lastRef} placeholder="Exp: Walid" type="text" className="border fullname w-full border-[#cccee7de]  rounded-3xl   p-3" />
                </div>
                </div>
            <div className="w-[80%] flex flex-col gap-2">
              <label htmlFor="" className="font-medium text-[#333333]">
                Email
              </label>
              <div className="email  flex items-center border-[#cccee7de] rounded-3xl border justify-between p-3">
                <input
                  onChange={handleDisabled}
                  ref={emailRef}
                  type="email"
                  name="email"
                  className="flex-1"
                  placeholder="you@example.com"
                />
                <Mail color="#9CA3AF" />
              </div>
            </div>
            <div className="w-[80%] flex flex-col gap-2">
              <label htmlFor="" className="font-medium text-[#333333]">Phone</label>
              <div className="phone  flex items-center border-[#cccee7de] border rounded-3xl  justify-between p-3">
                <input
                  onChange={handleDisabled}
                  ref={phoneRef}
                  type="tel"
                  name="tel"
                  className="flex-1"
                  placeholder="0798492603"
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
                    <PayementInfo text="Pay" items={4} total={12000}/>
                </div>
            </div>
            
        </main><Footer/></>
    )
}

export default Payement