
import Message from "../../message/message";
import "./messages.css"

import { useNavigate } from "react-router-dom";

function Messages(){
    
    const navigate = useNavigate()

    return(
        <div className={` messages sm:p-4 flex items-center flex-col gap-12`}>
            <h3 className="self-start ml-4 sm:ml-0">Messages</h3>
            <div className={`flex messages flex flex-col gap-4 w-full`}>
                <Message onClick={()=>navigate("id")}/>
                <Message onClick={()=>navigate("/messages/id")}/>
                <Message onClick={()=>navigate("/messages/id")}/>
                <Message onClick={()=>navigate("/messages/id")}/>
            </div>
            
        </div>
    )
}
export default Messages;