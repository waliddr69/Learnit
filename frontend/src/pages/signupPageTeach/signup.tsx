import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./signup.css"
import logo from "../../assets/images/full_logo.svg"
import { Eye, EyeClosed, Mail } from "lucide-react";
import { Airplay } from 'lucide-react';
function SignupTeach(){
    const [visible, setVisible] = useState(false);
  const [disabled, setDisabled] = useState(true);
  const emailRef = useRef<HTMLInputElement>(null);
  const passRef = useRef<HTMLInputElement>(null);
  const firstRef = useRef<HTMLInputElement>(null);
  const lastRef = useRef<HTMLInputElement>(null);
  function handleDisabled() {
    if (
      passRef.current &&
      emailRef.current &&
      firstRef.current &&
      lastRef.current &&
      passRef.current.value.length > 0 &&
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
        <>
        <img src={logo} alt="logo" onClick={()=>navigate("/")} className="  w-34 h-auto sm:w-38 md:w-48 lg:w-68 pt-10 pl-10 cursor-pointer" />
      <main className="h-full pt-10 w-full flex justify-center">
        <div className="signup  h-fit bg-[#F7F7F7] border-[#E1E2F3] justify-start py-10 border-2 flex flex-row gap-10 rounded-3xl w-[70%] relative z-10 shadow-lg">
            <div className="left flex flex-col gap-6 w-full lg:w-1/2">
                <h2 className="text-center auth-heading  flex flex-col">
             <span>Hii👋</span><span>Sign up to start your teaching journey</span>
          </h2>
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
                <Mail />
              </div>
            </div>
            <div className="w-[80%] flex flex-col gap-2">
              <label htmlFor="" className="font-medium text-[#333333]">Password</label>
              <div className="pass  flex items-center border-[#cccee7de] border rounded-3xl  justify-between p-3">
                <input
                  onChange={handleDisabled}
                  ref={passRef}
                  type={visible?"text":"password"}
                  placeholder="Enter a secure password ..."
                  name="email"
                  className=" flex-1"
                />
                {visible ? (
                  <Eye
                    className="cursor-pointer"
                    onClick={() => setVisible(false)}
                  />
                ) : (
                  <EyeClosed
                    className="cursor-pointer"
                    onClick={() => setVisible(true)}
                  />
                )}
              </div>
            </div>

            <button
              type="submit"
              disabled={disabled}
              onClick={()=>navigate("/teach/content")}
              className={` ${
                disabled ? "disabled" : "cta"
              } w-[80%]  text-[12px] px-2 py-3 shadow-lg  squircle sm:px-12 sm:py-3 sm:text-[16px] md:px-12 md:py-3 md:text-[18px] lg:px-12 lg:py-3 lg:text-[18px] `}
            >
              Sign up
            </button>
            <p>Already have an account? <span className="text-[#006EFD] cursor-pointer" onClick={()=>navigate("/teach/login")}>Log in</span></p>
          </form>
            </div>

            <div className="right hidden  lg:flex flex-col justify-between items-center border-l py-10 pl-8 border-[#0000004d]">
                <div className="flex flex-col gap-3">
                    <h6 className="flex border-l-2 pl-2  gap-2 font-bold items-center"><Airplay strokeWidth={3}/>Enroll in your favorite courses</h6>
                    <p className=" flex gap-2 pl-2 border-2 border-transparent"> <Airplay strokeWidth={3} opacity={0}/>Lorem ipsum dolor sit amet</p>
                </div>
                <div className="flex flex-col gap-3">
                    <h6 className="flex border-l-2 pl-2  gap-2 font-bold items-center"><Airplay strokeWidth={3}/>Enroll in your favorite courses</h6>
                    <p className=" flex gap-2 pl-2 border-2 border-transparent"> <Airplay strokeWidth={3} opacity={0}/>Lorem ipsum dolor sit amet</p>
                </div>
                <div className="flex flex-col gap-3">
                    <h6 className="flex border-l-2 pl-2  gap-2 font-bold items-center"><Airplay strokeWidth={3}/>Enroll in your favorite courses</h6>
                    <p className=" flex gap-2 pl-2 border-2 border-transparent"> <Airplay strokeWidth={3} opacity={0}/>Lorem ipsum dolor sit amet</p>
                </div>
                <div className="flex flex-col gap-3">
                    <h6 className="flex border-l-2 pl-2  gap-2 font-bold items-center"><Airplay strokeWidth={3}/>Enroll in your favorite courses</h6>
                    <p className=" flex gap-2 pl-2 border-2 border-transparent"> <Airplay strokeWidth={3} opacity={0}/>Lorem ipsum dolor sit amet</p>
                </div>
                
            </div>
          
        </div>
      </main>
      
        <div className="bg w-full h-full"></div>
      
      
    </>
    )
}

export default SignupTeach