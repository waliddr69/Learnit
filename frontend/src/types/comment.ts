import type { Courses } from "./courses";
import type { User } from "./users";

export interface Comments{
    userId:number,
    id:number,
    courseId:number,
    user:User,
    course:Courses,
    content:string
}