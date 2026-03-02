import type { Courses } from "./courses";
import type { ReviewsI } from "./reviewsI";

export interface User {
  id: number;
  email: string;
  fname: string;
  lname: string;
  password: string;
  bio: string | null;
  rating: number | null;
  role: string;
  photo?: string;
  initials: string;
  createdAt: Date;
  updatedAt: Date;
  contents?: Courses[];
  writtenReviews?: ReviewsI[],
  receivedReviews?: ReviewsI[]
}