import { Heart, Notebook } from "lucide-react";

import { Users } from "lucide-react";
import vid from "../../assets/videos/hero (3).mp4";
import Header from "../../components/header/header";
import cartt from "../../assets/icons/icons8-caddie-64 (1).png";
import filled from "../../assets/icons/inCart.png";
import favorite from "../../assets/icons/icons8-favorite-64.png";
import { Star } from "lucide-react";
import "./course.css";
import { Hourglass } from "lucide-react";

import { FileText } from "lucide-react";
import { SquarePlay } from "lucide-react";
import { NotebookPen } from "lucide-react";
import {
  useEffect,
  useId,
  useState,
  
} from "react";
import { Blocks } from "lucide-react";
import { Check } from "lucide-react";
import { Layers } from "lucide-react";
import { ChevronRight } from "lucide-react";
import { MessageSquareQuote } from "lucide-react";
import Review from "../../components/Review/review";
import Footer from "@/components/footer/footer";
import { useLocation, useNavigate } from "react-router-dom";
import { diffBorder, diffData, type Courses } from "@/types/courses";
import Chapters from "@/components/chapters/chapters";
import { Color } from "ogl";
import { formatTime } from "@/types/domain";
import type { Likes } from "@/types/likes";
import { useAuth } from "@/context/authContext";
import { useCart } from "@/context/cartContext";
import { useCheckout } from "@/context/checkoutContext";


import { getComments } from "@/services/commentService";
import type { Comments } from "@/types/comment";

