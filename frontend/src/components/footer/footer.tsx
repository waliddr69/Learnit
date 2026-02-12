import { domains, domainsEd } from "@/models/domains"

import "./footer.css"
import { useNavigate } from "react-router-dom"
import { useEffect, useState } from "react"

import { useAuth } from "@/context/authContext"
function Footer(){
    const navigate = useNavigate()
    const [role,setRole] = useState("")
    const {refreshUser} = useAuth()
    const { user } = useAuth();

    async function refresh(){
            await refreshUser()
    }

    useEffect(() => {
    refreshUser();
  }, []);
    useEffect(()=>{
        
        if(user){
            setRole(user.role)

        }else{
            setRole("GUEST")
        }
        console.log("role"+user?.role)
    },[user])

    const changeRole = ()=>{
        fetch(import.meta.env.VITE_API_USER_URL + "/changeRole", {
            method:"PATCH",
            headers:{"Content-Type":"application/json"},
            credentials:"include"
        })
        .then((res)=>res.json())
        .then(async res=>{
            if(res.success){
                await refreshUser()
                navigate("/teach/content")
            }
        })
    }
    return(
        <footer>
            <div className="footer-wrapper p-[5%_5%_10px_5%]  flex flex-col gap-10">
                <h3>Learn practical skills. Build real projects. Grow your career.</h3>

                <div className="footer-content grid  grid-cols-2 gap-10 lg:flex flex-row  lg:flex-nowrap justify-between">
                    <div className="flex flex-col gap-4">
                        <h6>Courses</h6>
                        <ul>
                        {Object.entries(domains).map(([domain])=>{
                            if(domain!="All"){
                        return <li>{domain}</li>
                    }
                        
                    
                        })}
                        </ul>
                    </div>
                    <div className="flex flex-col gap-4">
                        <h6>Educational courses</h6>
                        
                        <ul>
                            {Object.entries(domainsEd).map(([domain])=>{
                            if(domain!="All"){
                        return <li>{domain}</li>
                    }
                        
                    
                        })}
                        </ul>
                    </div>
                    <div className="flex flex-col gap-4">
                        <h6>Teachers</h6>
                        
                        <ul>
                            {role==="STUDENT" && <li onClick={changeRole}>Become an instructor</li>}
                            {role==="GUEST" && <li onClick={()=>navigate("/teach/signup")}>Become an instructor</li>}
                            {role==="TEACHER" && <li onClick={()=>navigate("/teach/content")}>Go to dashboard</li>}
                            
                        </ul>
                    </div>
                    <div className="flex flex-col gap-4">
                        <h6>Contact us</h6>
                        
                        <ul>
                            <li>+213 0798492604</li>
                            <li>waliddari69@gmail.com</li>
                        </ul>
                    </div>
                    
                </div>
                <p className="text-[#B5B5B5] text-lg self-center mt-10">Learnit. Ltd &copy; 2026.All Rights Reserved</p>
            </div>
        </footer>
    )
}

export default Footer