import { useRef } from "react";
import "./popper.css"
import { useNavigate } from "react-router-dom";

type props = {
    name:string,
    Icon?: React.ComponentType;
    to:string
}

function PopperItem({name,Icon,to}:props){
    const div = useRef<HTMLDivElement|null>(null)
    const navigate = useNavigate()
    return(
        
                <div ref={div} onClick={()=>{
                    div.current?.classList.add("click");
                    navigate(to)
                    }} className="content-item cursor-pointer p-2 py-3 text-[#04307d] hover:bg-[#042662] hover:text-white transition-all p-1 flex flex-row gap-1 items-center">
                    {Icon && <Icon/>} <p>{name}</p>
                </div>
           
    )
}

export default PopperItem