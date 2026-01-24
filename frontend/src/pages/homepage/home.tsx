
import Hero from "../../components/hero/hero";
import sky from "../../assets/videos/sky.mp4"
import "./home.css";
import streamImg from "../../assets/images/stream.jpg";
import img2 from "../../assets/images/50b13113-7c85-44d6-8ccb-92610fca6304.jpg";
import img3 from "../../assets/images/Gemini_Generated_Image_ug1aohug1aohug1a.png";
import img4 from "../../assets/images/fb625e4f-3f30-4aa6-8c30-f9cb9aeb75a3.jpg";
import img5 from "../../assets/images/mockup_pc.png";
import img6 from "../../assets/images/black_guy.png";
import img7 from "../../assets/images/scroll.png";
import img8 from "../../assets/images/scroll2.png";
import img9 from "../../assets/images/girl.png";
import img10 from "../../assets/images/default-46.jpg";
import img11 from "../../assets/images/mockup.png";
import icon1 from "../../assets/icons/online courses-iconrepo-com (1) 1.svg";
import teacher from "../../assets/images/teacher.png"
import icon2 from "../../assets/icons/chat-iconrepo-com 1.svg";


import gsap from "gsap";
import { useEffect, useRef } from "react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import { ArrowUpRight, Check, GraduationCap } from "lucide-react";
import CircularGallery from "@/components/CircularGallery";
import Footer from "@/components/footer/footer";
import { useNavigate } from "react-router-dom";

gsap.registerPlugin(ScrollTrigger);






