import type { Messages } from "./messages"
import type { User } from "./users"

export interface Conversation{
    user1Id:number
    user2Id:number
    sender:User
    receiver:User
    messages: Messages[]
}