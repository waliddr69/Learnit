import type { Cart } from "./cart"
import type { enrollements } from "./enrollements"
import type { Likes } from "./likes"
import type { User } from "./users"

export interface Courses{
  id:number      
  title :    string   
  description?:      string
  type? :     string
  cat?: string
  domain?: string
  rating?: number
  subdomain?: string
  photo?: string
  difficulty?: string
  learn?: string
  preview?: string
  price?: number
  visibility :string 
  chapters?: Content[]
  likes?:Likes[]
  enrollements?:enrollements[]
  carts?:Cart[]
  creator?: User
  duration?: number
  
}

export type lesson = {
  id:number,
  name: string;
  type: "video" | "pdf";
};
export type Content = {
  id:number,
  name: string;
  lessons: lesson[];
  _count?: number
};

export const diffData:{[key: string]: string} = {
        "easy": "Beginner",
        "medium": "Intermediate",
        "hard": "Advanced",
        "all": "All Levels"
    }
    export const diffBorder:{[key: string]: string} = {
        "easy": "green",
        "medium": "#FFB700",
        "hard": "#FF0000",
        "all": "#8C00FF"
    }