function Home() {

  const video = useRef<HTMLVideoElement|null>(null)
  const videoSection = useRef<HTMLDivElement|null>(null)

  useEffect(()=>{
    if(video.current == null) return
    if(videoSection.current == null) return
    const observer = new IntersectionObserver(([entry])=>{
      
      if(entry.isIntersecting ){
        
        video.current?.play()
      }else{
        video.current?.pause()
      }
      
      
    },{
      threshold: 0.5,
      })
    observer.observe(videoSection.current!)

    return(()=>observer.disconnect())
    
    
  },[])

  const navigate = useNavigate()
  
  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      document.documentElement.style.setProperty("--scroll", `${scrollY}`);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(()=>{
    gsap.to(".teacher-icon",{
      
      y:-10,
      yoyo:true,
      repeat:-1,
      duration:0.5
    })
  },[])


  return (
    <main>
      

      <Hero />

      <section className="why-us -mt-90  sm:-mt-60 md:-mt-30 lg:mt-5">
        <div className="why-us-wrapper pt-60 flex flex-col justify-center gap-6 items-center">
          <h2 style={{ textAlign: "center", width: "50%" }}>
            From Courses to Videos to exercices. Everything you need{" "}
          </h2>
          <p className="subheading">
            Master new skills through structured courses and hands-on exercises.
          </p>
          <div className="auto-scroll h-screen mt-20 w-full flex flex-col items-center gap-4 relative overflow-hidden">
            <div className="auto-scroll-wrapper flex h-full bg-[#E9F3FF]  w-full justify-around ">
              <div className="scrolling-wrapper w-[32%] flex flex-col gap-4 ">
                <div
                  className="scroll-image h-[69rem]"
                  style={{ backgroundImage: `url(${streamImg})` }}
                ></div>
                <div
                  className="scroll-image h-[69rem]"
                  style={{ backgroundImage: `url(${img2})` }}
                ></div>
                <div
                  className="scroll-image h-[69rem]"
                  style={{ backgroundImage: `url(${img5})` }}
                ></div>
              </div>
              <div className="scrolling-wrapper2 w-[32%] flex flex-col gap-4 ">
                <div
                  className="scroll-image h-[69rem]"
                  style={{ backgroundImage: `url(${img3})` }}
                ></div>
                <div
                  className="scroll-image h-[69rem]"
                  style={{ backgroundImage: `url(${img4})` }}
                ></div>
                <div
                  className="scroll-image h-[69rem]"
                  style={{ backgroundImage: `url(${img6})` }}
                ></div>
              </div>
              <div className="scrolling-wrapper w-[32%] flex flex-col gap-4">
                <div
                  className="scroll-image h-[69rem]"
                  style={{ backgroundImage: `url(${img7})` }}
                ></div>
                <div
                  className="scroll-image h-[69rem]"
                  style={{ backgroundImage: `url(${img8})` }}
                ></div>
              </div>
            </div>
            <div className="auto-scroll-wrapper flex h-full bg-[#E9F3FF]  w-full justify-around ">
              <div className="scrolling-wrapper w-[32%] flex flex-col gap-4 ">
                <div
                  className="scroll-image h-[69rem]"
                  style={{ backgroundImage: `url(${streamImg})` }}
                ></div>
                <div
                  className="scroll-image h-[69rem]"
                  style={{ backgroundImage: `url(${img2})` }}
                ></div>
                <div
                  className="scroll-image h-[69rem]"
                  style={{ backgroundImage: `url(${img5})` }}
                ></div>
              </div>
              <div className="scrolling-wrapper2 w-[32%] flex flex-col gap-4 ">
                <div
                  className="scroll-image h-[69rem]"
                  style={{ backgroundImage: `url(${img3})` }}
                ></div>
                <div
                  className="scroll-image h-[69rem]"
                  style={{ backgroundImage: `url(${img4})` }}
                ></div>
                <div
                  className="scroll-image h-[69rem]"
                  style={{ backgroundImage: `url(${img6})` }}
                ></div>
              </div>
              <div className="scrolling-wrapper w-[32%] flex flex-col gap-4">
                <div
                  className="scroll-image h-[69rem]"
                  style={{ backgroundImage: `url(${img7})` }}
                ></div>
                <div
                  className="scroll-image h-[69rem]"
                  style={{ backgroundImage: `url(${img8})` }}
                ></div>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* what we offer section */}
      <section className="offers-container ">
        <div className="offers-header">
          <h2 >What do we offer</h2>
          <center>
            <p className="subheading">
              Master new skills through structured courses and hands-on
              exercises.
            </p>
          </center>
        </div>

        <div className="offers-list ">
          {/* Bloc 1 */}
          <div className="offer-row pt-4">
            <div className="offer-image-wrapper">
              <img src={img9} alt="Learning " className="offer-img" />
            </div>
            <div className="offer-content">
              <div className="offer-title-group">
                <img width={60} src={icon1} alt="icon" />
                

                <h3>Learn from anywhere</h3>
              </div>
              <div className="flex flex-col gap-9">
                  <p className="offer-description">
                  Access thousands of courses tailored to your skill level and
                  interests.
                </p>
                <a href="#" className="view-link">
                  View &gt;
                </a>
              </div>
              
            </div>
          </div>

          {/* Bloc 2  */}
          <div className="offer-row reverse">
            <div className="offer-image-wrapper">
              <img src={img10} alt="Community" className="offer-img" />
            </div>
            <div className="offer-content">
              <div className="offer-title-group items-center">
                <img width={60} src={icon2} alt="icon" />
                <h3>Learn from anywhere</h3>
              </div>
              <p className="offer-description">
                Access thousands of courses tailored to your skill level and
                interests.
              </p>
            </div>
          </div>
        </div>
        {/* Bloc 3: partie poto*/}
        <div className="offer-block-centered">
          <h3 className="offer-title-large">Learn Everything you want </h3>

          <div className="offer-large-image-container">
            <img
              src={img11}
              alt="L'earnit Brand"
              className="offer-large-image offer-img"
              
            />
          </div>

          <p className="offer-description-centered">
            Access thousands of courses tailored to your skill level and
            interests
          </p>
        </div>
      </section>


      {/*teach section*/}
      <section className="teach  relative pt-40 flex flex-col justify-center items-center gap-6">
        <h2 className="text-center">Learn and teach on your own terms</h2>
        <p className="subheading text-center">Build, create, and organize structured courses and exercices sets</p>
        <div className="flex flex-row gap-2">
          <button onClick={()=>navigate("/teach/signup")}  className="cta main-btn text-[12px] px-2 py-3  squircle sm:px-12 sm:py-3 sm:text-[16px] md:px-12 md:py-3 md:text-[18px] lg:px-12 lg:py-3 lg:text-[18px] ">Start teaching</button>
        
        </div>
        
        <div className="teach-content pb-10 flex flex-col flex-col-reverse items-center lg:flex-row justify-between gap-20 lg:gap-40  mt-10">
          <div className="left">
            <div className="main-img relative shadow-lg">
                <div className="down-img absolute -bottom-0 -translate-x-1/2 translate-y-1/2 left-1/2">

                </div>
                <div className="right-img absolute bottom-1/2 translate-x-1/2 translate-y-0.5 -right-0" >
                  
                </div>
            </div>
          </div>
          <div className="right flex-1 flex items-center justify-end" >
            <div className="flex right-wrapper flex-col gap-2">
              <div className="rounded-3xl relative teacher-icon p-3 shadow-md bg-black w-fit self-center">
                <img src={teacher} width={40} alt="teacher" />
              </div>
              <h3 className="text-center">Turn 2026  the year that your <span>teaching</span> stand out</h3>
              <div className="flex flex-col gap-2">
                  <p className="text-[#217ae2] flex gap-2 items-center font-semibold">
                   <div className="rounded-full bg-[#b7d7ff] p-2"><Check /> </div> Start building your courses today and reach thousands of learners.
                  </p>
                  <p className="text-[#217ae2] flex gap-2 items-center font-semibold">
                   <div className="rounded-full bg-[#b7d7ff] p-2"><Check /></div>  Start building your courses today and reach thousands of learners.
                  </p>
                  <p className="text-[#217ae2] flex gap-2 items-center font-semibold">
                   <div className="rounded-full bg-[#b7d7ff] p-2"><Check /></div>  Start building your courses today and reach thousands of learners.
                  </p>
              </div>
              
            </div>
            
            

          </div>
          
        </div>
        

        
      </section>

      {/*learners section*/}
      <section className="learners pt-40 pb-40 relative flex flex-col justify-center items-center gap-6">
          <h2 className="text-center">What are you waiting for ?</h2>
          <p className="subheading text-center">Build, create, and organize structured courses and exercices sets</p>
          
          <div  className="w-full learners-list justify-center items-center lg:px-[5%] flex flex-col ">
                <div className="right-img ">
              
                </div>
            <div style={{ height: '600px', position: 'relative' }} ref={videoSection} className="overflow-hidden items-center w-[100%] pb-10 left-content flex flex-col rounded-3xl pt-10 ">
              <video ref={video} src={sky} autoPlay  className="cloud absolute inset-0 w-full h-full object-cover z-0"></video>
              <div className="flex relative z-10 flex-row items-center gap-8">
                
                <div className=" ml-10  rounded-full round-icon w-fit p-2 sm:p-4">
                <GraduationCap size={60} className="w-9 h-9"/>
                
                </div>
              <h3><span className="text-[#217ae2] ">Learning. Courses. Exercices.</span> All what you need in one platform</h3>
              </div>
              <div className="relative z-10 h-full w-full">
                <CircularGallery bend={3} textColor="#ffffff" borderRadius={0.05} scrollEase={0.02}
              
              
                  scrollSpeed={2}
                  
                />
              </div>
              
            <button onClick={()=>navigate("/login")}  className="cta relative z-10 main-btn text-[12px] self-center px-2 py-3  squircle sm:px-12 sm:py-3 sm:text-[16px] md:px-12 md:py-3 md:text-[18px] lg:px-12 lg:py-3 flex gap-2 items-center w-fit lg:text-[18px] ">Kickstart your journey <ArrowUpRight strokeWidth={3}/></button>
            </div>
            
            
          </div>
      </section>
      <Footer/>
    </main>
  );
}

export default Home;
