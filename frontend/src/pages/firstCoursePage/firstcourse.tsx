import { useEffect, useRef, useState } from "react"
import { BookOpenText, Cross } from 'lucide-react';
import { NotebookPen } from 'lucide-react';
import "./firstCourse.css"
import { useNavigate } from "react-router-dom";
import { Check } from "lucide-react";
import {Domains} from "../../models/domains";
import easy from "../../assets/icons/easy.svg"
import medium from "../../assets/images/intermediate.svg"
import hard from "../../assets/images/hard.svg"
import all from "../../assets/images/all.svg"
import { Plus } from "lucide-react";
import Alert from "@/components/alertMsg/alert";
import type { User } from "@/types/users";
import { getProfile } from "@/services/authService";
function FirstCourse(){
    const [step,setStep] = useState(1)
    const [disabled,setDisabled] = useState(true)
    const [selected,setSelected] = useState<string>("");
    const [category, setCategory] = useState<string>("");
    const [subcategory, setSubcategory] = useState<string>("");
    const [difficulty, setDifficulty] = useState<string>("");
    const [payement, setPayement] = useState<string>("");
    const [preview, setPreview] = useState<string>("");
    const [photoFile,setPhoto] = useState<File|null>(null)
    const [apercuFile,setAprFile] = useState<File|null>(null)
    const [apercu, setApercu] = useState<string>("");
    const [message,setMessage] = useState("")
    const [color,setColor] = useState("rgb(205,61,100)")
    const [learn,setLearn] = useState<string[]>([""])

    const [_user, setUser] = useState<User | null>(null);
                async function getUser(){
                  const profile = await getProfile()
                  setUser(profile)
                  if(profile){
                    if(profile.role!=="TEACHER"){
                        navigate("/dashboard/yourLearning")
                        return
                    }
    
                    
    
                }
                  
                }
                useEffect(()=>{
                  getUser()
                },[])

    const handleSteps = ()=>{
        if((step==1 && selected==="") ||
           (step==2 && category=="") ||
           (step==3 && subcategory=="") ||
           (step==4 && difficulty=="")
        ){
            
            setMessage("Select one of the available options!")
            return
        }
        setMessage("")
        setStep(step+1)
        console.log(step,category)
    }

    const handleStep5 = ()=>{
        const f = document.getElementById("form5") as HTMLFormElement
        const formData = new FormData(f)

        const title = formData.get("title1")
        
        if(title==null || title.toString().trim()==""){
            setMessage("Enter at least the title")
            return
        }
        const description = formData.get("descr")
        let price = null
        if(payement == "premium"){
            price = formData.get("payValue")
            console.log(Number(price)<=0)
            if(price==null || Number(price)==0){
                setMessage("Enter a valid value for price")
                return

            }

        }
        if(!photoFile){
            setMessage("Upload a Course thumbnail")
            return
        }
        const allowedImages = ["image/jpeg", "image/png", "image/webp"];
            if (photoFile && !allowedImages.includes(photoFile.type)) {
                
                setMessage("Course thumbnail must be an image")
                return
            }
            const allowedVideos = ["video/mp4", "video/ogg", "video/webm"];
            if (apercuFile && !allowedVideos.includes(apercuFile!.type)) {
                
                setMessage("Course preview must be a video")
                return
            }

            formData.append("photo", photoFile);
            formData.append("video", apercuFile!);

            
            formData.append("type", "course");
            formData.append("cat", selected);
            formData.append("domain", category);
            formData.append("subdomain", subcategory);
            formData.append("difficulty", difficulty);
            formData.append("title", title.toString().trim());
            formData.append("description", description?.toString() ?? "");
            formData.append("payement", payement);
            formData.append("price", price?.toString() ?? "0");
            formData.append("learn", JSON.stringify(learn));

        fetch(import.meta.env.VITE_API_COURSE_URL + "/create",{
            method:"POST",
            
            credentials:"include",
            body:formData
        })

        .then(res=>res.json())
        .then(res=>{
            if(res.success){
                setMessage("course created successfully")
                setColor("green")
                navigate("/teach/content")
                
            }else{
                setMessage(res.message)
            }
        })


        

    }

    
    function handleApercuChange(e: React.ChangeEvent<HTMLInputElement>) {
        const file = e.target.files?.[0];
        if(!file) return
        if(file.size > 2*1024 *1024){
            alert("File size exceeds 2MB");
        }
        if (file) {
            setApercu(URL.createObjectURL(file));
            setAprFile(file)
        }
    }

    function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
        const file = e.target.files?.[0];
        if(!file ) return
        if(file.size > 2*1024 *1024){
            alert("File size exceeds 2MB");
        }
        if (file) {
            setPreview(URL.createObjectURL(file));
            setPhoto(file)
            
        }
    }
    useEffect(()=>{
        return ()=>{
            preview && URL.revokeObjectURL(preview)
            
        }
    },[preview])

    useEffect(()=>{
        return ()=>{
            apercu && URL.revokeObjectURL(apercu)
        }
    },[apercu])

    const navigate = useNavigate();

    useEffect(() => {
  if (step === 1) {
    setDisabled(selected === "");
  }

  if (step === 2) {
    setDisabled(category === "");
  }
  if(step===3){
    setDisabled(subcategory==="")
  }
  if(step===4){
    setDisabled(difficulty==="")
  }
}, [step, selected, category,subcategory,difficulty]);
    return(
        <div className="main  bg-[#F7F7F7] items-center    flex flex-col gap-20   h-fit w-full" >
            <div className="bg-white p-8 w-full shadow-lg">
               <p onClick={()=>navigate("/teach/content")} className="font-bold inline text-[#006efd] float-right cursor-pointer self-end">Leave</p> 
            </div>
            <div className="flex justify-center items-center flex-row gap-2">
                <div className={`${step>=1&&step<=5 ? 'bg-[#006efd]' : 'bg-[#D9D9D9]'} h-1 w-12 rounded-3xl`}></div>
                <div className={`${step >= 2 &&step<=5 ? 'bg-[#006efd]' : 'bg-[#D9D9D9]'} h-1 w-12 rounded-3xl`}></div>
                <div className={`${step >= 3 && step <= 5 ? 'bg-[#006efd]' : 'bg-[#D9D9D9]'} h-1 w-12 rounded-3xl`}></div>
                <div className={`${step >= 4 && step <= 5 ? 'bg-[#006efd]' : 'bg-[#D9D9D9]'} h-1 w-12 rounded-3xl`}></div>
                <div className={`${step === 5 ? 'bg-[#006efd]' : 'bg-[#D9D9D9]'} h-1 w-12 rounded-3xl`}></div>
            </div>
            
            
            {step === 1 && <div className="flex flex-col gap-4 items-center">
                <h2 className="text-center">Let’s start by choosing the course type</h2>
                <p className="subheading">What type of course are you creating?</p>
                <div className="flex flex-row gap-8 w-[100%] flex-wrap justify-center lg:w-1/2 lg:flex-nowrap mt-10 ">
                    <div className={`${selected=="lessons"?"selected-card":"bg-white"} cour flex flex-col cursor-pointer justify-center gap-6 items-center p-8 border-2 w-1/2 border-[#00000029] `} onClick={()=>{
                        setDisabled(false)
                        setSelected("lessons")
                        
                    }}>
                        <BookOpenText size={40}/>
                        <div className="flex flex-col justify-center gap-2 items-center">
                            <h6 className="font-bold">Lessons</h6>
                            <p className="text-[#333333]">Break your course into multiple videos, quizzes, and exercises to make it easier for students to follow along.</p>
                        </div>
                    </div>
                    <div className={`${selected=="exercices"?"selected-card":"bg-white"} exercices cursor-pointer flex flex-col justify-center gap-6 items-center p-8 border-2 w-1/2 border-[#00000029]`} onClick={()=>{
                        setDisabled(false)
                        setSelected("exercices")
                    }}>
                        <NotebookPen size={40}/>
                        <div className="flex flex-col justify-center gap-2 items-center">
                            <h6 className="font-bold">Exercices</h6>
                            <p className="text-[#333333]">Boost your certification success with realistic exam-style practice questions.</p>
                        </div>
                    </div>
                </div>
                
                <div>

                </div>
                </div>}
                {step === 2 && <div className="flex flex-col gap-4 items-center">
                <h2 className="text-center">Now let's see in which categorie this course is for</h2>
                <p className="subheading">This course is for categorie : </p>
                <div className="flex flex-row gap-8 w-[100%] flex-wrap justify-center lg:w-1/2 lg:flex-nowrap mt-10 ">
                    <div className="categories w-2/3 flex flex-row flex-wrap gap-4">
                        
                        
                        {Domains.map((domain)=>(
                            <div key={domain.id} className={`${category==domain.id?"selected-cat":"category"} flex items-center flex-row gap-2`} onClick={()=>setCategory(domain.id)}><Check className={`${category==domain.id?"block":"hidden"}`} color="#04ff00"/> {domain.label}</div>
                        ))}
                    </div>
                </div>
                
                <div>

                </div>
                </div>}
                {step === 3 && <div className="flex flex-col gap-4 items-center">
                <h2 className="text-center">Next, in which subcategorie does your course belongs</h2>
                <p className="subheading">This course is in : </p>
                <div className="flex flex-row gap-8 w-[100%] flex-wrap justify-center lg:w-1/2 lg:flex-nowrap mt-10 ">
                    <div className="categories w-2/3 flex flex-row flex-wrap gap-4">
                        {Domains.filter((Domain)=>Domain.id==category).map((domain)=>(
                            domain.subCategories.map((sub)=>(
                                <div key={sub} onClick={()=>setSubcategory(sub)} className={`${subcategory==sub?"selected-cat":"category"} flex items-center flex-row gap-2`}><Check className={`${subcategory==sub?"block":"hidden"}`} color="#04ff00"/> {sub}</div>
                            ))
                        ))}
                    </div>
                </div>
                
                <div>

                </div>
                </div>}
                {step === 4 && <div className="flex flex-col w-full gap-4 items-center">
                <h2 className="text-center">Set the course difficulty</h2>
                <p className="subheading"> choose the course difficulty : </p>
                <div className="flex flex-row gap-8 w-[100%] flex-wrap justify-center lg:w-1/2 lg:flex-nowrap mt-10 ">
                    <div className={`${difficulty=="easy"?"selected-card":"bg-white"} difficulty flex flex-col cursor-pointer justify-center gap-6 items-center p-8 border-2 flex-1 border-[#00000029] `} onClick={()=>{
                        setDisabled(false)
                        setDifficulty("easy")
                        
                    }}>
                        <img src={easy} alt="beginner" />
                        <div className="flex flex-col justify-center gap-2 items-center">
                            <h6 className="font-bold">Beginner</h6>
                            <p className="text-[#333333]">No prior knowledge required</p>
                        </div>
                    </div>
                    <div className={`${difficulty=="medium"?"selected-card":"bg-white"} difficulty cursor-pointer flex flex-col justify-center gap-6 items-center p-8 border-2 flex-1 border-[#00000029]`} onClick={()=>{
                        setDisabled(false)
                        setDifficulty("medium")
                    }}>
                        <img src={medium} alt="intermediate" />
                        <div className="flex flex-col justify-center gap-2 items-center">
                            <h6 className="font-bold">Intermediate</h6>
                            <p className="text-[#333333] ">Basic concepts required </p>
                        </div>
                    </div>
                    <div className={`${difficulty=="hard"?"selected-card":"bg-white"} difficulty cursor-pointer flex flex-col justify-center gap-6 items-center p-8 border-2 flex-1 border-[#00000029]`} onClick={()=>{
                        setDisabled(false)
                        setDifficulty("hard")
                    }}>
                        <img src={hard} alt="Advanced" />
                        <div className="flex flex-col justify-center gap-2 items-center">
                            <h6 className="font-bold">Advanced</h6>
                            <p className="text-[#333333] min-h-[40px]">Strong background required  </p>
                        </div>
                    </div>
                    <div className={`${difficulty=="all"?"selected-card":"bg-white"} difficulty cursor-pointer flex flex-col justify-center gap-6 items-center p-8 border-2 flex-1 border-[#00000029]`} onClick={()=>{
                        setDisabled(false)
                        setDifficulty("all")
                    }}>
                        <img src={all} alt="all"  />
                        <div className="flex flex-col justify-center gap-2 items-center">
                            <h6 className="font-bold">All levels</h6>
                            <p className="text-[#333333] min-h-[40px]">Suitable for all learners  </p>
                        </div>
                    </div>
                </div>
                
                <div>

                </div>
                </div>}
                {step === 5 && <div className="flex flex-col w-full gap-4 items-center">
                <h2 className="text-center">Complete the course details</h2>
                <p className="subheading"> continue your course details to make it ready to submit (you can modify the informations later) </p>
                <div className="flex flex-col gap-8 w-full  items-center flex-wrap justify-center lg:w-1/2 lg:flex-nowrap mt-10 ">
                    <form id="form5"  className="flex px-2 flex-col gap-6 w-full">
                        <div className="form-group flex flex-col gap-2 w-full  ">
                            <label htmlFor="" className="text-[#333333] font-bold">Course title</label>
                           <input type="text" name="title1" placeholder="Exp: Photoshop for beginners" className="w-full p-4 border-2 border-[#00000029] rounded-sm"/> 

                        </div>
                        
                        <div className="form-group flex flex-col gap-2 w-full  ">
                            <label htmlFor="" className="text-[#333333] font-bold">Course Description</label>
                           <textarea name="descr"  placeholder="Exp: From 0 to hero: this course will make you the best in photoshop ..." className="w-full p-4 border-2 border-[#00000029] rounded-sm"></textarea> 

                        </div>

                        <div className="form-group flex flex-col gap-2 w-full  ">
                            <label htmlFor="" className="text-[#333333] font-bold">What you'll teach in this course</label>
                            
                                {learn.map((value,i)=>{
                                    if(learn.length>1){
                                        return(
                                           <><div key={i} className="flex flex-row gap-1"><input value={value} onChange={e=>{
                                            const newL = [...learn]
                                            newL[i]=e.target.value
                                            setLearn(newL)
                                           }} type="text" placeholder="Exp: code exercices about python ...." className="w-full p-4 border-2 border-[#00000029] rounded-sm" />
                                           <div onClick={()=>{
                                            
                                            setLearn(learn.filter((_,index)=> index!=i))
                                           }} className="flex items-center justify-center px-2 rounded-sm text-white w-[8%] cursor-pointer bg-[#0069FF]">✖</div></div></>
                                        )
                                    }else{
                                        return(
                                            <input key={i} value={value} onChange={e=>{
                                                const newL = [...learn]
                                                newL[i]=e.target.value
                                                setLearn(newL)
                                            }} type="text" placeholder="Exp: code exercices about python ...." className="w-full p-4 border-2 border-[#00000029] rounded-sm" />
                                        )
                                    }
                                })}
                                
                            
                            {learn.length<6 && <button type="button" onClick={()=>{
                                
                                setLearn(prev=>[...prev,""])
                            }} className="bg-[#006aff] text-white cursor-pointer p-2 rounded-sm" >+ Add another</button>}

                        </div>

                        <div className="form-group flex flex-col gap-2 w-full  ">
                            <label htmlFor="" className="text-[#333333] font-bold">Course Payement</label>
                            <div className="flex flex-row gap-2 w-full font-medium"><input checked={payement=="free"?true:false} value={"free"} onChange={(e) => setPayement(e.target.value)} type="radio" name="payement" placeholder="Exp: Photoshop for beginners" className=" w-12 p-4 border-2 border-[#0c24436d] rounded-sm"/> Free</div>
                            <div className="flex flex-row gap-2 w-full font-medium"><input checked={payement=="premium"?true:false} value={"premium"} onChange={(e) => setPayement(e.target.value)} type="radio" name="payement" placeholder="Exp: Photoshop for beginners" className=" w-12 p-4 border-2 border-[#0c24436d] rounded-sm"/> Premium</div>
                           
                        </div>
                        <div className={`${payement=="premium"?"flex":"hidden"} form-group  flex-col gap-2 w-full  `}>
                            <label htmlFor="" className="text-[#333333] font-bold">Course Price</label>
                           <input type="number" name="payValue"  placeholder="Exp: 6000" className="w-full p-4 border-2 border-[#0c24436d] rounded-sm"/> 

                        </div>
                        <div className={` form-group flex  flex-col gap-2 w-full  `}>
                            <p className="text-[#333333] font-bold">Course thumbnail (a descriptive photo for your course Max 2MB)</p>
                            <label htmlFor="thumbnail" className="text-[#333333] box font-bold">{!preview&&<Plus/>}{preview && <img src={preview} alt="thumbnail" className="preview" />}</label>
                            
                           <input type="file" id="thumbnail" onChange={(e)=>handleFileChange(e)} accept="image/*"  placeholder="Exp: 6000" className="w-full p-4 border-2 border-[#0c24436d] rounded-sm"/> 

                        </div>

                        <div className={` form-group flex  flex-col gap-2 w-full  `}>
                            <p className="text-[#333333] font-bold">Course Preview (a descriptive video for your course Max 2MB)</p>
                            <label htmlFor="video" className="text-[#333333] box font-bold">{!apercu&&<Plus/>}{apercu && <video src={apercu}  />}</label>
                            
                           <input type="file" id="video" onChange={(e)=>handleApercuChange(e)} accept="video/*"  placeholder="Exp: 6000" className="w-full hidden p-4 border-2 border-[#0c24436d] rounded-sm"/> 

                        </div>

                        
                        
                    </form>
                </div>
                
                <div>

                </div>
                </div>}

                <Alert message={message} color={color}/>
                
                <div className="bg-white btn-div mt-auto  w-full p-8 flex justify-between   ">
                    <button onClick={()=>setStep(step-1)}  className={`${step>=2?"flex":"hidden"} font-bold cursor-pointer outline-2 outline-transparent  hover:outline-2 hover:outline-[#006efd] transition-all self-start   rounded-3xl  flex gap-2 font-bold p-5`}>Back</button>
                    {step<5 && <button onClick={handleSteps} disabled={disabled} className={`${disabled ? "disabled":"cta"}  self-end  ml-auto rounded-3xl    gap-2 font-bold p-5`}>Continue</button>}
                    {step == 5 && <button onClick={handleStep5} disabled={disabled} className={`${disabled ? "disabled":"cta"}  self-end  ml-auto rounded-3xl    gap-2 font-bold p-5`}>Save to Draft</button>}
                    
                </div>
        </div>
    )
}

export default FirstCourse