import { useAuth } from "@/context/authContext";
import { getProfile } from "@/services/authService";
import type { User } from "@/types/users";
import { useEffect, useState } from "react";
import { Navigate, Outlet } from "react-router-dom";

function RoleRoute(){
    
    
    const { user, loading } = useAuth();
        

    if(loading){
        return <div>Loading...</div>
    }
    

    return user!.role=="TEACHER" ? <Outlet/>:<Navigate to={"/dashboard/yourLearning"}/>
}

export default RoleRoute