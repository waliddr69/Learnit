
import type { User } from "./users";

export interface ReviewsI{
    id:number,
    rating:number,
    userId:number,
    creatorId:number,
    user:User,
    creator:User
}