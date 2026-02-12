export async function addComment(courseId:number,content:string){
    const req = await fetch(import.meta.env.VITE_API_COMMENT_URL+"/add",{
        method:"POST",
        headers:{"Content-Type":"application/json"},
        credentials:"include",
        body: JSON.stringify({
            courseId,
            content,
      }),
    })

    const res = await req.json()

    return res
}