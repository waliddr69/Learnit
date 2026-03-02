export async function addReview(courseId:number,rating:number){
    const req = await fetch(import.meta.env.VITE_API_REVIEWSC_URL+"/add",{
        method:"POST",
        headers:{"Content-Type":"application/json"},
        credentials:"include",
        body: JSON.stringify({
            courseId,
            rating,
      }),
    })

    const res = await req.json()

    return res
}

