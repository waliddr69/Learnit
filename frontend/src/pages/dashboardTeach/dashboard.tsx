import logo from "../../assets/images/logo.svg"

import { Outlet, useLocation, useNavigate } from "react-router-dom"
import { GraduationCap, LogOut, User, UserPen, Youtube } from 'lucide-react';
import { MessagesSquare } from 'lucide-react';
import "./dashboard.css"
import { useEffect, useRef, useState, type RefObject } from "react"
import { LayoutDashboard } from 'lucide-react';
import { Menu } from 'lucide-react';
import { X } from "lucide-react";
import Footer from "@/components/footer/footer";
import PopperItem from "@/components/menuPopper/popper";
function DashboardTeach(){
    const navigate = useNavigate();
    const [selected, setSelected] = useState("");
    const [visibility,setVisible] = useState(false)
    const [menu, showMenu] = useState(false);
    const popperMenu = useRef<HTMLDivElement|null>(null)
    const location = useLocation()
    useEffect(()=>{
        const path = location.pathname.split("/")[2]
        console.log(path)
        if(path=="content"){
            setSelected("Content")
        }else if(path=="messages"){
            setSelected("Messages")
        }else{
            setSelected("Dashboard")
        }
    },[])


    const popper = [
        {icon:UserPen,name:"account",to:"/account"},
        {icon:GraduationCap,name:"Student dashboard",to:"/dashboard/yourLearning"},
        {icon:LogOut,name:"Logout",to:"/"}
    ]
    
    return(
        <><main className=" flex bg-[#F7F7F7] flex-row   lg:p-0    h-fit  ">
            
            <div className="menu   pt-12 p-2 bg-black lg:hidden">
                <Menu color="white" onClick={() => showMenu(true)} size={30} />
            </div>

            <div className={`flex ${menu ? "translate-x-0" : "-translate-x-full"} w-[70%] md:w-[35%] items-center lg:hidden transition-all fixed z-50 h-full bg-[#0C2443] flex-col gap-20  p-8`}>
                <div className="flex justify-end w-full">
                    <X color="white" className="ml-auto" onClick={() => showMenu(false)} size={30} />
                </div>
                <img src={logo} alt="logo" width={50} />
                <div className="flex flex-col gap-8 w-full justify-center px-1 items-center">
                    <div className={selected === "Content" ? "flex gap-2 items-center w-full justify-center rounded-3xl cursor-pointer text-white font-semibold  p-4 bg-[#006EFD]" : "flex gap-2 text-white items-center w-full justify-center rounded-3xl transition-all  cursor-pointer"} onClick={() => { navigate("/teach/content"); setSelected("Content"); } }><Youtube /><p>Content</p></div>
                    <div className={selected === "Messages" ? "flex gap-2 items-center w-full justify-center rounded-3xl cursor-pointer text-white font-semibold  p-4 bg-[#006EFD]" : "flex gap-2 text-white items-center w-full justify-center rounded-3xl transition-all  cursor-pointer"} onClick={() => { navigate("/teach/messages"); setSelected("Messages"); } }><MessagesSquare /><p>Messages</p></div>
                    <div className={selected === "Dashboard" ? "flex gap-2 items-center w-full justify-center rounded-3xl cursor-pointer text-white font-semibold  p-4 bg-[#006EFD]" : "flex gap-2 text-white items-center w-full justify-center rounded-3xl transition-all  cursor-pointer"} onClick={() => { navigate("/teach/dashboard"); setSelected("Dashboard"); } }><LayoutDashboard /><p>Dashboard</p></div>
                </div>
            </div>

            <nav className="  flex-col pb-20  gap-20 w-[20%] items-center  pt-6  nav hidden lg:flex">
                <div className="flex flex-col w-full gap-20 items-center sticky top-6">
                    <img src={logo} alt="logo" width={50} />
                    <div className="parts flex  flex-col gap-8 w-full justify-center px-1 items-center">
                        <div className={selected === "Content" ? "flex gap-2 items-center w-full justify-center rounded-3xl cursor-pointer text-white font-semibold  p-4 bg-[#006EFD]" : "flex gap-2 items-center w-full justify-center rounded-3xl transition-all  cursor-pointer"} onClick={() => { navigate("/teach/content"); setSelected("Content"); } }><Youtube /><p>Content</p></div>
                        <div className={selected === "Messages" ? "flex gap-2 items-center w-full justify-center rounded-3xl cursor-pointer text-white font-semibold  p-4 bg-[#006EFD]" : "flex gap-2 items-center w-full justify-center rounded-3xl transition-all  cursor-pointer"} onClick={() => { navigate("/teach/messages"); setSelected("Messages"); } }><MessagesSquare /><p>Messages</p></div>
                        <div className={selected === "Dashboard" ? "flex gap-2 items-center w-full justify-center rounded-3xl cursor-pointer text-white font-semibold  p-4 bg-[#006EFD]" : "flex gap-2 items-center w-full justify-center rounded-3xl transition-all  cursor-pointer"} onClick={() => { navigate("/teach/dashboard"); setSelected("Dashboard"); } }><LayoutDashboard /><p>Dashboard</p></div>
                    </div>
                </div>

            </nav>
            <div className="flex-1 flex flex-col gap-8 bg-[#F7F7F7] p-8 border-[#E1E2F3] h-full">
                <div className="header flex justify-between">
                    <h4 className="welcome">Welcome back, <span>Walid !</span></h4>
                    <div tabIndex={1} ref={popperMenu} onFocus={()=>popperMenu.current?.classList.add("clickP")} onBlur={()=>popperMenu.current?.classList.remove("clickP")} className="account group relative cursor-pointer" >
                        <div className="absolute top-full h-3 w-full"></div>
                        <p className="font-bold">DW</p>
                        <div   className={`top-full border-2 border-[#dbebff] mt-2 transition-all right-full translate-x-10 popper shadow-lg invisible opacity-0 group-hover:opacity-100 group-hover:visible cursor-auto  pb-4 w-[250px] flex flex-col gap-4 absolute rounded-3xl bg-white`}>
                            <p className="pb-2 text-lg mt-4 mx-4 font-semibold text-black border-b">Dari Walid</p>
                            <div className="content flex flex-col">
                                {popper.map(i=>{
                                    return <PopperItem to={i.to} name={i.name} Icon={i.icon}/>
                                })}
                            </div>
                        </div>
                    </div>
                </div>

                <div className="components">
                    <Outlet />
                </div>

            </div>
            {menu && <div className="overlay " onClick={() => showMenu(false)}></div>}

        </main><Footer /></>
        
    )
}
        
export default DashboardTeach