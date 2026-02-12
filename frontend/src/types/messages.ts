import type { User } from "./users";

export interface Messages{
    senderId:number,
    
    sender:User
    
    content:string
}