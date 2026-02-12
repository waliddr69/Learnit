import { TriangleAlert } from "lucide-react"

type params = {
    message:string,
    color:string
}


function Alert({message, color}:params){
    return(
        message && <p style={{color}}  className="flex text-sm font-bold items-center flex-row gap-1 self-center">{color=="rgb(205,61,100)" && <TriangleAlert size={20} />}{message}</p>
    )
}

export default Alert