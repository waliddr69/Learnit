export async function getIns(id:number,userId:number|undefined){
    const req = await fetch(import.meta.env.VITE_API_USER_URL+"/getIns?id="+id+"&userId="+userId,{
        method:"GET"
    })

    const res = await req.json()

    return res
}