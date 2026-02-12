import { useRef } from "react";
import "./popper.css"
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/context/authContext";

type props = {
    name:string,
    Icon?: React.ComponentType;
    to:string,
    
}

function PopperItem({name,Icon,to}:props){
    const {refreshUser} = useAuth()
    function onClick(){
        fetch(import.meta.env.VITE_API_USER_URL + "/logout", {
            method:"POST",
            headers:{"Content-Type":"application/json"},
            credentials:"include",
        })
        .then((res)=>res.json())
        .then(async res=>{
            console.log(res)
            if(res.success){
                await refreshUser()
                navigate("/")
            }       
        } )

    }
    const div = useRef<HTMLDivElement|null>(null)
    const navigate = useNavigate()
    function handleClick() {
    div.current?.classList.add("click");

    if (name === "Logout") {
      onClick();          
    } else {
      navigate(to);       
    }
  }
    return(
        
                <div ref={div} onClick={handleClick} className="content-item cursor-pointer p-2 py-3 text-[#04307d] hover:bg-[#042662] hover:text-white transition-all p-1 flex flex-row gap-1 items-center">
                    {Icon && <Icon/>} <p>{name}</p>
                </div>
           
    )
}

export default PopperItem