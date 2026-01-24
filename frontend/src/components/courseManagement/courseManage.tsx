import {
  ChevronRight,
  FileText,
  
  PlaySquare,
  Plus,
 
  Users,
} from "lucide-react";
import { MessageSquareQuote } from "lucide-react";
import { Star } from "lucide-react";
import "./courseManage.css";
import { useEffect, useState } from "react";
import Review from "../Review/review";
import { X } from "lucide-react";
import { Wallet } from "lucide-react";
import ApexChart from "../charts/enrollChart/chart";
import ApexGrid from "../charts/apexGrid/apexGrid";

type lesson = {
  title: string;
  content: "video" | "pdf";
};
type Content = {
  chapter: string;
  lessons: lesson[];
};
function CourseManage() {
  const [reviews, showReviews] = useState(false);
  const [activeChapter, setActiveChapter] = useState<string | null>(null);
  const [chapterinp, showChapterinp] = useState(false);
  const [content, setContent] = useState("");
  const [contentType, setContentType] = useState<"video" | "pdf">("video");
  const [lessoninp, showLessonInp] = useState(false);
  const [chapters, showChapters] = useState<Content[]>([]);
  const [lessonTitle, setLessonTitle] = useState("");
  const [selectedChaps, setSelectedChaps] = useState<string[]>([]);
  const [payement, setPayement] = useState<string>("");
  const [preview, setPreview] = useState<string>("");
  const [apercu, setApercu] = useState<string>("");

  //overview + students
  const [selected, setSelected] = useState("Overview");

  function handleAddChapter(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const chapter = form.querySelector(
      'input[name="chapter"]'
    ) as HTMLInputElement;
    if (chapter && chapter.value.trim() !== "") {
      showChapters([
        ...chapters,
        { chapter: chapter.value.trim(), lessons: [] },
      ]);
      chapter.value = "";
      showChapterinp(false);
    }
  }

  function handleAddLesson(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const lesson = form.querySelector(
      'input[name="lesson"]'
    ) as HTMLInputElement;
    console.log(lesson.value);
    const contentInput = form.querySelector(
      'input[id="content"]'
    ) as HTMLInputElement;
    if (lesson && lesson.value.trim() !== "" && contentInput) {
      showChapters((prev) =>
        prev.map((ch) =>
          ch.chapter === activeChapter
            ? {
                ...ch,
                lessons: [
                  ...ch.lessons,
                  { title: lessonTitle.trim(), content: contentType },
                ],
              }
            : ch
        )
      );

      for (const c of chapters) {
        console.log(c.lessons);
      }

      lesson.value = "";
      contentInput.value = "";
      setContent("");
      showLessonInp(false);
    }
  }

  function handleContentChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file) {
      setContent(URL.createObjectURL(file));
    }
    if (file.type == "application/pdf") {
      setContentType("pdf");
      return "pdf";
    }
    if (file.type.startsWith("video/")) {
      setContentType("video");
      return "video";
    }
  }
  function handleApercuChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file || !file.type.startsWith("video/")) return;
    if (file.size > 2 * 1024 * 1024) {
      alert("File size exceeds 2MB");
    }
    if (file) {
      setApercu(URL.createObjectURL(file));
    }
  }

  function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file || !file.type.startsWith("image/")) return;
    if (file.size > 2 * 1024 * 1024) {
      alert("File size exceeds 2MB");
    }
    if (file) {
      setPreview(URL.createObjectURL(file));
    }
  }
  useEffect(() => {
    return () => {
      preview && URL.revokeObjectURL(preview);
    };
  }, [preview]);
  useEffect(() => {
    return () => {
      preview && URL.revokeObjectURL(content);
    };
  }, [content]);
  useEffect(() => {
    return () => {
      apercu && URL.revokeObjectURL(apercu);
    };
  }, [apercu]);
  return (
    <div className="manage flex flex-col gap-12">
      <div className="flex head flex-row justify-between">
        <h3>ML for beginners</h3>{" "}
        <div className="status text-black px-5 bg-[#F5BB62] rounded-3xl w-[10%] flex  items-center justify-center">
          Draft
        </div>
      </div>
      <p style={{ color: "#1F1CD9", fontWeight: "600", width: "100%" }}>
        {" "}
        <span style={{ color: "#1f1cd99c" }}>Tech /</span> Web Dev{" "}
      </p>
      <div className="flex flex-row justify-center gap-6">
        <p
          className={`p-4 hover:bg-[#2A7AE2] hover:text-white font-semibold cursor-pointer transition-all rounded-sm ${
            selected === "Overview" ? "text-[#2A7AE2]" : ""
          }`}
          onClick={() => setSelected("Overview")}
        >
          Overview
        </p>
        <p
          className={`p-4 hover:bg-[#2A7AE2] hover:text-white font-semibold cursor-pointer transition-all rounded-sm ${
            selected === "Students" ? "text-[#2A7AE2]" : ""
          }`}
          onClick={() => setSelected("Students")}
        >
          Students
        </p>
      </div>
      <div
        className={`${
          selected == "Overview" ? "flex" : "hidden"
        } overview flex flex-col gap-8`}
      >
        <div className="stats flex flex-row flex-wrap lg:flex-nowrap justify-between gap-4">
          <div className="stat-card flex-1 flex flex-col p-4 gap-2 border-2 rounded-3xl border-[#08203e76]">
            <div className="flex flex-row gap-2 items-center">
              <Users className="bg-[#DBEBFF] p-2 rounded-3xl" size={40} />
              <p>Enrollements in this course</p>
            </div>
            <h4 className="font-semibold">24569</h4>
          </div>
          <div className="stat-card flex-1 flex flex-col p-4 gap-2 border-2 rounded-3xl border-[#08203e76]">
            <div className="flex flex-row gap-2 items-center">
              <Wallet className="bg-[#F9D6E5] p-2 rounded-3xl" size={40} />
              <p>Revenue in this course</p>
            </div>
            <h4 className="font-semibold">6000 DA</h4>
          </div>
          <div className="stat-card flex-1 flex gap-2 flex-col p-4 border-2 rounded-3xl border-[#08203e76]">
            <div className="flex flex-row gap-2 items-center">
              <div className="rounded-3xl overflow-hidden">
                <MessageSquareQuote className="bg-[#D5F3F0] p-2 " size={40} />
              </div>
              <p>Total reviews</p>
            </div>
            <h4 className="font-semibold">278</h4>
            <button
              className="view-link cursor-pointer self-end"
              onClick={() => showReviews(true)}
            >
              View &gt;
            </button>
          </div>
          <div className="stat-card flex-1 flex gap-2 flex-col p-4 border-2 rounded-3xl border-[#08203e76]">
            <div className="flex flex-row gap-2 items-center">
              <Star className="bg-[#FCEBD2] p-2 rounded-3xl" size={40} />
              <p>Course rating</p>
            </div>
            <h4 className="font-semibold">4.7/5</h4>
          </div>
        </div>
        <div className="chart">
          <ApexChart />
        </div>
        <div className="flex flex-col gap-4">
          <h4>Course content</h4>
          <div>
                {chapters.map((chapter,i) => {
            const isOpen = selectedChaps.includes(chapter.chapter);

            return (
              <div key={chapter.chapter}>
                <div
                  onClick={() => {
                    setActiveChapter(chapter.chapter);
                    setSelectedChaps((prev) =>
                      prev.includes(chapter.chapter)
                        ? prev.filter((c) => c !== chapter.chapter)
                        : [...prev, chapter.chapter]
                    );
                  }}
                  className={`chapter py-4 px-2 bg-[#DBEBFF] ${i==0?"rounded-t-3xl border-b-2 border-[#00000051]":""}  ${i==chapters.length-1 && i!=0?"rounded-b-3xl":"border-b-2 border-[#00000051]"} ${isOpen?"rounded-b-none":""}  flex gap-2  cursor-pointer`}
                >
                  <ChevronRight className={isOpen ? "selected-chapter" : ""} />
                  <p className="chapter-name">{chapter.chapter}</p>
                </div>

                {isOpen && (
                  <div className="chapter-content px-4 py-3 bg-[#edf5ff] flex flex-col gap-3 border-b  border border-[#0000001b]">
                    {chapter.lessons.length > 0 ? (
                      chapter.lessons.map((lesson) => (
                        <div
                          key={lesson.title}
                          className="flex gap-2 items-center"
                        >
                          {lesson.content === "video" ? (
                            <PlaySquare />
                          ) : (
                            <FileText />
                          )}
                          <p>{lesson.title}</p>
                        </div>
                      ))
                    ) : (
                      <button
                        onClick={() => {
                          setActiveChapter(chapter.chapter);
                          showLessonInp(true);
                        }}
                        className="text-sm text-blue-600"
                      >
                        + Add first lesson
                      </button>
                    )}
                  </div>
                )}
              </div>
            );
          })}
          </div>
          
          <button
            onClick={() => showChapterinp(true)}
            className="flex  flex-row gap-2 items-center justify-center py-2 px-5 text-white rounded-3xl cursor-pointer bg-[#10305A] w-fit"
          >
            <Plus />
            <p>Add Chapter</p>
          </button>
        </div>
        <div>
          <h4>Course informations</h4>
          <div className="flex flex-col gap-8 w-full  items-center flex-wrap justify-center  lg:flex-nowrap mt-10 ">
            <form action="" className="flex px-2 flex-col gap-6 w-full">
              <div className="form-group flex flex-col gap-2 w-full  ">
                <label htmlFor="" className="text-[#333333] font-bold">
                  Course title
                </label>
                <input
                  type="text"
                  placeholder="Exp: Photoshop for beginners"
                  className="w-full p-4 border-2 border-[#00000029] rounded-sm"
                />
              </div>

              <div className="form-group flex flex-col gap-2 w-full  ">
                <label htmlFor="" className="text-[#333333] font-bold">
                  Course Description
                </label>
                <textarea
                  placeholder="Exp: From 0 to hero: this course will make you the best in photoshop ..."
                  className="w-full p-4 border-2 border-[#00000029] rounded-sm"
                ></textarea>
              </div>
              <div className="form-group flex flex-col gap-2 w-full  ">
                <label htmlFor="" className="text-[#333333] font-bold">
                  Course Payement
                </label>
                <div className="flex flex-row gap-2 w-full font-medium">
                  <input
                    checked={payement == "free" ? true : false}
                    value={"free"}
                    onChange={(e) => setPayement(e.target.value)}
                    type="radio"
                    name="payement"
                    placeholder="Exp: Photoshop for beginners"
                    className=" w-12 p-4 border-2 border-[#0c24436d] rounded-sm"
                  />{" "}
                  Free
                </div>
                <div className="flex flex-row gap-2 w-full font-medium">
                  <input
                    checked={payement == "premium" ? true : false}
                    value={"premium"}
                    onChange={(e) => setPayement(e.target.value)}
                    type="radio"
                    name="payement"
                    placeholder="Exp: Photoshop for beginners"
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
                    value={"draft"}
                    type="radio"
                    name="payement"
                    className=" w-12 p-4 border-2 border-[#0c24436d] rounded-sm"
                  />{" "}
                  Draft
                </div>
                <div className="flex flex-row gap-2 w-full font-medium">
                  <input
                    value={"published"}
                    type="radio"
                    name="payement"
                    className=" w-12 p-4 border-2 border-[#0c24436d] rounded-sm"
                  />{" "}
                  Published
                </div>
              </div>
              <div className="form-group flex flex-col gap-2 w-full  ">
                <label htmlFor="" className="text-[#333333] font-bold">
                  Course difficulty
                </label>
                <select
                  name=""
                  id=""
                  className=" w-full p-4 border-2 border-[#0c24436d] rounded-sm"
                >
                  <option value="">Easy</option>
                  <option value="">Intermediate</option>
                  <option value="">Advanced</option>
                  <option value="">Mixed levels</option>
                </select>
              </div>
              
              <div className={` form-group flex  flex-col gap-2 w-full  `}>
                <p className="text-[#333333] font-bold">
                  Course thumbnail (a descriptive photo for your course Max 2MB)
                </p>
                <label
                  htmlFor="thumbnail"
                  className="text-[#333333] box font-bold"
                >
                  {!preview && <Plus />}
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
                <label htmlFor="video" className="text-[#333333] box font-bold">
                  {!apercu && <Plus />}
                  {apercu && <video src={apercu} controls />}
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
            </form>
          </div>
        </div>

        <div
          className={` fixed ${
            chapterinp ? "flex" : "hidden"
          } items-center rounded-3xl z-20 bg-white p-4  left-1/2 transform -translate-y-1/2 -translate-x-1/2 flex-col gap-6 `}
        >
          <h5 className="font-bold">Add chapter</h5>
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
        </div>
        <div
          className={` fixed ${
            lessoninp ? "flex" : "hidden"
          } items-center rounded-3xl z-20 bg-white p-4 w-[80%] sm:w-[50%]   left-1/2 transform top-0 bottom-0 -translate-x-1/2 flex-col gap-6 `}
        >
          <h5 className="font-bold">Add Lesson</h5>
          <form
            action=""
            onSubmit={handleAddLesson}
            className="flex flex-col w-full overflow-y-auto gap-5"
          >
            <input
              onChange={(e) => setLessonTitle(e.target.value)}
              type="text"
              placeholder="lesson name"
              className="w-full p-4 border-2 border-[#0c24436d] rounded-sm"
              name="lesson"
            />
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
                className="w-full hidden p-4 border-2 border-[#0c24436d] rounded-sm"
              />
            </div>
            <button
              type="submit"
              className="bg-[#10305A] cursor-pointer text-white px-4 py-2 rounded-3xl"
            >
              Add
            </button>
          </form>
          lorem
        </div>
        <div
          className={`reviews fixed ${
            reviews ? "flex" : "hidden"
          } z-20 bg-white p-4 top-0 bottom-0 left-1/2 transform -translate-x-1/2 flex-col gap-6 `}
        >
          <div className="flex gap-2 items-center">
            <MessageSquareQuote width={30} height={30} />
            <h5 className="font-semibold">Reviews</h5>{" "}
            <X
              className="self-end cursor-pointer ml-auto"
              onClick={() => showReviews(false)}
            />
          </div>
          <p className="text-[#006FFF]">270 reviews</p>
          <div
            className="overflow-auto"
            style={{ maxHeight: "450px", scrollbarWidth: "none" }}
          >
            <div className="reviews-section flex  flex-row md:grid grid-cols-2 gap-5 relative">
              <Review
                username={"User"}
                content={
                  "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Reprehenderit ad illum vero, mollitia culpa iure rem omnis alias illo! Deleniti reiciendis, accusantium perspiciatis quos alias et saepe sed vel nemo?"
                }
              />
              <Review
                username={"User"}
                content={
                  "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Reprehenderit ad illum vero, mollitia culpa iure rem omnis alias illo! Deleniti reiciendis, accusantium perspiciatis quos alias et saepe sed vel nemo?"
                }
              />
              <Review
                username={"User"}
                content={
                  "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Reprehenderit ad illum vero, mollitia culpa iure rem omnis alias illo! Deleniti reiciendis, accusantium perspiciatis quos alias et saepe sed vel nemo?"
                }
              />
              <Review
                username={"User"}
                content={
                  "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Reprehenderit ad illum vero, mollitia culpa iure rem omnis alias illo! Deleniti reiciendis, accusantium perspiciatis quos alias et saepe sed vel nemo?"
                }
              />
            </div>
            <div className="flex justify-center mt-5 mb-5">
              <button className="px-6 py-3 rounded-3xl font-bold cursor-pointer text-[#10305A]  hover:outline-2 hover:outline-[#10305A]">
                Load More
              </button>
            </div>
          </div>
        </div>

        
      </div>

      <div
        className={` ${
          reviews || chapterinp || lessoninp ? "block" : "hidden"
        } bg-[rgba(0,0,0,0.4)]  fixed inset-0`}
        onClick={() => {
          showReviews(false);
          showChapterinp(false);
          showLessonInp(false);
        }}
      ></div>
      {selected == "Students" && <ApexGrid />}
    </div>
    
  );
}

export default CourseManage;
