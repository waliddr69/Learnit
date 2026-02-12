export async function addReviewI(creatorId:number,rating:number){
    
    const req = await fetch(import.meta.env.VITE_API_REVIEWSI_URL+"/add",{
        method:"POST",
        headers:{"Content-Type":"application/json"},
        credentials:"include",
        body: JSON.stringify({
            creatorId,
            rating,
      }),
    })

    const res = await req.json()

    return res
}