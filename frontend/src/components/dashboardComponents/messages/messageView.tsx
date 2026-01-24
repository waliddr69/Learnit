import { ArrowLeft, Send } from "lucide-react";
import { useNavigate } from "react-router-dom";

function MessageView(){
    const navigate = useNavigate()
    return(
        <div className={` messages flex items-center flex-col gap-12`}>
        <div className={`flex w-full sm:w-[70%]  messages-container relative rounded-3xl message-view overflow-y-auto h-dvh bg-[#EBEBEB]   flex-col gap-4 `}>
                <div className="sender-info sticky top-0 bg-white p-4 items-center flex flex-row gap-4">
                    
                    <ArrowLeft className="cursor-pointer" onClick={()=>navigate(-1)}/>
                   <div className="sender  w-15 h-15  text-white flex justify-center font-bold items-center rounded-full">
                            DW
                    </div> 
                    <h6>Dari Walid</h6>
                </div>
                <div className="messages p-8">
                    <div className="message flex flex-row  gap-2 w-full">
                    <div className="sender w-15 h-15  text-white flex justify-center font-bold items-center rounded-full">
                            DW
                     </div>
                    <div className="message-content-receiver p-3 bg-[#f6f6f6] flex justify-center items-center rounded-top-3xl w-fit">
                        
                        <p>Hello</p>
                    </div>
                </div>
                <div className="message flex flex-row justify-end  gap-2 w-full">
                    
                    <div className="message-content-sender w-15 h-15 p-3 bg-[#f6f6f6] flex justify-center items-center rounded-top-3xl w-fit">
                        
                        <p>Hello</p>
                    </div>
                </div>
                <div className="message flex flex-row  gap-2 w-full">
                    <div className="sender w-15 h-15  text-white flex justify-center font-bold items-center rounded-full">
                            DW
                     </div>
                    <div className="message-content-receiver p-3 bg-[#f6f6f6] flex justify-center items-center rounded-top-3xl w-fit">
                        
                        <p>Hello</p>
                    </div>
                </div>
                <div className="message flex flex-row justify-end  gap-2 w-full">
                    
                    <div className="message-content-sender w-15 h-15 p-3 bg-[#f6f6f6] flex justify-center items-center rounded-top-3xl w-fit">
                        
                        <p>Hello</p>
                    </div>
                </div>
                <div className="message flex flex-row  gap-2 w-full">
                    <div className="sender w-15 h-15  text-white flex justify-center font-bold items-center rounded-full">
                            DW
                     </div>
                    <div className="message-content-receiver p-3 bg-[#f6f6f6] flex justify-center items-center rounded-top-3xl w-fit">
                        
                        <p>Hello</p>
                    </div>
                </div>
                <div className="message flex flex-row justify-end  gap-2 w-full">
                    
                    <div className="message-content-sender w-15 h-15 p-3 bg-[#f6f6f6] flex justify-center items-center rounded-top-3xl w-fit">
                        
                        <p>Hello</p>
                    </div>
                </div>
                <div className="message flex flex-row  gap-2 w-full">
                    <div className="sender w-15 h-15  text-white flex justify-center font-bold items-center rounded-full">
                            DW
                     </div>
                    <div className="message-content-receiver p-3 bg-[#f6f6f6] flex justify-center items-center rounded-top-3xl w-fit">
                        
                        <p>Hello</p>
                    </div>
                </div>
                <div className="message flex flex-row justify-end  gap-2 w-full">
                    
                    <div className="message-content-sender w-15 h-15 p-3 bg-[#f6f6f6] flex justify-center items-center rounded-top-3xl w-fit">
                        
                        <p>Hello</p>
                    </div>
                </div>
                <div className="message flex flex-row  gap-2 w-full">
                    <div className="sender w-15 h-15  text-white flex justify-center font-bold items-center rounded-full">
                            DW
                     </div>
                    <div className="message-content-receiver p-3 bg-[#f6f6f6] flex justify-center items-center rounded-top-3xl w-fit">
                        
                        <p>Hello</p>
                    </div>
                </div>
                <div className="message flex flex-row justify-end  gap-2 w-full">
                    
                    <div className="message-content-sender w-15 h-15 p-3 bg-[#f6f6f6] flex justify-center items-center rounded-top-3xl w-fit">
                        
                        <p>Hello</p>
                    </div>
                </div>
                <div className="message flex flex-row  gap-2 w-full">
                    <div className="sender w-15 h-15  text-white flex justify-center font-bold items-center rounded-full">
                            DW
                     </div>
                    <div className="message-content-receiver p-3 bg-[#f6f6f6] flex justify-center items-center rounded-top-3xl w-fit">
                        
                        <p>Hello</p>
                    </div>
                </div>
                <div className="message flex flex-row justify-end  gap-2 w-full">
                    
                    <div className="message-content-sender w-15 h-15 p-3 bg-[#f6f6f6] flex justify-center items-center rounded-top-3xl w-fit">
                        
                        <p>Hello</p>
                    </div>
                </div>
                <div className="message flex flex-row  gap-2 w-full">
                    <div className="sender w-15 h-15  text-white flex justify-center font-bold items-center rounded-full">
                            DW
                     </div>
                    <div className="message-content-receiver p-3 bg-[#f6f6f6] flex justify-center items-center rounded-top-3xl w-fit">
                        
                        <p>Hello</p>
                    </div>
                </div>
                <div className="message flex flex-row justify-end  gap-2 w-full">
                    
                    <div className="message-content-sender w-15 h-15 p-3 bg-[#f6f6f6] flex justify-center items-center rounded-top-3xl w-fit">
                        
                        <p>Hello</p>
                    </div>
                </div>
                
                </div>
                <form action="" className="sticky bottom-0 bg-[white] flex justify-center pb-2 pt-2  w-full">
                    <div className="form-group flex  items-center w-[90%] justify-center  border border-[#10305A]  rounded-3xl">
                      <input type="text" placeholder="Type a message ..." name="message" className="flex-1 pl-2 py-6"  /> 
                       <Send className="cursor-pointer w-[40px] sm:mr-2"/>
                    </div>
                    
                </form>
                
            </div>
            </div>
    )
}

export default MessageView