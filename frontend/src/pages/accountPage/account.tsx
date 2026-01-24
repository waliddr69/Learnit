import { useNavigate } from "react-router-dom";
import "./account.css"
import { ArrowLeft, Camera } from "lucide-react";
import { useState } from "react";



function Account(){
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
            setPhoto(URL.createObjectURL(file));
        }
    }
    return(
        <main className="bg-[#ffffff] h-full">
            <div className="account-wrapper  p-1 sm:p-4 flex gap-20 flex-col">
                <div className="h-10 flex flex-row">
                    <ArrowLeft onClick={()=>navigate(-1)} color="black" className="self-start cursor-pointer h-full"/>
                        <h2 className="mx-auto">Account Settings</h2>
                </div>
                

                <form action="" className="self-center w-full sm:w-[90%] md:w-[70%]  lg:w-1/2 flex gap-6 flex-col items-center">
                    <div className="form-group h-22 w-22">
                        <label htmlFor="photo" className="h-22 text-white cursor-pointer photo-label w-22 group font-bold photo p-4 relative  rounded-full " style={{
                          backgroundImage: photo ? `url(${photo})` : undefined
                        }}>{!photo && "DW"} <div className="over invisible absolute inset-0 opacity-0 group-hover:visible group-hover:opacity-100 transition-all flex items-center justify-center rounded-full bg-[#00000065]"><Camera strokeWidth={3}/></div></label>
                        <input type="file" name="photo" onChange={handlePhotoChange} id="photo" className="hidden" />  
                    </div>
                <div className="w-[80%] items-center  flex flex-col  sm:flex-row gap-6">
                    <div className="flex flex-col gap-2 w-full sm:w-1/2">
                        <label className="font-medium text-[#333333]">First name</label>
                        <input  type="text" placeholder="Exp: Dari" value={"Dari"} className="border fullname w-full border-[#cccee7de]  rounded-3xl   p-3" />
                    </div>

                    <div className="flex flex-col gap-2 w-full sm:w-1/2">
                        <label className="font-medium text-[#333333]">Last name</label>
                        <input placeholder="Exp: Walid" type="text" value={"Walid"} className="border fullname w-full border-[#cccee7de]  rounded-3xl   p-3" />
                    </div>
                </div>
                <div className="w-[80%] flex flex-col gap-2">
              <label htmlFor="" className="font-medium text-[#333333]">
                Bio
              </label>
              <div className="email  flex items-center border-[#cccee7de] rounded-3xl border justify-between p-3">
                <textarea
                  
                  
                  
                  name="email"
                  className="flex-1"
                  placeholder="write something about your expertise and your experiences..."
                />
                
              </div>
            </div>
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