import type { Courses } from "./courses";

export interface Likes{
    userId: number,
    courseId: number,
    course:Courses
}