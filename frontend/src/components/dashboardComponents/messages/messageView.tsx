import { ArrowLeft, Send } from "lucide-react";
import { useEffect, useRef, useState, type FormEvent } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { addConvo, addMessage, getMessages } from "@/services/messagesService";

import { useAuth } from "@/context/authContext";
import type { User } from "@/types/users";
import type { Messages } from "@/types/messages";
import gsap from "gsap";

function MessageView(){
    const navigate = useNavigate()
    const location = useLocation()
    const id = location.pathname.split("/")[3]
    const socket = new WebSocket(import.meta.env.VITE_API_WEBSOCKET_URL)
    const [convo,setConvo] = useState<Messages[]>([])
    const [otherUser,setOtherUser] = useState<User>()
    const [conversationId,setConversationId] = useState<number>(0)
    const content = useRef<HTMLInputElement|null>(null)
    const messagesContainer = useRef<HTMLDivElement|null>(null)
    const [typing,setTyping] = useState(false)
    const handleTyping = (e:any)=>{
        
        socket.send(JSON.stringify({
                type:"typing",
                message:e.target.value,
                to:otherUser?.id,
                conversationId:conversationId
                
        }))
    }
    const getAll = async()=>{
        const res = await getMessages(Number(id))
        console.log(res)
        if(res.success && res.messages){
            
            setConvo(res.messages.messages)
            setConversationId(res.messages.id)
            
            setOtherUser(user?.id==res.messages.user1Id ? res.messages?.receiver:res.messages?.sender)
        }
        if(res.success && res.user){
            
            
            setOtherUser(res.user)
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
            console.log(data)
            if(data.type=="receive" && data.conversationId==conversationId){
                
                setConvo(prev => [
                ...prev,
                {
                    sender: otherUser!,
                    senderId: data?.from!,
                    content: data.message
                }
                ])
                setTyping(false)
            }
            console.log(data,conversationId)
            if(data.type=="typing" && data.conversationId==conversationId){
                if(!data.message.trim() || data.message.trim()==""){
                    setTyping(false)
                    return
                }
                setTyping(true)
            }
        }
        
    },[conversationId])

    

    useEffect(() => {
    if (typing) {
        const tl = gsap.timeline({
            repeat:-1
        })
        tl.to(".typing", {
        y: -10,
        opacity: 1,
        stagger: {
            each: 0.15,
            from: "start"
        },
        duration: 0.3
    });

    
    tl.to(".typing", {
        y: 0,
        opacity: 0.5,
        stagger: {
            each: 0.15,
            from: "start"
        },
        duration: 0.3
    });
        }
    }, [typing]);

    async function onAddMessage(e:FormEvent){
        e.preventDefault()
        if(convo.length>0){
        
        const res = await addMessage(conversationId,user?.id!,content.current?.value!)
       
        if(res.success){
            setConvo(p=>[...p,{sender:user!,senderId:user?.id!,content:content.current?.value!}])
            socket.send(JSON.stringify({
                type:"message",
                message:content.current?.value,
                to:otherUser?.id,
                conversationId:conversationId
                
            }))
            
        }
    }else{
             const res = await addConvo(Number(id),content.current?.value!)
             console.log(res)
        if(res.success){
            setConvo(p=>[...p,{sender:user!,senderId:user?.id!,content:content.current?.value!}])
            socket.send(JSON.stringify({
                type:"message",
                message:content.current?.value,
                to:otherUser?.id,
                conversationId:conversationId
                
            }))
            
        }
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
    }, [convo,typing])
    const {user} = useAuth()
    return(
        <div className={` messages flex items-center flex-col gap-12`}>
        <div ref={messagesContainer} className={`flex w-full sm:w-[70%]  messages-container relative rounded-3xl message-view overflow-y-auto max-h-dvh  bg-[#EBEBEB]   flex-col gap-4 `}>
                <div className="sender-info sticky top-0 bg-white p-4 items-center flex flex-row gap-4">
                    
                    <ArrowLeft className="cursor-pointer" onClick={()=>{
                        navigate(-1)
                        socket.close()
                    }}/>
                   <div style={{backgroundImage:otherUser?.photo ? `url(${import.meta.env.VITE_API_FILE_URL}/${otherUser.photo})`:undefined,backgroundPosition:"center",backgroundSize:"cover"}} className="sender w-15 h-15  text-white flex justify-center font-bold items-center rounded-full">
                                {!otherUser?.photo && otherUser?.initials}
                    </div>
                    <h6>{otherUser?.fname} {otherUser?.lname}</h6>
                </div>
                <div  className="messages flex flex-col gap-5 p-8">
                    {convo?.length>0 ? (convo?.map(m=>{
                        if(m.senderId==otherUser?.id){
                            return <div className="message flex flex-row  gap-2 w-full">
                        <div style={{backgroundImage:otherUser.photo ? `url(${import.meta.env.VITE_API_FILE_URL}/${otherUser.photo})`:undefined,backgroundPosition:"center",backgroundSize:"cover"}} className="sender w-15 h-15  text-white flex justify-center font-bold items-center rounded-full">
                                {!otherUser.photo && otherUser.initials}
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
                    })):(
                        <h4 className="font-bold text-center">Don't be shy to say hi</h4>
                    )}
                    {typing && (
                        <div className="message flex flex-row  gap-2 w-full">
                        <div className="sender w-15 h-15  text-white flex justify-center font-bold items-center rounded-full">
                                {otherUser?.initials}
                        </div>
                        <div className="message-content-receiver p-3 bg-[#f6f6f6] flex justify-center items-center rounded-top-3xl max-w-[50%]">
                            
                            <p className="break-all inline text-3xl typing">.</p>
                            <p className="break-all inline text-3xl typing">.</p>
                            <p className="break-all inline text-3xl typing">.</p>
                        </div>
                    </div>
                    )}
                    
                
                </div>
                <form onSubmit={onAddMessage} className="sticky bottom-0 bg-[white] flex justify-center pb-2 pt-2  w-full">
                    <div className="form-group flex  items-center w-[90%] justify-center  border border-[#10305A]  rounded-3xl">
                      <input onChange={(e)=>handleTyping(e)} type="text" placeholder="Type a message ..." ref={content} name="message" className="flex-1 pl-2 py-6"  /> 
                       <button type="submit"><Send className="cursor-pointer w-[40px] sm:mr-2"/></button>
                    </div>
                    
                </form>
                
            </div>
            </div>
    )
}

export default MessageView