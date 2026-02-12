import { ArrowLeft, Send } from "lucide-react";
import { useEffect, useRef, useState, type FormEvent } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { addMessage, getMessages } from "@/services/messagesService";

import { useAuth } from "@/context/authContext";
import type { User } from "@/types/users";
import type { Messages } from "@/types/messages";

function MessageView(){
    const navigate = useNavigate()
    const location = useLocation()
    const id = location.pathname.split("/")[3]
    const socket = new WebSocket(import.meta.env.VITE_API_WEBSOCKET_URL)
    const [convo,setConvo] = useState<Messages[]>([])
    const [otherUser,setOtherUser] = useState<User>()
    const content = useRef<HTMLInputElement|null>(null)
    const messagesContainer = useRef<HTMLDivElement|null>(null)
    const getAll = async()=>{
        const res = await getMessages(Number(id))
        if(res.success){
            setConvo(res.messages[0].messages)
            setOtherUser(user?.id==res.messages[0].user1Id ? res.messages[0]?.receiver:res.messages[0]?.sender)
        }
    }
    useEffect(()=>{
        getAll()
        socket.onopen = ()=>{
            
            socket.send(JSON.stringify({
                type:"register",
                userId:user?.id,
                
            }))
        }

        socket.onmessage = (event)=>{
            const data = JSON.parse(event.data);
            
            if(data.type=="receive"){
                
                setConvo(prev => [
                ...prev,
                {
                    sender: otherUser!,
                    senderId: data?.from!,
                    content: data.message
                }
                ])
            }
        }
        
    },[])

    async function onAddMessage(e:FormEvent){
        e.preventDefault()
        const res = await addMessage(Number(id),user?.id!,content.current?.value!)
        if(res.success){
            setConvo(p=>[...p,{sender:user!,senderId:user?.id!,content:content.current?.value!}])
            socket.send(JSON.stringify({
                type:"message",
                message:content.current?.value,
                to:otherUser?.id,
                from:user?.id
            }))
            
        }
        
        
        
    }
    useEffect(() => {
    if(messagesContainer.current && content.current){
        messagesContainer.current.scrollTo({
            top: messagesContainer.current.scrollHeight,
            behavior: 'smooth'
        });
        content.current.value = ""
    }
    }, [convo])
    const {user} = useAuth()
    return(
        <div className={` messages flex items-center flex-col gap-12`}>
        <div ref={messagesContainer} className={`flex w-full sm:w-[70%]  messages-container relative rounded-3xl message-view overflow-y-auto max-h-dvh  bg-[#EBEBEB]   flex-col gap-4 `}>
                <div className="sender-info sticky top-0 bg-white p-4 items-center flex flex-row gap-4">
                    
                    <ArrowLeft className="cursor-pointer" onClick={()=>navigate(-1)}/>
                   <div className="sender  w-15 h-15  text-white flex justify-center font-bold items-center rounded-full">
                            {otherUser?.initials}
                    </div> 
                    <h6>{otherUser?.fname} {otherUser?.lname}</h6>
                </div>
                <div  className="messages flex flex-col gap-5 p-8">
                    {convo?.map(m=>{
                        if(m.senderId==otherUser?.id){
                            return <div className="message flex flex-row  gap-2 w-full">
                        <div className="sender w-15 h-15  text-white flex justify-center font-bold items-center rounded-full">
                                {otherUser.initials}
                        </div>
                        <div className="message-content-receiver p-3 bg-[#f6f6f6] flex justify-center items-center rounded-top-3xl max-w-[50%]">
                            
                            <p className="break-all">{m.content}</p>
                        </div>
                    </div>
                        }else{
                            return <div className="message flex flex-row justify-end gap-2 w-full">
                    
                    <div className="message-content-sender max-w-[50%] h-fit p-3 bg-[#f6f6f6] flex justify-center items-center rounded-top-3xl ">
                        
                        <p className="wrap-break-word break-all">{m.content}</p>
                    </div>
                </div>
                        }
                    })}
                    
                
                </div>
                <form onSubmit={onAddMessage} className="sticky bottom-0 bg-[white] flex justify-center pb-2 pt-2  w-full">
                    <div className="form-group flex  items-center w-[90%] justify-center  border border-[#10305A]  rounded-3xl">
                      <input type="text" placeholder="Type a message ..." ref={content} name="message" className="flex-1 pl-2 py-6"  /> 
                       <button type="submit"><Send className="cursor-pointer w-[40px] sm:mr-2"/></button>
                    </div>
                    
                </form>
                
            </div>
            </div>
    )
}

export default MessageView