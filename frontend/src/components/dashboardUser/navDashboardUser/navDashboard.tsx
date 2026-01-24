import { Link, useLocation, useNavigate } from "react-router-dom";
import {  BookOpenText, BookSearch, Heart, LogOut, MessagesSquare, Presentation, ShoppingCart, SquareLibrary } from 'lucide-react';
import "./navDashboard.css"
import { Target } from 'lucide-react';
import { useEffect, useRef, useState } from "react";
import persona from "../../../assets/images/undraw_online-learning_tgmv.svg"
import PopperItem from "@/components/menuPopper/popper";
function NavDashboard(){
    const [selected, setselected] = useState("")
    const location = useLocation()
    
    useEffect(()=>{
        const path = location.pathname.split("/")[2]
        console.log(path)
        if(path=="messages"){
            setselected("Messages")
        }else if(path=="favorite"){
            setselected("Favorite")
        }else {
            setselected("Your learning")
        }
    },[])
    const navigate = useNavigate()
    const popperMenu = useRef<HTMLDivElement|null>(null)
    const popper = [
        
        {icon:BookOpenText,name:"Courses",to:"/courses"},
        {icon:Presentation,name:"Instructor dashboard",to:"/teach/content"},
        {icon:ShoppingCart,name:"Cart",to:"/cart"},
        {icon:LogOut,name:"Logout",to:"/"}
    ]
    return(
        <><header className="dashboard-header sticky top-0">
            <nav className="h-full">
                <ul className="dashboard-user-ul">
                    <li onClick={()=>{setselected("Your learning");navigate('/dashboard/yourLearning')}} className={selected === "Your learning" ? "active stroked" : ""}><SquareLibrary /><Link to="/dashboard/yourLearning" >Your learning</Link></li>
                    <li className={selected === "Favorite" ? "active filled" : ""} onClick={()=>{setselected("Favorite");navigate('/dashboard/favorite')}}><Heart /><Link to="/dashboard/favorite">Favorite</Link></li>
                    <li className={selected === "Messages" ? "active filled" : ""} onClick={()=>{setselected("Messages");navigate("/dashboard/messages")}}><MessagesSquare /><Link to="/dashboard/messages">Messages</Link></li>
                </ul>
            </nav>
        </header>
        <div className="p-4">
            <div className="welcome p-4 ">
                    <div className="header flex justify-between">
                    <h4 className="welcome">We are happy to see you back, <span>Walid !</span></h4>
                    <div tabIndex={1} ref={popperMenu} onFocus={()=>popperMenu.current?.classList.add("clickP")} onBlur={()=>popperMenu.current?.classList.remove("clickP")} className="account relative group cursor-pointer">
                        <p className="font-bold  account">DW</p>
                        <div className="absolute top-full h-3 w-full"></div>
                        
                        <div   className={`top-full border-2 border-[#dbebff] z-1000 mt-2 transition-all right-full translate-x-10 popper shadow-lg invisible opacity-0 group-hover:opacity-100 group-hover:visible cursor-auto  pb-4 w-[250px] flex flex-col gap-4 absolute rounded-3xl bg-white`}>
                            <p className="pb-2 text-lg mt-4 mx-4 font-semibold text-black border-b">Dari Walid</p>
                            <div className="content flex flex-col">
                                {popper.map(i=>{
                                    return <PopperItem to={i.to} name={i.name} Icon={i.icon}/>
                                })}
                            </div>
                        </div>
                    </div>
            </div>
        </div>
        <div>

        </div>
        <div className="flex relative flex-col-reverse gap-12 sm:flex-row items-center   justify-between gap-2 rounded-3xl browse-course  p-4">
            <div className="flex flex-col gap-4">
               <h5 className="font-semibold flex flex-row gap-1 items-center  text-[#ffffff]"><Target/> Want to learn more courses ?</h5>
                <Link className="font-bold bg-white rounded-3xl   w-fit px-2 py-2 text-blue-500 flex flex-row gap-2" style={{textDecoration:"underline"}} to={"/courses"}>Go to see courses <BookSearch/> </Link> 
            </div>
            <img src={persona} alt="learn" width={200} />
        </div>
        </div>
        
        </>
    )
}
export default NavDashboard;