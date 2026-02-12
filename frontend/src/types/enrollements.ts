import type { Courses } from "./courses"
import type { User } from "./users"

export interface enrollements{
    id:number,
    courseId:number
    userId:number
    course:Courses,
    user:User,
    progress:number,
    createdAt:Date
}