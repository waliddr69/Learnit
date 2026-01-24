import { Outlet } from "react-router-dom";
import NavDashboard from "../../components/dashboardUser/navDashboardUser/navDashboard";

import Footer from "@/components/footer/footer";



function DashboardUser(){
    
    return(
        <><main className="h-fit pb-10 bg-[#dbebff]">
            <NavDashboard />
            <div className="content ">
                <Outlet />

            </div>
        </main><Footer /></>
    )
}
export default DashboardUser;