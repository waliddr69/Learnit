import { useNavigate } from "react-router-dom";
import "./account.css"
import { ArrowLeft, Camera } from "lucide-react";
import { useEffect, useState } from "react";
import Alert from "@/components/alertMsg/alert";
import type { User } from "@/types/users";
import { getProfile } from "@/services/authService";
import { useAuth } from "@/context/authContext";



function Account(){
    const [initial,setInitial] = useState<{photo: string; fname: string; lname: string; bio: string}>({photo: "", fname: "", lname: "", bio: ""})
    const [message,setMessage] = useState("")
    const [color,setColor] = useState("")
    const [photoFile, setPhotoFile] = useState<File | null>(null);
    const { user } = useAuth();

            async function getUser(){
              const profile = user
             
              if(profile){
                if(profile.role!=="TEACHER"){
                    navigate("/dashboard/yourLearning")
                    return
                }

                if (profile.photo) {
                    setPhoto(`${import.meta.env.VITE_API_FILE_URL}/${profile.photo}`);
                    }

                setInitial({photo:profile.photo?profile.photo:profile.initials, fname:profile.fname, lname:profile.lname, bio:profile.bio?profile.bio:""} ) 

            }else{
                navigate("/courses")
                return
            }
              
            }
            useEffect(()=>{
              getUser()
            },[])

    
    const navigate = useNavigate()
    const [photo, setPhoto] = useState<string>("");
    function handlePhotoChange(e: React.ChangeEvent<HTMLInputElement>) {
        const file = e.target.files?.[0];
        
        if(!file || !file.type.startsWith("image/")) return
        if(file.size > 2*1024 *1024){
            alert("File size exceeds 2MB");
            return
        }
        if (file) {
            setPhotoFile(file)
            setPhoto(URL.createObjectURL(file));
        }
    }

    function handleSubmit(e:React.FormEvent<HTMLFormElement>){
        e.preventDefault()
        if(!initial.fname || !initial.lname){
            setMessage("First name and Last name are required")
            setColor("rgb(205,61,100)")
            return
        }
        const formData = new FormData();
    formData.append("fname", initial.fname);
    formData.append("lname", initial.lname);
    formData.append("bio", initial.bio || "");

    const allowedImages = ["image/jpeg", "image/png", "image/webp"];
    if (photoFile && allowedImages.includes(photoFile.type)) {
        formData.append("photo", photoFile);
    }else{
        setMessage("Profile photo must be an image")
            setColor("rgb(205,61,100)")
            return
    }

    fetch(import.meta.env.VITE_API_USER_URL + "/update", {
        method: "PUT", 
        credentials: "include",
        body: formData
    })
    .then(res => res.json())
    .then(res => {
        if(res.success) {
            setMessage("Profile updated successfully");
            setColor("green")
        } else {
            setMessage(res.message || "Failed to update profile");
            setColor("rgb(205,61,100)")
        }
    })
    }
    return(
        <main className="bg-[#ffffff] h-full">
            <div className="account-wrapper  p-1 sm:p-4 flex gap-20 flex-col">
                <div className="h-10 flex flex-row">
                    <ArrowLeft onClick={()=>navigate(-1)} color="black" className="self-start cursor-pointer h-full"/>
                    <h2 className="mx-auto">Account Settings</h2>
                </div>
                

                <form onSubmit={handleSubmit}  className="self-center w-full sm:w-[90%] md:w-[70%]  lg:w-1/2 flex gap-6 flex-col items-center">
                    <div className="form-group h-22 w-22">
                        <label htmlFor="photo" className="h-22 text-white cursor-pointer photo-label w-22 group font-bold photo p-4 relative  rounded-full " style={{
                          backgroundImage: photo ? `url(${photo})` : undefined
                        }}>{!photo && initial.photo} <div className="over invisible absolute inset-0 opacity-0 group-hover:visible group-hover:opacity-100 transition-all flex items-center justify-center rounded-full bg-[#00000065]"><Camera strokeWidth={3}/></div></label>
                        <input type="file" name="photo" onChange={handlePhotoChange} id="photo" className="hidden" />  
                    </div>
                <div className="w-[80%] items-center  flex flex-col  sm:flex-row gap-6">
                    <div className="flex flex-col gap-2 w-full sm:w-1/2">
                        <label className="font-medium text-[#333333]">First name</label>
                        <input onChange={e=>setInitial(prev => ({...prev, fname:e.target.value}))}  type="text" placeholder="Exp: Dari" value={initial.fname} className="border fullname w-full border-[#cccee7de]  rounded-3xl   p-3" />
                    </div>

                    <div className="flex flex-col gap-2 w-full sm:w-1/2">
                        <label className="font-medium text-[#333333]">Last name</label>
                        <input placeholder="Exp: Walid" onChange={e=>setInitial(prev => ({...prev, lname:e.target.value}))} type="text" value={initial.lname} className="border fullname w-full border-[#cccee7de]  rounded-3xl   p-3" />
                    </div>
                </div>
                <div className="w-[80%] flex flex-col gap-2">
              <label htmlFor="" className="font-medium text-[#333333]">
                Bio
              </label>
              <div className="bio  flex items-center border-[#cccee7de] rounded-3xl border justify-between p-3">
                <textarea
                  
                  onChange={e=>setInitial(prev => ({...prev, bio:e.target.value}))}
                  value={initial.bio}
                  name="bio"
                  className="flex-1"
                  placeholder="write something about your expertise and your experiences..."
                />
                
              </div>
            </div>
            <Alert message={message} color={color} />
            <button
              type="submit"
              
              className={` cta w-[80%]  text-[12px] px-2 py-3 shadow-lg  squircle sm:px-12 sm:py-3 sm:text-[16px] md:px-12 md:py-3 md:text-[18px] lg:px-12 lg:py-3 lg:text-[18px] `}
            >
              Submit
            </button>
                    
                </form>

            </div>
        </main>
    )
}

export default Account