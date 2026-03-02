

export async function getInbox(){
    
    const req = await fetch(import.meta.env.VITE_API_MESSAGES_URL+"/getInbox",{
        method:"GET",
        headers:{"Content-Type":"application/json"},
        credentials:"include",
        
    })

    
    const res = await req.json()


    return res
}

export async function getMessages(receiverId:number){
    
    const req = await fetch(import.meta.env.VITE_API_MESSAGES_URL+"/getMessages?receiverId="+receiverId,{
        method:"GET",
        headers:{"Content-Type":"application/json"},
        credentials:"include",
        
    })

    
    const res = await req.json()


    return res
}

export async function addMessage(conversationId:number,senderId:number,content:string){
    
    const req = await fetch(import.meta.env.VITE_API_MESSAGES_URL+"/addMessage",{
        method:"POST",
        headers:{"Content-Type":"application/json"},
        credentials:"include",
        body:JSON.stringify({conversationId,senderId,content})
    })

    
    const res = await req.json()


    return res
}

export async function addConvo(receiverId:number,content:string){
    const req = await fetch(import.meta.env.VITE_API_MESSAGES_URL+"/addConv",{
        method:"POST",
        headers:{"Content-Type":"application/json"},
        credentials:"include",
        body:JSON.stringify({receiverId,content})
    })

    
    const res = await req.json()


    return res

}