function Course() {
  const [selected, setSelected] = useState("Overview");

  const location = useLocation();
  const id = location.pathname.split("/")[2];
  const [course, setCourse] = useState<Courses>();
  const [lessons, setLessons] = useState([]);
  const [l, setL] = useState([]);
  const [parts, setParts] = useState(1);
  const navigate = useNavigate();
  const [pdf, setPdf] = useState(0);
  const [vid, setVid] = useState(0);

  const [color, setColor] = useState("");
  let [diffLabel, setdiff] = useState("");
  const [userid,setUserId] = useState(0)
  const {user,refreshUser} = useAuth()
  
  useEffect(()=>{
    refreshUser()
    
    if(user){
      setUserId(user.id)
    }
  },[])
  function getCourse() {
    fetch(import.meta.env.VITE_API_COURSE_URL + "/getContent?id=" + id+"&userId="+userid, {
      method: "GET",
      credentials: "include",
    })
      .then((res) => res.json())
      .then((res) => {
       
        if (res.success) {
          setCourse(res.content);
          const lessonsCount = res.content.chapters.reduce(
            (acc: number, curr: any) => acc + curr._count.lessons,
            0,
          );
          let pdfs = [];
          let videos = [];

          for (let i = 0; i < res.content.chapters.length; i++) {
            for (let j = 0; j < res.lessonsCount.length; j++) {
              if (res.content.chapters[i].id == res.lessonsCount[j].chapterId) {
                if (res.lessonsCount[j].type == "pdf") {
                  pdfs.push(res.lessonsCount[j]._count._all);
                } else {
                  videos.push(res.lessonsCount[j]._count._all);
                }
              }
            }
          }

          setPdf(pdfs.reduce((acc, curr) => acc + curr, 0));
          setVid(videos.reduce((acc, curr) => acc + curr, 0));

          setLessons(lessonsCount);
          const v = res.content?.learn && JSON.parse(res.content.learn);
          console.log(v)
          setL(v);
          setParts(v && Math.ceil(v.length / 3));

          setdiff(diffData[res.content.difficulty]);
          setColor(diffBorder[res.content.difficulty]);
        } else {
          navigate("/dashboard/yourLearning");
        }
      });
  }
  const [reviews,setReviews] = useState<Comments[]>([])
  const [showReviews,setShowReviews] = useState<Comments[]>([])
  const [showIndex,setShowIndex] = useState(6)
  
  useEffect(() => {
    
    
    async function getR(){
      const res = await getComments(Number(id))
      if(res.success){
        setReviews(res.reviews)
      }
    }
    getR()
  }, []);

  useEffect(()=>{
    setShowReviews(reviews.slice(0,showIndex+1))
  },[showIndex,reviews])

 
  const [isLiked, setIsLiked] = useState(false);

  function getLikes() {
    fetch(
      import.meta.env.VITE_API_LIKES_URL +
        "/getLikes?userId=" +
        userid +
        "&courseId=" +
        id,
      {
        method: "GET",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
      },
    )
      .then((res) => res.json())
      .then((res) => {
        
        if (res.success) {
          
          setIsLiked(res.likes.some((l: any) => l.courseId == id));
        }
      });
  }

  const { cart } = useCart();
  const [inCart, setInCart] = useState(false);
  const [src, setSrc] = useState(cartt);

  useEffect(() => {
    const isIn = cart.some((l) => l.courseId == Number(id));
    setInCart(isIn);
    setSrc(isIn ? filled : cartt);
  }, [cart]);

  



  useEffect(() => {
    getCourse();
    if (userid > 0) {
      getLikes();
    }
  }, [userid]);

  function addLike() {
    fetch(import.meta.env.VITE_API_LIKES_URL + "/addLike", {
      method: "POST",
      credentials: "include",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id }),
    })
      .then((res) => res.json())
      .then((res) => {
        if (res.success) {
          setIsLiked(true);
        } else {
          navigate("/login");
        }
      });
  }

  const [items, setItems] = useState<number[]>(() => {
    const saved = localStorage.getItem("filled");

    return saved ? JSON.parse(saved) : [];
  });

  const { refreshCart } = useCart();
  function addCart() {
    fetch(import.meta.env.VITE_API_CART_URL + "/addCart", {
      method: "POST",
      credentials: "include",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id }),
    })
      .then((res) => res.json())
      .then((res) => {
        if (res.success) {
          setInCart(true);

          setSrc(filled);
          const i = [...items, Number(id)];
          setItems(i);
          refreshCart(undefined);
          localStorage.setItem("filled", JSON.stringify(i));
        } else {
          navigate("/login");
        }
      });
  }

  function deleteCart() {
    fetch(import.meta.env.VITE_API_CART_URL + "/deleteCart", {
      method: "DELETE",
      credentials: "include",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id }),
    })
      .then((res) => res.json())
      .then((res) => {
        if (res.success) {
          const i = items.filter((v) => v != Number(id));
          setItems(i);
          refreshCart(undefined);
          setInCart(false);
          setSrc(cartt);
          localStorage.setItem("filled", JSON.stringify(i));
        } else {
          navigate("/login");
        }
      });
  }

  function deleteLike() {
    fetch(import.meta.env.VITE_API_LIKES_URL + "/deleteLike", {
      method: "DELETE",
      credentials: "include",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id }),
    })
      .then((res) => res.json())
      .then((res) => {
        if (res.success) {
          setIsLiked(false);
        } else {
          navigate("/login");
        }
      });
  }

  const [animate, setAnimate] = useState(false);

  function animateHeart() {
    setAnimate(true);
    setTimeout(() => setAnimate(false), 300);
  }

  async function addEnrollement(){
    const req = await fetch(import.meta.env.VITE_API_PAY_URL+"/add",{
        method:"POST",
        headers:{"Content-Type":"application/json"},
        body:JSON.stringify({id}),
        credentials:"include"
    })

    const res = await req.json()
    
    if(res.success){
        navigate("/dashboard/yourLearning")
    }else{
        navigate("/login")
    }
  }

  const { allowCheckout } = useCheckout();

  return (
    <>
      <Header />
      <main className="flex flex-col gap-6 md:p-5 pb-20 bg-[#dbebff]  ">
        <div className="first-level-content relative flex gap-6">
          <div className="left lg:w-[70%] w-full bg-white p-5 md:p-10 rounded-3xl flex flex-col gap-6 shadow-lg border-2 border-[#E1E2F3]">
            <div className="flex justify-between lg:hidden items-center">
              <p style={{ color: "#1F1CD9", fontWeight: "600" }}>
                {" "}
                <span style={{ color: "#1f1cd99c" }}>
                  {course?.domain} /
                </span>{" "}
                {course?.subdomain}{" "}
              </p>
              <div className=" items-center py-1 px-6 gap-3     rounded-3xl flex border-[#00c93257]">
                <p
                  className="text-green-400 font-medium p-2 border border-[#00c93257] rounded-3xl"
                  style={{ color: color, borderColor: color, fontSize: "17px" }}
                >
                  {diffLabel}
                </p>
              </div>
            </div>
            <div className="video-wrapper w-full relative h-50 sm:h-75 md:h-100 lg:h-125 border rounded-3xl border-[#E1E2F3]">
              <video
                src={`${import.meta.env.VITE_API_PREVIEW_URL}/${
                  course?.preview
                }`}
                className="intro absolute inset-0 object-cover w-full h-full"
                poster={`${import.meta.env.VITE_API_FILE_URL}/${course?.photo}`}
                controls
              ></video>
            </div>

            <h3 className="text-[#061323]">{course?.title}</h3>
            <div
              className={`instructor ${
                course?.creator?.bio && "bg-[#f1f1f1]"
              }  p-2 rounded-3xl flex flex-col justify-start items-start md:flex-row gap-4 `}
            >
              <div className="flex flex-row shrink-0   gap-2 items-center">
                <div className="instructor-photo text-white font-bold text-xl rounded-3xl" style={{backgroundImage: course?.creator?.photo ? `url(${import.meta.env.VITE_API_FILE_URL}/${course?.creator?.photo})`:undefined}}>
                  {!course?.creator?.photo && course?.creator?.initials}
                </div>
                <div className="flex flex-col gap-2">
                  <p className="text-lg cursor-pointer" onClick={()=>navigate("/instructor/"+course?.creator?.id)}>
                    {course?.creator?.fname} {course?.creator?.lname}
                  </p>
                    <div className="stars-rating flex gap-1">
                      {Array.from({ length: 5 }).map((_v, i) => {
                      if (i + 1 <= Math.round( course?.creator?.receivedReviews?.length!>0 ? course?.creator!.receivedReviews![0].rating! : 0)) {
                        return <Star className="fill-yellow-400" stroke="none" />;
                      } else {
                        return <Star className="stroke-2 stroke-yellow-400" />;
                      }
                    })}
                  </div>
                  
                  </div>
                </div>
              
              {course?.creator?.bio && (
                <p className="bio self-center">{course.creator.bio}</p>
              )}
            </div>
            <p className="description">{course?.description}</p>

            <div className="course-info hidden md:flex  gap-6 border-2 p-4 border-[#00000061] rounded-3xl items-center justify-between">
              <div className="rating flex  flex-col justify-center  w-[25%] items-center  gap-3 border-r-1">
                <div className="stars-rating flex gap-1">
                  
                  {Array.from({ length: 5 }).map((_v, i) => {
                    if (i + 1 <= Math.round( course?.reviewsCs?.length!>0 ? course?.reviewsCs![0].rating! : 0)) {
                      return <Star className="fill-yellow-400" stroke="none" />;
                    } else {
                      return <Star className="stroke-2 stroke-yellow-400" />;
                    }
                  })}
                </div>
                <p>
                  <span className="text-2xl">{course?.reviewsCs?.length!>0 ? course?.reviewsCs![0].rating! : 0}</span>/5
                </p>
              </div>
              <div className=" flex flex-col gap-3 items-center w-[25%] justify-center border-r-1">
                <Notebook color="#0C2443" width={30} height={30} />
                <p>
                  {lessons} {course?.cat}
                </p>
              </div>
              <div className="enrolled flex flex-col items-center w-[25%] justify-center gap-3 border-r-1">
                <Users color="#0C2443" width={30} height={30} />
                <p>{course?.enrollements?.length} Enrolled</p>
              </div>
              <div className="duration flex flex-col items-center w-[25%] justify-center gap-3">
                <Hourglass color="#0C2443" width={30} height={30} />
                <p>{formatTime(course?.duration!)}</p>
              </div>
            </div>
          </div>

          <div className="payement hidden lg:flex sticky top-6 w-[30%] h-fit bg-white p-10 rounded-3xl  flex-col gap-6 shadow-lg border-2 border-[#E1E2F3]">
            <div className="flex justify-between items-center">
              <p style={{ color: "#1F1CD9", fontWeight: "600" }}>
                {" "}
                <span style={{ color: "#1f1cd99c" }}>
                  {course?.domain} /
                </span>{" "}
                {course?.subdomain}{" "}
              </p>
              <div className=" items-center py-1 px-6 gap-3 rounded-3xl flex border-[#00c93257]">
                <p
                  className="text-green-400 font-medium p-2 border border-[#00c93257] rounded-3xl"
                  style={{ color: color, borderColor: color, fontSize: "17px" }}
                >
                  {diffLabel}
                </p>
              </div>
            </div>
            <h3 className="price-tag">
              {course?.price == 0 ? "Free" : course?.price + "DA"}{" "}
            </h3>
            <div className="pay flex gap-3 items-center">
              <button
                className="cta main-btn text-[12px] px-2 py-3  squircle sm:px-12 sm:py-3 sm:text-[16px] md:px-12 md:py-3 md:text-[18px] w-[80%] lg:px-12 h-[70%] lg:py-5 lg:text-[18px]"
                onClick={() => {
                  if (course?.price! > 0) {
                    navigate(
                      "/payement?price=" + course?.price + "&items=1&id=" + id,
                    );
                    allowCheckout();
                  }else{
                    addEnrollement()
                  }
                }}
              >
                {course?.price == 0 ? "Enroll now" : "Buy now"}
              </button>
              <div className="items flex flex-col gap-2">
                <img
                  src={src}
                  alt="cart"
                  onClick={() => (inCart ? deleteCart() : addCart())}
                  width={50}
                  className={`p-2 ${
                    inCart ? "cart" : ""
                  } cursor-pointer border-2 border-[#10305A] rounded-full`}
                />
                <Heart
                  size={49}
                  color="#10305A"
                  onClick={(e) => {
                    e.stopPropagation();
                    animateHeart();
                    isLiked ? deleteLike() : addLike();
                  }}
                  className={`cursor-pointer p-2 rounded-full border-[#10305A] ${
                    animate ? "heart-bounce" : ""
                  } border-2 bg-[#ffffffa9]  ${isLiked ? "fill-red-500" : ""}`}
                  strokeWidth={2.9}
                />
              </div>
            </div>
            <h6 className="font-bold">Course content:</h6>
            <div className="other-info">
              {pdf > 0 && (
                <div className="flex gap-2">
                  <FileText color="#364559" />{" "}
                  <p className="text-[#364559]">{pdf} articles</p>
                </div>
              )}
            </div>
            <div className="other-info">
              {vid > 0 && (
                <div className="flex gap-2">
                  <SquarePlay color="#364559" />{" "}
                  <p className="text-[#364559]">{vid} videos</p>
                </div>
              )}
            </div>
          </div>
          <div className="payement-md flex lg:hidden fixed justify-between bottom-0 p-5 bg-[#0c2443f7] h-[150px] border-t border-t-[#000000] w-full right-0 left-0 z-10">
            <div className="flex flex-col">
              <h3 className="price-tag-md">
                {course?.price == 0 ? "Free" : course?.price + "DA"}
              </h3>
              <div className="flex justify-around">
                <div className="flex flex-col gap-3 items-center">
                  <Star className="fill-yellow-400" stroke="none" />{" "}
                  <p className="text-[#e0e0e0]">{course?.reviewsCs!.length!>0 ? course?.reviewsCs![0].rating!:0}/5</p>
                </div>

                <div className="enrolled flex flex-col flex-1 items-center w-[25%] justify-center gap-3 ">
                  <Users color="#e0e0e0" width={30} height={30} />
                  <p className="text-[#e0e0e0]">{course?.enrollements?.length} Enrolled</p>
                </div>
              </div>
            </div>

            <div className="btns flex-1 flex flex-col items-center">
              <button
                className="cta main-btn text-[12px] px-2 py-3  squircle sm:px-12 sm:py-3 sm:text-[16px] md:px-12 md:py-3 md:text-[18px] w-[80%] lg:px-12 h-[70%] lg:py-5 lg:text-[18px]"
                onClick={() => {
                  if (course?.price! > 0) {
                    navigate(
                      "/payement?price=" + course?.price + "&items=1&id=" + id,
                    );
                    allowCheckout();
                  }else{
                    addEnrollement()
                  }
                }}
              >
                {course?.price! == 0 ? "Enroll now" : "Buy now"}
              </button>
              <div className="items flex flex-row self-center gap-2">
                <img
                  src={src}
                  alt="cart"
                  onClick={() => (inCart ? deleteCart() : addCart())}
                  width={50}
                  className={`p-2 ${
                    inCart ? "cart" : "bg-white"
                  } cursor-pointer border-2 border-[#10305A] rounded-full`}
                />
                <Heart
                  size={49}
                  color="#10305A"
                  onClick={(e) => {
                    e.stopPropagation();
                    animateHeart();
                    isLiked ? deleteLike() : addLike();
                  }}
                  className={`cursor-pointer p-2 rounded-full border-[#10305A] border-2 ${
                    animate ? "heart-bounce" : ""
                  } bg-[#ffffff]  ${isLiked ? "fill-red-500" : ""}`}
                  strokeWidth={2.9}
                />
              </div>
            </div>
          </div>
        </div>
        <div className="second-level-content overflow-x-auto min-w-[400px] flex gap-6 w-full bg-white p-5 md:p-10 rounded-3xl flex-col  shadow-lg border-2 border-[#E1E2F3]">
          <div className="select-menu flex justify-between py-2 px-1    rounded-3xl border-[#E1E2F3] border">
            <div
              onClick={() => setSelected("Overview")}
              className={`item ${
                selected != "Overview" ? "not-selected" : "selected"
              }  not-selected flex w-1/3 items-center py-5 justify-center`}
            >
              <p>Overview</p>
            </div>

            <div
              onClick={() => setSelected("Chapters")}
              className={`item ${
                selected == "Chapters"
                  ? "selected"
                  : selected == "Overview"
                  ? "border-r not-selected"
                  : "border-l not-selected"
              } border-[#babded]  not-selected flex w-1/3 items-center py-5 justify-center`}
            >
              <p>Chapters</p>
            </div>

            <div
              onClick={() => setSelected("Reviews")}
              className={`item ${
                selected != "Reviews" ? "not-selected" : "selected"
              } not-selected flex w-1/3 items-center py-5 justify-center`}
            >
              <p>Reviews</p>
            </div>
          </div>
          <div>
            <div
              className={`overview ${
                selected == "Overview" ? "" : "hidden"
              } flex flex-col gap-6 `}
            >
              <div className="flex gap-2 items-center">
                <Blocks width={30} height={30} />
                <h5 className="font-semibold">What you'll learn</h5>
              </div>
              <div
                className={`learn-course rounded-3xl bg-[#dbebffb1] border-[#E1E2F3] border p-5 grid grid-cols-1 ${
                  l && l.length > 3 && "md:grid-cols-2"
                } `}
              >
                {Array.from({ length: parts }).map((_, v: number) => {
                  const start = v * 3;
                  const end = start + 3;
                  const i = l.slice(start, end);
                  
                  return (
                    <div className="first flex flex-col gap-6">
                      {i &&
                        i.map((v: string) => {
                          return (
                            <div className="learn-item flex gap-2 justify-start items-start">
                              <Check
                                color="#00bd2f"
                                className="shrink-0"
                                width={30}
                                height={30}
                              />{" "}
                              <p className="w-[90%]">{v}</p>
                            </div>
                          );
                        })}
                    </div>
                  );
                })}
              </div>
            </div>
            <div
              className={`chapters ${
                selected == "Chapters" ? "" : "hidden"
              } flex flex-col gap-6 `}
            >
              <div className="flex gap-2 items-center">
                <Layers width={30} height={30} />
                <h5 className="font-semibold">Chapters</h5>
              </div>
              <Chapters id={Number(id)} modify={true} />
            </div>
            <div
              className={`reviews ${
                selected == "Reviews" ? "" : "hidden"
              } flex flex-col gap-6 `}
            >
              <div className="flex gap-2 items-center">
                <MessageSquareQuote width={30} height={30} />
                <h5 className="font-semibold">Reviews</h5>
              </div>
              <p className="text-[#006FFF]">{reviews.length} reviews</p>
              <div
                className="overflow-auto"
                style={{ maxHeight: "400px", scrollbarWidth: "none" }}
              >
                <div className="reviews-section grid-cols-1 grid md:grid-cols-2 gap-5 relative">
                  {reviews.length>0 ? (
                    showReviews.map((r:Comments)=>{
                      return <Review
                    username={r.user.fname+" "+r.user.lname}
                    content={
                      r.content
                    }
                    photo={r.user.photo}
                    initials={r.user.initials}
                  />
                    })
                  ):(
                    <h4>No comments !</h4>
                  )}
                  
                  
                </div>
                <div className="flex justify-center mt-5 mb-5">
                  {showReviews.length!==reviews.length && (
                    <button onClick={()=>setShowIndex(showIndex+6)} className="px-6 py-3 rounded-3xl font-bold cursor-pointer text-[#10305A]  hover:outline-2 hover:outline-[#10305A]">
                    Load More
                  </button>
                  )}
                  
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}

export default Course;
