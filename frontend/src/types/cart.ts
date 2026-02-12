import type { Courses } from "./courses";

export interface Cart{
    id:number
    userId: number,
    courseId: number,
    course:Courses
}