import { useAuth } from "@/context/authContext";

import { Navigate, Outlet } from "react-router-dom";

function PublicRoutes(){
    
    
    const { user, loading } = useAuth();

  

  
  if (loading) {
    return <div>Loading...</div>; 
  }

  if(user){
    if(user.role=="TEACHER"){
        return <Navigate to="/teach/content" replace />;
    }
    return <Navigate to="/dashboard/yourLearning" replace />;
  }else{
    return <Outlet />;
  }

  
}

export default PublicRoutes;    