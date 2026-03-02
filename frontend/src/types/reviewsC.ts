import type { Courses } from "./courses";
import type { User } from "./users";

export interface ReviewsC{
    id:number,
    rating:number,
    userId:number,
    courseId:number,
    user:User,
    course:Courses
}