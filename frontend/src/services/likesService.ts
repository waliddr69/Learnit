export async function getLikes() {
    const req = await fetch(import.meta.env.VITE_API_LIKES_URL + "/getLikes", {
      method: "GET",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
    })

    const res  = await req.json()
    return res
    
}


    