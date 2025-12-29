import logo from "../../assets/images/logo.svg"
import content from "../../assets/images/3dcontent.png"
import message from "../../assets/images/message (2).png"
import { Outlet, useNavigate } from "react-router-dom"
import { Youtube } from 'lucide-react';
import { MessagesSquare } from 'lucide-react';
import "./dashboard.css"
import { useState } from "react"
import { LayoutDashboard } from 'lucide-react';
import { Menu } from 'lucide-react';
import { X } from "lucide-react";
function DashboardTeach(){
    const navigate = useNavigate();
    const [selected, setSelected] = useState("Content");
    const [menu, showMenu] = useState(false);
    
    return(
        <main className=" flex bg-[#F7F7F7] flex-row  lg:p-0    h-fit  ">
            
            <div className="menu pt-12 p-2 bg-black lg:hidden">
                <Menu color="white" onClick={()=>showMenu(true)} size={30} />
            </div>
            
           <div className={`flex ${menu ? "translate-x-0" : "-translate-x-full"} w-[70%] md:w-[35%] items-center lg:hidden transition-all fixed z-50 h-full bg-[#0C2443] flex-col gap-20  p-8`}>
                <div className="flex justify-end w-full">
                    <X color="white" className="ml-auto" onClick={()=>showMenu(false)} size={30} />
                </div>
                <img src={logo} alt="logo" width={50}/>
                <div className="flex flex-col gap-8 w-full justify-center px-1 items-center">
                    <div className={selected === "Content" ? "flex gap-2 items-center w-full justify-center rounded-3xl cursor-pointer text-white font-semibold  p-4 bg-[#006EFD]" : "flex gap-2 text-white items-center w-full justify-center rounded-3xl transition-all  cursor-pointer"} onClick={() => navigate("/teach/content")}><Youtube/><p>Content</p></div>
                    <div className={selected === "Messages" ? "flex gap-2 items-center w-full justify-center rounded-3xl cursor-pointer text-white font-semibold  p-4 bg-[#006EFD]" : "flex gap-2 text-white items-center w-full justify-center rounded-3xl transition-all  cursor-pointer"} onClick={() => navigate("/teach/messages")}><MessagesSquare/><p>Messages</p></div>
                    <div className={selected === "Dashboard" ? "flex gap-2 items-center w-full justify-center rounded-3xl cursor-pointer text-white font-semibold  p-4 bg-[#006EFD]" : "flex gap-2 text-white items-center w-full justify-center rounded-3xl transition-all  cursor-pointer"} onClick={() => navigate("/teach/dashboard")}><LayoutDashboard/><p>Dashboard</p></div>
                </div>
            </div>
            
           <nav className="  flex-col  gap-20 w-[20%] items-center  pt-6  nav hidden lg:flex">
            <div className="flex flex-col w-full gap-20 items-center sticky top-6">
               <img src={logo} alt="logo" width={50}/>
            <div className="parts flex  flex-col gap-8 w-full justify-center px-1 items-center">
                <div className={selected === "Content" ? "flex gap-2 items-center w-full justify-center rounded-3xl cursor-pointer text-white font-semibold  p-4 bg-[#006EFD]" : "flex gap-2 items-center w-full justify-center rounded-3xl transition-all  cursor-pointer"} onClick={() => navigate("/teach/content")}><Youtube/><p>Content</p></div>
                <div className={selected === "Messages" ? "flex gap-2 items-center w-full justify-center rounded-3xl cursor-pointer text-white font-semibold  p-4 bg-[#006EFD]" : "flex gap-2 items-center w-full justify-center rounded-3xl transition-all  cursor-pointer"} onClick={() => navigate("/teach/messages")}><MessagesSquare/><p>Messages</p></div>
                <div className={selected === "Dashboard" ? "flex gap-2 items-center w-full justify-center rounded-3xl cursor-pointer text-white font-semibold  p-4 bg-[#006EFD]" : "flex gap-2 items-center w-full justify-center rounded-3xl transition-all  cursor-pointer"} onClick={() => navigate("/teach/dashboard")}><LayoutDashboard/><p>Dashboard</p></div>
            </div> 
            </div>
            
        </nav> 
        <div className="flex-1 flex flex-col gap-8 bg-[#F7F7F7] p-8 border-[#E1E2F3] h-full">
            <div className="header flex justify-between">
                <h4 className="welcome">Welcome back, <span>Walid !</span></h4>
                <div className="account">
                    <p className="font-bold">DW</p>
                </div>
            </div>

            <div className="components">
                <Outlet/>
            </div>
            
        </div>
        {menu && <div className="overlay " onClick={()=>showMenu(false)}></div>}
        
        </main>
        
    )
}
        
export default DashboardTeach