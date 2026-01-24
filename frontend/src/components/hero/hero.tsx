import "./hero.css";
import video from "../../assets/videos/hero (3).mp4";
import vid2 from "../../assets/videos/9b147532-6cd6-4c07-8be4-5aa3b8991757.mp4";
import img1 from "../../assets/images/guys.jpg";
import img2 from "../../assets/images/girlWIthPc.jpg";
import Search from "../search/search";
import SplitText from "gsap/src/SplitText";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Header from "../header/header";
import { useNavigate } from "react-router-dom";


function Hero() {
    gsap.registerPlugin(SplitText, ScrollTrigger);
    useGSAP(()=>{
        let split = new SplitText("h1", {type: "words"});
        let split2 = new SplitText(".subheading", {type: "lines"});
        const tl = gsap.timeline();
        tl.from(split.words, {
            duration: 0.3,
            y: 100,
            delay:0.8,
            stagger: 0.1,
            opacity: 0,
        })
        .to(".typed",{
            opacity:1
        })
        .from(".typed::after",{
          opacity:0
        })
        .from(split2.lines,{
            duration: 1,
            opacity:0,
            stagger:0.05,

        })
        .fromTo(".cta-hero,.sec-hero",{
            opacity:0,

        },{
            stagger:0.1,
            opacity:1
        })

        
        .from(".hero-vid,.hero-img",{
            scale:1.5,
            opacity:0,
            duration:0.5,
            stagger:0.1
        })

        

        
        
    })

    const navigate = useNavigate()
  return (
    <section className="hero relative w-full h-full  hero">
      <Header />
      <div className="hero-wrapper flex flex-col justify-center relative items-center gap-2 sm:gap-6 md:gap-4 z-20">
        
        <Search />
        <h1 style={{ textAlign: "center", color: "var(--heading1-color)" }}>
          Algeria’s First Platform for{" "}
          <span className="typed"><em>Skills & Education</em></span>{" "}
        </h1>
        <p className="subheading">
          Master new skills through structured courses and hands-on exercises.
          Whether you're starting fresh or advancing your expertise, our
          platform adapts to your pace and learning style.
        </p>
        <div className="btns mt-2 sm:mt-5">
          <button onClick={()=>navigate("/login")} className="cta cta-hero main-btn text-[12px] px-5 py-3  squircle sm:px-12 sm:py-3 sm:text-[16px] md:px-12 md:py-3 md:text-[18px] lg:px-12 lg:py-3 lg:text-[18px] ">
            Start Learning
          </button>
          <button onClick={()=>navigate("/courses")} className="sec sec-hero sec-btn squircle text-[12px] px-5 py-3  sm:px-12 sm:py-3 sm:text-[16px] md:px-12 md:py-3 md:text-[18px] lg:px-12 lg:py-3 lg:text-[18px] ">
            Browse
          </button>
        </div>
        <div className="w-[50%] h-100 mt-5 relative">
          <div className="relative overflow-hidden rounded-3xl">
            <video
              src={vid2}
              autoPlay
              muted
              loop
              className="w-full h-full object-cover hero-vid"
            />
          </div>
          <img
            src={img2}
            alt="girl with pc"
            className="absolute w-32 top-25 -left-22 sm:w-42 sm:-left-32 sm:top-30  md:w-81 md:-left-72 md:top-40 hero-img  lg:top-50  rounded-xl shadow-lg lg:w-100"
          />
          <img
            src={img1}
            alt="guys"
            className="absolute w-32 -right-22 sm:w-42 sm:-right-32  md:w-81 md:-right-72  top-20  rounded-xl  hero-img  shadow-lg lg:w-100"
            width={400}
            height={300}
          />
        </div>
      </div>
      <video
        src={video}
        autoPlay
        muted
        loop
        className="absolute inset-0 z-0 object-cover object-center"
      ></video>
    </section>
  );
}

export default Hero;
