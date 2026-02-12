export async function getCart(id:number,cId:number|undefined){
    try{
    const res = await fetch(import.meta.env.VITE_API_CART_URL + "/getCart?userId="+id+"&courseId="+cId, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
    })
    
    const data = await res.json()
    
    return data.success?data.cart:[]
    }catch(err){
        
        return []
    }    
}