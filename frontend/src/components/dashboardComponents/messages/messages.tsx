
import { useEffect, useState } from "react";
import Message from "../../message/message";
import "./messages.css"

import { useNavigate } from "react-router-dom";
import type { Messages } from "@/types/messages";
import { getInbox, getMessages } from "@/services/messagesService";

import type { User } from "@/types/users";
type params={
    conversationId: number,
    other:User,
    lastMessage: Messages
}
function Messages(){
    
    const [messages,setMessages] = useState<params[]>([])
    
    const navigate = useNavigate()
    async function getAll(){
        const res = await getInbox()
        console.log(res)
        if(res.success){
            
            setMessages(res.groupC)
        }
    }

    useEffect(()=>{
        getAll()
    },[])
    

    return(
        <div className={` messages sm:p-4 flex items-center flex-col gap-12`}>
            <h3 className="self-start ml-4 sm:ml-0">Inbox</h3>
            <div className={`flex messages flex flex-col gap-4 w-full`}>
                {messages.length>0 || !messages ? (
                    messages.map(m=>{
                        return <Message  user={m.other} onClick={() => navigate("/dashboard/messages/" + (m.conversationId))} lastMessage={m.lastMessage.content}/>
                    })
                ):(
                    <h4 className="text-center font-bold">No messages yet!</h4>
                )}
                
            </div>
            
        </div>
    )
}
export default Messages;