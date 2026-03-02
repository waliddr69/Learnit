import {
  
  Plus,
 
  
} from "lucide-react";


import { useEffect, useState, type FormEvent } from "react";


import Alert from "../alertMsg/alert";
import type { Courses } from "@/types/courses";
import { useNavigate } from "react-router-dom";

type params = {
    id:number,
    onSuccess?: ()=>void
}

function CreateCourseForm({id,onSuccess}:params) {
  
  
  const [payement, setPayement] = useState<string>("");
  const [preview, setPreview] = useState<string>("");
  const [apercu, setApercu] = useState<string>("");

  const [photo,setPhoto] = useState<File | null>(null);
  const [video,setVideo] = useState<File | null>(null);
  const [title,setTitle] = useState<string>("");
  const [desc,setDescription] = useState<string>("");
  const [visibility,setVisibility] = useState<string>("");
  const [payValue,setPayValue] = useState<number>(0);
  const [difficulty,setDifficulty] = useState<string>("");
  const[course,setCourse] = useState<Courses>()
  const [message,setMessage] = useState<string>("");
  const [color,setColor] = useState<string>("");
  const [learn,setLearn] = useState<string[]>([""])


  
  function handleApercuChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file || !file.type.startsWith("video/")) return;
    if (file.size > 2 * 1024 * 1024) {
      alert("File size exceeds 2MB");
      return;
    }
    if (file) {
      setApercu(URL.createObjectURL(file));
      setVideo(file); 
    }
  }

  function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file || !file.type.startsWith("image/")) return;
    if (file.size > 50 * 1024 * 1024) {
      alert("File size exceeds 50MB");
      return;
    }
    if (file) {
      setPreview(URL.createObjectURL(file));
      setPhoto(file);
    }
  }
  useEffect(() => {
    return () => {
      preview && URL.revokeObjectURL(preview);
    };
  }, [preview]);
  
  useEffect(() => {
    return () => {
      apercu && URL.revokeObjectURL(apercu);
    };
  }, [apercu]);

  const navigate = useNavigate()

  function getCourse(){
    
    fetch(import.meta.env.VITE_API_COURSE_URL + "/getCourse/"+id,{
      method:"GET",
      credentials:"include"
    })

    .then(res=>res.json())
    .then(res=>{
      if(res.success){
        setCourse(res.course)
        setPreview(res.course.photo ? `${import.meta.env.VITE_API_FILE_URL}/${res.course.photo}` : "")
        setApercu(res.course.preview ? `${import.meta.env.VITE_API_PREVIEW_URL}/${res.course.preview}` : "")
        setTitle(res.course.title)
        setDescription(res.course.description)
        setVisibility(res.course.visibility)
        setLearn(res.course.learn ? JSON.parse(res.course.learn) : [""])
        setDifficulty(res.course.difficulty!)
        setPayValue(res.course.price)
        setPayement(res.course.price === 0 ? "free" : "premium")
        
      }else{
        navigate("/teach/content")
      }
    })
  }

  useEffect(()=>{
    getCourse()
    
  },[])

  function handleSubmit(e:FormEvent<HTMLFormElement>){
    e.preventDefault();
    if(visibility=="published"){
      if(title.trim()=="" || desc.trim()=="" || (course?.type == "course" && difficulty.trim()=="" ) || learn.filter(l=>l.trim()!="").length==0 || payement.trim() =="" || (payement=="premium" && payValue<=0) || !apercu || !preview){
        setMessage("Please fill all the required fields to publish the course !");
        setColor("red");
        return;

    }

    

  }
        const f = document.getElementById("form5") as HTMLFormElement
        const formData = new FormData(f)

       
        
        
        
        
            if(photo){
              formData.append("photo", photo);
            }
            if(video){
              formData.append("video", video!);
            }
            
            
            formData.append("courseId", id.toString());
            formData.append("type", course?.type!);
            
            formData.append("visibility", visibility);
            
            formData.append("difficulty", difficulty);
            formData.append("title1", title.toString().trim());
            
            formData.append("description", desc?.toString() ?? "");
            formData.append("payement", payement);
            formData.append("price1", payValue?.toString() ?? "0");
            formData.append("learn", JSON.stringify(learn));

        fetch(import.meta.env.VITE_API_COURSE_URL + "/update",{
            method:"PATCH",
            
            credentials:"include",
            body:formData
        })

        .then(res=>res.json())
        .then(res=>{
        
            if(res.success){
                setMessage("course modified successfully")
                setColor("green")
                onSuccess && onSuccess()
                
                
            }else{
                setMessage(res.message)
            }
        })

}

  return (
    
        <div>
          <h4>Course informations</h4>
          <div className="flex flex-col gap-8 w-full  items-center flex-wrap justify-center  lg:flex-nowrap mt-10 ">
            <form id="form5" onSubmit={handleSubmit} className="flex px-2 flex-col gap-6 w-full">
              <div className="form-group flex flex-col gap-2 w-full  ">
                <label  className="text-[#333333] font-bold">
                  Course title
                </label>
                <input
                  name="title"
                  onChange={e=>setTitle(e.target.value)}
                  value={title}
                  type="text"
                  placeholder="Exp: Photoshop for beginners"
                  className="w-full p-4 border-2 border-[#00000029] rounded-sm"
                />
              </div>

              <div className="form-group flex flex-col gap-2 w-full  ">
                <label  className="text-[#333333] font-bold">
                  Course Description
                </label>
                <textarea
                  name="descr"
                  value={desc}
                  onChange={e=>setDescription(e.target.value)}
                  placeholder="Exp: From 0 to hero: this course will make you the best in photoshop ..."
                  className="w-full p-4 border-2 border-[#00000029] rounded-sm"
                ></textarea>
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
                <label  className="text-[#333333] font-bold">
                  Course Payement
                </label>
                <div className="flex flex-row gap-2 w-full font-medium">
                  <input
                    checked={payement == "free" }
                    value={"free"}
                    onChange={(e) => setPayement(e.target.value)}
                    type="radio"
                    name="payement"
                    
                    className=" w-12 p-4 border-2 border-[#0c24436d] rounded-sm"
                  />{" "}
                  Free
                </div>
                <div className="flex flex-row gap-2 w-full font-medium">
                  <input
                    checked={payement == "premium" }
                    value={"premium"}
                    onChange={(e) => setPayement(e.target.value)}
                    type="radio"
                    name="payement"
                   
                    className=" w-12 p-4 border-2 border-[#0c24436d] rounded-sm"
                  />{" "}
                  Premium
                </div>
              </div>
              <div
                className={`${
                  payement == "premium" ? "flex" : "hidden"
                } form-group  flex-col gap-2 w-full  `}
              >
                <label htmlFor="" className="text-[#333333] font-bold">
                  Course Price
                </label>
                <input
                  name="price"
                  onChange={e=>setPayValue(Number(e.target.value))}
                  value={payValue! > 0 ? payValue : ""}
                  type="number"
                  placeholder="Exp: 6000"
                  className="w-full p-4 border-2 border-[#0c24436d] rounded-sm"
                />
              </div>
              <div className="form-group flex flex-col gap-2 w-full  ">
                <label htmlFor="" className="text-[#333333] font-bold">
                  Course Status (once changed to "published" the course will be
                  shared in the platform to be seen by learners !)
                </label>
                <div className="flex flex-row gap-2 w-full font-medium">
                  <input
                    checked={visibility == "draft"}
                    value={"draft"}
                    onChange={e=>setVisibility(e.target.value)}
                    type="radio"
                    name="vis"
                    className=" w-12 p-4 border-2 border-[#0c24436d] rounded-sm"
                  />
                  Draft
                </div>
                <div className="flex flex-row gap-2 w-full font-medium">
                  <input
                    checked={visibility == "published"}
                    value={"published"}
                    type="radio"
                    onChange={e=>setVisibility(e.target.value)}
                    name="vis"
                    className=" w-12 p-4 border-2 border-[#0c24436d] rounded-sm"
                  />{" "}
                  Published
                </div>
              </div>
              {course?.type=="course" && (
                <div className="form-group flex flex-col gap-2 w-full  ">
                <label htmlFor="" className="text-[#333333] font-bold">
                  Course difficulty
                </label>
                <select
                  
                  className=" w-full p-4 border-2 border-[#0c24436d] rounded-sm"
                  value={difficulty}
                  onChange={e=>setDifficulty(e.target.value)}
                >
                  <option value="easy">Begginer</option>
                  <option value="medium">Intermediate</option>
                  <option value="hard">Advanced</option>
                  <option value="all">Mixed levels</option>
                </select>
              </div>
              )}
              
              
              <div className={` form-group flex  flex-col gap-2 w-full  `}>
                <p className="text-[#333333] font-bold">
                  Course thumbnail (a descriptive photo for your course Max 2MB)
                </p>
                <label
                  htmlFor="thumbnail"
                  className="text-[#333333] box font-bold"
                >
                  
                  {preview && (
                    <img src={preview} alt="thumbnail" className="preview" />
                  )}
                </label>

                <input
                  type="file"
                  id="thumbnail"
                  onChange={(e) => handleFileChange(e)}
                  accept="image/*"
                  placeholder="Exp: 6000"
                  className="w-full p-4 border-2 border-[#0c24436d] rounded-sm"
                />
              </div>

              <div className={` form-group flex  flex-col gap-2 w-full  `}>
                <p className="text-[#333333] font-bold">
                  Course Preview (a descriptive video for your course Max 2MB)
                </p>
                <label htmlFor="video" className="text-[#333333] relative z-20 box font-bold">
                  {!apercu && <Plus />}
                  {apercu && <video src={apercu} className="w-full h-auto"  />}
                </label>

                <input
                  type="file"
                  id="video"
                  onChange={(e) => handleApercuChange(e)}
                  accept="video/*"
                  placeholder="Exp: 6000"
                  className="w-full hidden p-4 border-2 border-[#0c24436d] rounded-sm"
                />
              </div>
              <Alert message={message} color={color} /> 
              <button
                
                className={`${course?.type == "course" ? "cta":"cta cta-education"} main-btn text-[12px] px-2 py-3  squircle sm:px-12 sm:py-3 sm:text-[16px] md:px-12 md:py-3 md:text-[18px] lg:px-12 lg:py-3 lg:text-[18px]`}
              >
                Submit changes
              </button>
            </form>
          </div>
        </div>

        
        
        
    
    
  );
}

export default CreateCourseForm;
