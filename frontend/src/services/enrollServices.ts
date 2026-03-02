export async function getAllEnrollmentsByIns(id:number){
    const req = await fetch(import.meta.env.VITE_API_PAY_URL+"/getAllByIns?id="+id,{
        credentials:"include",
        method:"GET"
    })

    const res = await req.json()
    return res
}