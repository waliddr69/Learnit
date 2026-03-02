import {
  ChevronRight,
  FileText,
  
  Pin,
  
  PlaySquare,
  Plus,
  Trash,
  Trash2,

} from "lucide-react";


import { useEffect, useState } from "react";


import type { Content } from "@/types/courses";
import Alert from "../alertMsg/alert";

type params = {
    id: number,
    modify?:boolean
}

function Chapters({ id, modify}: params) {
  
  const [activeChapter, setActiveChapter] = useState<number | null>(null);
  const [chapterinp, showChapterinp] = useState(false);
  const [content, setContent] = useState("");
  const [contentType, setContentType] = useState<"video" | "pdf" | "">("");
  const [lessoninp, showLessonInp] = useState(false);
  const [chapters, showChapters] = useState<Content[]>([]);
  const [lessonTitle, setLessonTitle] = useState("");
  const [selectedChaps, setSelectedChaps] = useState<number[]>([]);
  

  

  const[file,setFile] = useState<File | null>(null)

  

  const [messageChap,setMessageChap] = useState("")
  const [cChap,setCChap] = useState("")

  
  

  const getContent = ()=>{
    fetch(import.meta.env.VITE_API_COURSE_URL + "/getContent?id="+id,{
      method:"GET",
      credentials:"include",
      
    })

    .then(res=>res.json())
    .then(res=>{
      if(res.success){
        console.log(res)
        showChapters(res.content.chapters)
      }
    })
  }



  function handleAddChapter(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;

    const chapter = form.querySelector(
      'input[name="chapter"]'
    ) as HTMLInputElement;
    if (chapter && chapter.value.trim() !== "") {
      const c = chapter.value.trim()
      fetch(import.meta.env.VITE_API_COURSE_URL + "/addChapter",{
        method:"POST",
        headers:{"Content-Type":"application/json"},
        body:JSON.stringify({c,id})

      })
      .then(res=>res.json())
      .then(res=>{
        console.log(res)
        setMessageChap(res.message)
        if(res.success){
          
          setCChap("green")
          showChapters([
        ...chapters,
        { id:res.chapter, name: chapter.value.trim(), lessons: [] },
      ]);
      chapter.value = "";
      showChapterinp(false);

        }else{
          
          setCChap("red")
        }
      })
      
    }else{
        setMessageChap("Chapter name cannot be empty")
        setCChap("red")
    }
  }

  
  const [message,setMessage] = useState("")
    const [color,setColor] = useState("")
  

  

  useEffect(()=>{
    
    getContent()
  },[])

  function getVideoDuration(file: File): Promise<number> {
  return new Promise((resolve, reject) => {
    const video = document.createElement("video")
    video.preload = "metadata"
    video.src = URL.createObjectURL(file)

    video.onloadedmetadata = () => {
      resolve(Math.floor(video.duration))
      URL.revokeObjectURL(video.src)
    }

    video.onerror = reject
  })
}


  async function handleAddLesson(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const lesson = form.querySelector(
      'input[name="lesson"]'
    ) as HTMLInputElement;

    
    
    const contentInput = form.querySelector(
      'input[id="content"]'
    ) as HTMLInputElement;
    let duration = 0;

    if(contentType=="video"){
       duration = await getVideoDuration(contentInput.files![0])
      }
      


    
    if (lesson && lesson.value.trim() !== "" && contentInput && file) {
      const formData = new FormData();
      formData.append("title", lesson.value.trim());
      formData.append("contentType", contentType);
      formData.append("chapterId", activeChapter!.toString());
      formData.append("file", contentInput.files![0]);
      formData.append("duration",duration.toString())
      fetch(import.meta.env.VITE_API_COURSE_URL + "/addLesson",{
        method:"POST",
        body:formData
      })
      .then(res=>res.json())
      .then(res=>{
        console.log(res)
        setMessage(res.message)
        setColor(res.success ? "green" : "red")
        if(res.success){
          showChapters((prev) =>
        prev.map((ch) =>
          ch.id === activeChapter
            ? {
                ...ch,
                lessons: [
                  ...ch.lessons,
                  { id:res.lesson, name: lessonTitle.trim(), type: contentType },
                ],
              }
            : ch
        )
      );

      

     

      lesson.value = "";
      contentInput.value = "";
      setContent("");
      setContentType("")
      showLessonInp(false);
     
        }
      })
      
      
    }else{
        setMessage("All fields are mandatory")
        setColor("red")
    }
  }

  const [diag,setDiag] = useState<number|null>(null)
  const [diagL,setDiagL] = useState<number|null>(null)

  function handleContentChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file) {
      setContent(URL.createObjectURL(file));
    }
    if (file.type == "application/pdf") {
      setContentType("pdf");
      setFile(file)
      return "pdf";
    }
    else if (file.type.startsWith("video/")) {
      setContentType("video");
      setFile(file)
      return "video";
    }else{
        setMessage("Unsupported file type. Please upload a video or PDF.");
        setColor("red")
    }
  }
  

  useEffect(() => {
    return () => {
      content && URL.revokeObjectURL(content);
    };
  }, [content]);

  function deleteChapter(id:number){
      fetch(import.meta.env.VITE_API_COURSE_URL + "/deleteChapter",{
        method:"DELETE",
        headers:{"Content-Type":"application/json"},
        body:JSON.stringify({id})
      })
      .then(res=>res.json())
      .then(res=>{
        console.log(res)
        showChapters(chapters.filter(e=>e.id!==id))
        setDiag(null)
      })
  }

  function deleteLesson(id:number){
      fetch(import.meta.env.VITE_API_COURSE_URL + "/deleteLesson",{
        method:"DELETE",
        headers:{"Content-Type":"application/json"},
        body:JSON.stringify({id})
      })
      .then(res=>res.json())
      .then(res=>{
        console.log(res)
        showChapters(
        chapters.map(chapter => ({
          ...chapter, 
          lessons: chapter.lessons.filter(lesson => lesson.id !== id) 
        }))
      )

        setDiagL(null)
      })
  }
  

  

  return (
    
        <><div className="flex flex-col gap-4">
          <h4>Course content</h4>
          <div>
              {chapters.map((chapter, i) => {
                  const isOpen = selectedChaps.includes(chapter.id);

                  return (
                      <div key={chapter.id}>
                          <div
                              onClick={() => {
                                  setActiveChapter(chapter.id);
                                  setSelectedChaps((prev) => prev.includes(chapter.id)
                                      ? prev.filter((c) => c !== chapter.id)
                                      : [...prev, chapter.id]
                                  );
                              } }
                              className={`chapter py-4 px-2 bg-[#DBEBFF] ${i == 0 ? "rounded-t-3xl border-b-2 border-[#00000051]" : ""}  ${i == chapters.length - 1 && i != 0 ? "rounded-b-3xl" : "border-b-2 border-[#00000051]"} ${isOpen ? "rounded-b-none" : ""}  flex gap-2  cursor-pointer`}
                          >
                              <ChevronRight className={isOpen ? "selected-chapter" : ""} />
                              <p className="chapter-name">{chapter.name}</p>
                              {!modify && (
                                <><Trash onClick={() => setDiag(chapter.id)} className="ml-auto mr-2 text-[#4b87ee] p-1   rounded-full hover:bg-[#6493e373]" size={30} />
                                {diag && 
                                <div className="dialogue fixed top-1/2 rounded-3xl -translate-x-1/2 gap-10 items-center -translate-y-1/2 z-50 left-1/2 bg-white p-4 flex flex-col">
                                  <Trash2  className="p-2 text-[#ff4a4a] bg-[#ff6e6e4e] rounded-3xl" size={40}/>
                                  <h4 className="font-bold">Delete this chapter with its lessons permanently?</h4>
                                  <div className="btns">
                                    <button onClick={()=>setDiag(null)} className="border border-[#10305A] px-4 py-2 rounded-3xl text-[#10305A] cursor-pointer">Keep Chapter</button>
                                    <button onClick={()=>deleteChapter(diag)} className="bg-[#10305A] cursor-pointer text-white px-4 py-2 rounded-3xl">Delete Chapter</button>
                                  </div>

                                </div>}
                                </>
                              )
                              }
                          </div>

                          {isOpen && (
                              <div className={`chapter-content  px-4 py-3 bg-[#edf5ff] flex flex-col gap-3 border-b  border border-[#0000001b]`}>
                                  {chapter.lessons.length > 0 ? (
                                      <>
                                          {chapter.lessons.map((lesson) => (
                                              <div
                                                  key={lesson.id}
                                                  className="flex gap-2 border-b pb-4 border-[#0000006c] items-center"
                                              >
                                                  {lesson.type === "video" ? (
                                                      <PlaySquare />
                                                  ) : (
                                                      <FileText />
                                                  )}

                                                  <p>{lesson.name}</p>
                                                  {!modify && (
                                                  <><Trash onClick={() => setDiagL(lesson.id)} className="ml-auto cursor-pointer text-[#4b87ee] p-1   rounded-full hover:bg-[#6493e373]" size={30} />
                                                  {diagL && 
                                                  <div className="dialogue fixed top-1/2 rounded-3xl -translate-x-1/2 gap-10 items-center -translate-y-1/2 z-50 left-1/2 bg-white p-4 flex flex-col">
                                                    <Trash2  className="p-2 text-[#ff4a4a] bg-[#ff6e6e4e] rounded-3xl" size={40}/>
                                                    <h4 className="font-bold">Delete this lesson permanently?</h4>
                                                    <div className="btns">
                                                      <button onClick={()=>setDiagL(null)} className="border border-[#10305A] px-4 py-2 rounded-3xl text-[#10305A] cursor-pointer">Keep lesson</button>
                                                      <button onClick={()=>deleteLesson(diagL)} className="bg-[#10305A] cursor-pointer text-white px-4 py-2 rounded-3xl">Delete lesson</button>
                                                    </div>

                                                  </div>}
                                                  </>
                                                )
                                                }
                                              </div>
                                          ))}
                                          {!modify && <button
                                              onClick={() => {
                                                  setActiveChapter(chapter.id);
                                                  showLessonInp(true);
                                                  
                                              setMessage("")
                                                setColor("")
                                              } }
                                              className="text-sm cursor-pointer text-blue-600"
                                          >
                                              + Add lesson
                                          </button>}
                                      </>
                                  ) : (
                                      !modify ? <button
                                          onClick={() => {
                                              setActiveChapter(chapter.id);
                                              showLessonInp(true);
                                              setMessage("")
                                              setColor("")
                                          }}
                                          className="text-sm cursor-pointer text-blue-600"
                                      >
                                          + Add first lesson
                                      </button>:<p className="text-[#333333]">
                                        No lessons in this chapter yet !
                                      </p>
                                      
                                  )}
                              </div>
                          )}
                      </div>
                  );
              })}
          </div>

          {!modify && <button
              onClick={() => {
                  showChapterinp(true);
                  setMessageChap("");
                  setCChap("");
              } }
              className="flex  flex-row gap-2 items-center justify-center py-2 px-5 text-white rounded-3xl cursor-pointer bg-[#10305A] w-fit"
          >
              <Plus />
              <p>Add Chapter</p>
          </button>}
      </div><div
          className={` fixed ${chapterinp ? "flex" : "hidden"} items-center rounded-3xl z-20 bg-white p-4  left-1/2 transform -translate-y-1/2 -translate-x-1/2 flex-col gap-6 `}
      >
              <h5 className="font-bold">Add chapter</h5>
              <Alert message={messageChap} color={cChap} />
              <form
                  action=""
                  onSubmit={handleAddChapter}
                  className="flex flex-col gap-5"
              >
                  <input type="text" placeholder="Chapter name" name="chapter" />
                  <button
                      type="submit"
                      className="bg-[#10305A] cursor-pointer text-white px-4 py-2 rounded-3xl"
                  >
                      Add
                  </button>
              </form>
          </div><div
              className={` fixed ${lessoninp ? "flex" : "hidden"} items-center rounded-3xl z-20 bg-white p-4 w-[80%] sm:w-[50%]   left-1/2 transform top-0 bottom-0 -translate-x-1/2 flex-col gap-6 `}
          >
              <h5 className="font-bold">Add Lesson</h5>
              <form
                  action=""
                  onSubmit={handleAddLesson}
                  className="flex flex-col w-full overflow-y-auto gap-5"
              >
                <Alert message={message} color={color} />   
                  <input
                      onChange={(e) => setLessonTitle(e.target.value)}
                      type="text"
                      placeholder="lesson name"
                      className="w-full p-4 border-2 border-[#0c24436d] rounded-sm"
                      name="lesson" />
                  <div className={` form-group flex  flex-col gap-2 w-full  `}>
                      <p className="text-[#333333] font-bold">
                          lesson content (could be a video, or a pdf)
                      </p>
                      <label
                          htmlFor="content"
                          className="text-[#333333] relative z-20 w-full box font-bold"
                      >
                          {!content && <Plus />}
                          {content && (
                              <object data={content} className="preview relative z-10" />
                          )}
                      </label>

                      <input
                          type="file"
                          id="content"
                          onChange={(e) => handleContentChange(e)}
                          className="w-full hidden p-4 border-2 border-[#0c24436d] rounded-sm" />
                  </div>
                  <button
                      type="submit"
                      className="bg-[#10305A] cursor-pointer text-white px-4 py-2 rounded-3xl"
                  >
                      Add
                  </button>
              </form>

          </div><div
              className={` ${chapterinp || lessoninp || diag || diagL ? "block" : "hidden"} bg-[rgba(0,0,0,0.4)]  fixed inset-0`}
              onClick={() => {
                  setDiag(0)
                  showChapterinp(false);
                  showLessonInp(false);
              } }
          ></div></>
      
   
    
  );
}

export default Chapters;
