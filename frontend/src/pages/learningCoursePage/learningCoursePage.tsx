import { ArrowLeft, ChevronLeft, Play, UserStar } from "lucide-react";

import vid from "../../assets/videos/hero (3).mp4";

import { Star } from "lucide-react";
import "./learningCoursePage.css";

import { FileText } from "lucide-react";
import { SquarePlay } from "lucide-react";

import { useEffect, useRef, useState } from "react";

import { Check } from "lucide-react";

import { ChevronRight } from "lucide-react";
import { MessageSquareQuote } from "lucide-react";

import RatingStars from "./ratingStars";
import Footer from "@/components/footer/footer";
import { useLocation, useNavigate } from "react-router-dom";
import type { enrollements } from "@/types/enrollements";
import type { Lesson } from "@/types/lessons";
import type { Chapter } from "@/types/chapter";
import { Document, Page, pdfjs } from "react-pdf";
import { addComment } from "@/services/commentService";
import Alert from "@/components/alertMsg/alert";

function LearningCourse() {
  pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.mjs`;

  const [show, setShow] = useState(false);
  const [showRev, setShowRev] = useState(false);
  const [showRateCourse, setShowRateCourse] = useState(false);
  const [showRateIns, setShowRateIns] = useState(false);
  const [color,setColor] = useState("")
  const [message,setMessage] = useState("")
  const [selectedCourse, setSelectedCourse] = useState<Number>();
  const [selectedChaps, setSelectedChaps] = useState<number[]>([]);
  const [chapters, setChapters] = useState<Chapter[]>([]);
  const [enr, setEnr] = useState<enrollements>();
  const [lessons, setLessons] = useState<Lesson[]>([]);
  const [progress, setProgress] = useState<number>(0);
  const location = useLocation();
  const [comment,setComment] = useState("")
  const [src, setSrc] = useState<Lesson>();
  const [pageNumber, setPageNumber] = useState(1);
  const [numPages, setNumPages] = useState<number | null>(null);
  const navigate = useNavigate();
  const id = location.pathname.split("/")[2];
  async function getEnr() {
    
    const req = await fetch(
      import.meta.env.VITE_API_PAY_URL + "/getByCourse?id=" + id,
      {
        method: "GET",
        credentials: "include",
      },
    );

    const res = await req.json();
    if (res.success) {
      setChapters(res.enr[0].course.chapters);
      setEnr(res.enr[0]);
      const l = res.enr[0].course.chapters.flatMap((e: any) => e.lessons)
      setLessons(l);
       
      setSrc(l.filter((_:any,i:number)=>i+1==Math.floor((res.enr[0].progress / 100) * l.length,))[0])
      
      setSelectedChaps([...chapters,l.filter((_:any,i:number)=>i+1>Math.floor((res.enr[0].progress / 100) * l.length))[0]?.chapterId])
      setSelectedCourse(l.filter((_:any,i:number)=>i+1>Math.floor((res.enr[0].progress / 100) * l.length))[0]?.id)
      setProgress(res.enr[0].progress);
      
    
    } else {
      navigate(-1);
    }
  }

  const getLessonIndex = (id: number) => {
    return lessons.findIndex((l) => l.id === id) + 1;
  };
  
  const videoRef = useRef<HTMLVideoElement | null>(null);

  const handleTimeUpdate = (id: number) => {
    
    if (videoRef.current?.currentTime == videoRef.current?.duration) {
      setProgress((prev) =>
        Math.max((getLessonIndex(id) / lessons.length) * 100, prev),
        );
    }
  };

  useEffect(() => {
    if (src?.type === "video" && videoRef.current) {
      videoRef.current.currentTime = 0;
    }

    if (src?.type === "pdf") {
      setPageNumber(1);
    }
  }, [src]);

  useEffect(() => {
    if (!src || src.type !== "pdf") return;

    if (pageNumber === numPages && numPages > 0) {
      setProgress((prev) =>
        Math.max((getLessonIndex(src.id) / lessons.length) * 100, prev),
        );
    }
  }, [pageNumber, numPages, src]);

  const onSelectLesson = (id: number, src: Lesson) => {
    setSelectedCourse(id);
    setSrc(src);
  };

  async function updateProgress(){
    await fetch(import.meta.env.VITE_API_PAY_URL+"/updateProgress",{
        method:"PATCH",
        credentials:"include",
        headers:{"Content-Type":"application/json"},
        body:JSON.stringify({progress,id})
    })

    
    
  }

  useEffect(()=>{
    if (!enr) return
    updateProgress()
  },[progress])

  useEffect(() => {
    getEnr();
  }, []);
  return (
    <>
      <main className="flex flex-col pb-20 md:pb-20 gap-6 md:p-5 bg-[#dbebff]  ">
        <div className="first-level-content flex-col lg:flex-row w-full flex-1  relative flex gap-6">
          <div className="left w-full lg:w-[70%] h-fit  bg-white lg:p-10 pb-10 rounded-3xl flex flex-col gap-6 shadow-lg border-2 border-[#E1E2F3]">
            <div className="video-wrapper w-full relative overflow-auto h-[200px] sm:h-[300px] md:h-[400px] lg:h-[500px] border-1 rounded-3xl border-[#E1E2F3]">
              {src?.type == "pdf" ? (
                <Document
                  className="intro flex flex-col relative inset-0 object-cover w-full h-full"
                  file={`${import.meta.env.VITE_API_PDF_URL}/${src?.file}`}
                  onLoadSuccess={({ numPages }) => {
                    setNumPages(numPages);
                    setPageNumber(1);
                  }}
                >
                  <div className="flex sticky z-20 py-1 bg-white px-2 top-0 justify-between items-center mt-2">
                    <button
                      onClick={() => setPageNumber((p) => Math.max(p - 1, 1))}
                      disabled={pageNumber === 1}
                      className="bg-blue cursor-pointer previous rounded-lg p-2"
                      style={{ backgroundColor: "oklch(62.3% 0.214 259.815)" }}
                    >
                      <ChevronLeft color="white" />
                    </button>

                    <span>
                      Page {pageNumber} / {numPages}
                    </span>

                    <button
                      onClick={() =>
                        setPageNumber((p) => Math.min(p + 1, numPages || p))
                      }
                      disabled={pageNumber === numPages}
                      className="bg-blue previous cursor-pointer rounded-lg p-2"
                      style={{ backgroundColor: "oklch(62.3% 0.214 259.815)" }}
                    >
                      <ChevronRight color="white" />
                    </button>
                  </div>
                  <Page pageNumber={pageNumber} className={" self-center"} />
                </Document>
              ) : (
                <video
                  src={`${import.meta.env.VITE_API_VIDEO_URL}/${src?.file}`}
                  className="intro absolute inset-0 object-cover w-full h-full"
                  onTimeUpdate={() => handleTimeUpdate(src?.id!)}
                  ref={videoRef}
                  controls
                ></video>
              )}
            </div>

            <h3 className="text-[#061323] px-10 lg:px-0">
              {enr?.course.title}
            </h3>
            <div className="instructor bg-[#f1f1f1] p-2 rounded-3xl flex flex-col justify-start items-start md:flex-row gap-4 ">
              <div className="flex flex-row shrink-0   gap-2 items-center">
                <div
                  className="instructor-photo bg-black rounded-3xl"
                  style={{
                    backgroundImage: `url(${
                      import.meta.env.VITE_API_FILE_URL
                    }/${enr?.course.creator?.photo})`,
                    backgroundSize: "cover",
                  }}
                ></div>
                <div className="flex flex-col gap-2">
                  <p className="text-lg">
                    {enr?.course.creator?.fname} {enr?.course.creator?.lname}
                  </p>
                  <div className="stars-rating flex gap-1">
                    <Star className="fill-yellow-400" stroke="none" />
                    <Star className="fill-yellow-400" stroke="none" />
                    <Star className="fill-yellow-400" stroke="none" />
                    <Star className="fill-yellow-400" stroke="none" />
                    <Star className="stroke-2 stroke-yellow-400" />
                  </div>
                </div>
              </div>
              {enr?.course?.creator?.bio && (
                <p className="bio self-center">{enr?.course.creator.bio}</p>
              )}
            </div>
            <div className="grid px-10 lg:px-0 grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4  justify-between">
              <button
                onClick={() => setShow(!show)}
                className={`py-2 ${
                  show ? "clicked" : ""
                } description-btn  px-3 bg-blue-500 rounded-3xl flex items-center w-fit text-white font-semibold cursor-pointer`}
              >
                Description <ChevronRight className="transition-all" />
              </button>
              <button
                onClick={() => {
                  setShowRev(true)
                  setComment("")
                  setMessage("")
                  setColor("")
                }}
                className={`py-2 ${
                  show ? "clicked" : ""
                }  px-3 bg-blue-500 rounded-3xl gap-2 flex w-fit items-center text-white font-semibold cursor-pointer`}
              >
                <MessageSquareQuote />
                Write a review
              </button>
              <button
                onClick={() => setShowRateCourse(true)}
                className={`py-2 ${
                  show ? "clicked" : ""
                }  px-3 bg-blue-500 rounded-3xl gap-2 flex items-center w-fit text-white font-semibold cursor-pointer`}
              >
                <Star />
                Rate this course
              </button>
              <button
                onClick={() => {
                  setShowRateIns(true)
                  setMessage("")
                  setColor("")
                }}
                className={`py-2 ${
                  show ? "clicked" : ""
                }  px-3 bg-blue-500 rounded-3xl gap-2 flex w-fit items-center text-white font-semibold cursor-pointer`}
              >
                <UserStar />
                Rate this instructor
              </button>
            </div>

            <div
              className={`add-review flex flex-col gap-6 text-center ${
                showRev ? "flex" : "hidden"
              } -translate-y-1/2 translate-x-1/2 z-1000 p-4 w-[90%] md:w-1/2 fixed top-1/2 right-1/2 bg-white rounded-3xl `}
            >
              <h3>Add your review on this course</h3>
              <form
                onSubmit={async(e)=>{
                  e.preventDefault()
                    const res = await addComment(enr?.course.id!,comment)
                    if(res.success){
                      setMessage("review added successfuly!")
                      setColor("green")
                     
                      setComment("")
                      
                    }else{
                      setMessage(res.message)
                      setColor("rgb(205,61,100)")
                    }
                  }}
                className="w-full items-center flex flex-col gap-4 justify-center"
              >
                <Alert message={message} color={color}/>
                <div className="form-group flex  items-center w-[90%] justify-center  border border-[#10305A]  rounded-3xl">
                  <textarea
                    placeholder="Write your review..."
                    name="message"
                    className="flex-1 pl-2 py-6"
                    value={comment}
                    onChange={e=>setComment(e.target.value)}
                  />
                </div>
                <button
                  type="submit"
                  
                  className="cta main-btn text-[12px] px-2 py-3  squircle sm:px-12 sm:py-3 sm:text-[16px] md:px-12 md:py-3 md:text-[18px] lg:px-12 lg:py-3 lg:text-[18px]"
                >
                  Send
                </button>
              </form>
            </div>
            <div
              className={`add-review flex flex-col gap-6 text-center ${
                showRateCourse ? "flex" : "hidden"
              } w-[90%] md:w-1/2 -translate-y-1/2 h-fit translate-x-1/2 z-1000 p-4 w-1/2 fixed top-1/2 right-1/2 bg-white rounded-3xl `}
            >
              <h3>Rate this Course</h3>
              <Alert message={message} color={color}/>
              <RatingStars type="course" courseId={enr?.course.id!} onClick={()=>{
                
                setMessage("review added successfuly!")
                setColor("green")
              }}/>
            </div>
            <div
              className={`add-review flex flex-col gap-6 text-center ${
                showRateIns ? "flex" : "hidden"
              } w-[90%] md:w-1/2 -translate-y-1/2 h-fit translate-x-1/2 z-1000 p-4 w-1/2 fixed top-1/2 right-1/2 bg-white rounded-3xl `}
            >
              <h3>Rate this Instructor</h3>
              <Alert message={message} color={color}/>
              <RatingStars type="instructor" creatorId={enr?.course.creator?.id} onClick={()=>{
                setShowRateCourse(false)
                setMessage("review added successfuly!")
                setColor("green")
                
              }}/>
            </div>

            <p
              className={`description ${
                show ? "block" : "hidden"
              } px-10 lg:px-0 `}
            >
              {enr?.course.description}
            </p>
          </div>
          <div className="course-content w-full sticky top-6 lg:w-[30%] h-fit bg-white p-10 rounded-3xl flex  flex-col gap-6 shadow-lg border-2 border-[#E1E2F3]">
            <h4 className="font-bold">Course content:</h4>
            <div className="flex gap-4 ">
              <div className="other-info">
                <div className="flex gap-2">
                  <FileText color="#364559" />{" "}
                  <p className="text-[#364559]">
                    {lessons.filter((e) => e.type == "pdf").length} articles
                  </p>
                </div>
              </div>
              <div className="other-info">
                <div className="flex gap-2">
                  <SquarePlay color="#364559" />{" "}
                  <p className="text-[#364559]">
                    {lessons.filter((e) => e.type == "video").length} videos
                  </p>
                </div>
              </div>
            </div>
            <div className="progress flex flex-col gap-2 pb-4 border-b-3 border-[#00000022]">
              <h6>Progress</h6>
              <div className="flex flex-row gap-4 relative items-center">
                <p className={`${progress==100 ? "completed-anim":"invisible"} absolute right-0 -top-10 rotate-10 text-green-500 font-bold`}>Completed!</p>
                <div className="completion-wrapper h-4 flex-1 bg-[#E1E2F3] rounded-3xl overflow-hidden">
                  <div
                    className={`completion  rounded-3xl h-full ${progress==100?"bg-green-400":"bg-[#2f2bff]"}   transition-all `}
                    style={{ width: progress! + "%" }}
                  ></div>
                </div>
                <p>{progress!}%</p>
              </div>
            </div>
            <div className="chapters">
              <h4 className="font-bold">Chapters:</h4>
              {chapters.map((c) => (
                <>
                  <div className="chapter chapter1 py-4 px-2 flex flex-col gap-2 border-b-2 border-[#B6BEC9] ">
                    <div
                      onClick={() => {
                        selectedChaps.includes(c.id)
                          ? setSelectedChaps(
                              selectedChaps.filter((f) => f != c.id),
                            )
                          : setSelectedChaps([...selectedChaps, c.id]);
                      }}
                      className="flex flex-row gap-2"
                    >
                      <ChevronRight
                        className={`${
                          selectedChaps.includes(c.id) ? "selected-chapter" : ""
                        }`}
                      />
                      <p className="chapter-name font-semibold">{c.name}</p>
                    </div>
                    <div
                      className={`chapter-content ${
                        selectedChaps.includes(c.id) ? "" : "hidden"
                      }  px-4 py-3 rounded-b-3xl  border-[#B6BEC9] bg-white flex flex-col gap-3`}
                    >
                      <ul className="lesson flex text-lg flex-col gap-4">
                        {lessons
                          .filter((l) => l.chapterId === c.id)
                          .map((l) => {
                            if (l.chapterId == c.id) {
                              return (
                                <li
                                  onClick={() => onSelectLesson(l.id, l)}
                                  className={`flex gap-2 items-center ${
                                    selectedCourse == l.id
                                      ? "selected-course"
                                      : ""
                                  }`}
                                >
                                  <div className={`h-6 w-6 rounded-md border-2 ${Math.floor(
                                          (progress / 100) * lessons.length,
                                        ) >= getLessonIndex(l.id) && selectedCourse != l.id ? "bg-green-500":""}  flex justify-center items-center border-[#B6BEC9]`}>
                                    {Math.floor(
                                          (progress / 100) * lessons.length,
                                        ) >= getLessonIndex(l.id) && selectedCourse != l.id
                                          &&(
                                            <Check
                                            color="white"
                                            
                                            />
                                          )}
                                    
                                    <Play
                                      className={`${
                                        selectedCourse == l.id
                                          ? "block"
                                          : "hidden"
                                      } fill-[#ede8ff]`}
                                      size={15}
                                      stroke="#ede8ff"
                                      color="white"
                                    />
                                  </div>
                                  {l.type == "pdf" ? (
                                    <FileText />
                                  ) : (
                                    <SquarePlay />
                                  )}
                                  <p>{l.name}</p>
                                </li>
                              );
                            }
                          })}
                      </ul>
                    </div>
                  </div>
                </>
              ))}
            </div>
          </div>
        </div>

        {(showRev || showRateCourse || showRateIns) && (
          <div
            className="overlay-course-page fixed inset-0 "
            onClick={() => {
              setShowRev(false);
              setMessage("")
              setColor("")
              setComment("")
              setShowRateCourse(false);
              setShowRateIns(false);
            }}
          ></div>
        )}
      </main>
      <Footer />
    </>
  );
}

export default LearningCourse;
