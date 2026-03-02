export async function getSearch(q:string,id:number|undefined){
    
    const req = await fetch(import.meta.env.VITE_API_SEARCH_URL+"?q="+q+"&userId="+id,{
        method:"GET",
        
    })

    const res = await req.json()
   
    return res
}

export async function getSearchFull(q:string,id:number|undefined){
    
    const req = await fetch(import.meta.env.VITE_API_SEARCH_URL+"/full?q="+q+"&userId="+id,{
        method:"GET",
        
    })

    const res = await req.json()
  
    return res
}