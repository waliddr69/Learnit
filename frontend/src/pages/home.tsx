import Header from "../components/header/header";
import Hero from "../components/hero/hero";
import "./home.css";
import streamImg from "../assets/images/stream.jpg";
import img2 from "../assets/images/50b13113-7c85-44d6-8ccb-92610fca6304.jpg";
import img3 from "../assets/images/Gemini_Generated_Image_ug1aohug1aohug1a.png";;
import img4 from "../assets/images/fb625e4f-3f30-4aa6-8c30-f9cb9aeb75a3.jpg";
import img5 from "../assets/images/mockup_pc.png"
import img6 from "../assets/images/black_guy.png"
import img7 from "../assets/images/scroll.png"
import img8 from "../assets/images/scroll2.png"

function Home() {
  return (
    <main>
      <Header />

      <Hero />

      <section className="why-us -mt-90 sm:-mt-60 md:-mt-30 lg:mt-5">
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
              <div className="scroll-image h-[69rem]" 
                style={{ backgroundImage: `url(${img2})` }}></div>
                <div className="scroll-image h-[69rem]" 
                style={{ backgroundImage: `url(${img5})` }}></div>
                
                
            </div>
            <div className="scrolling-wrapper2 w-[32%] flex flex-col gap-4 ">
              <div
                className="scroll-image h-[69rem]"
                style={{ backgroundImage: `url(${img3})` }}
              ></div>
              <div className="scroll-image h-[69rem]" 
                style={{ backgroundImage: `url(${img4})` }}></div>
                <div className="scroll-image h-[69rem]" 
                style={{ backgroundImage: `url(${img6})` }}></div>
                
                
            </div>
            <div className="scrolling-wrapper w-[32%] flex flex-col gap-4">
              <div
                className="scroll-image h-[69rem]"
                style={{ backgroundImage: `url(${img7})` }}
              ></div>
              <div className="scroll-image h-[69rem]" 
                style={{ backgroundImage: `url(${img8})` }}></div>
              
            </div>
            
            
          </div>
          <div className="auto-scroll-wrapper flex h-full bg-[#E9F3FF]  w-full justify-around ">
            <div className="scrolling-wrapper w-[32%] flex flex-col gap-4 ">
              <div
                className="scroll-image h-[69rem]"
                style={{ backgroundImage: `url(${streamImg})` }}
              ></div>
              <div className="scroll-image h-[69rem]" 
                style={{ backgroundImage: `url(${img2})` }}></div>
                <div className="scroll-image h-[69rem]" 
                style={{ backgroundImage: `url(${img5})` }}></div>
                
                
            </div>
            <div className="scrolling-wrapper2 w-[32%] flex flex-col gap-4 ">
              <div
                className="scroll-image h-[69rem]"
                style={{ backgroundImage: `url(${img3})` }}
              ></div>
              <div className="scroll-image h-[69rem]" 
                style={{ backgroundImage: `url(${img4})` }}></div>
                <div className="scroll-image h-[69rem]" 
                style={{ backgroundImage: `url(${img6})` }}></div>
                
                
            </div>
            <div className="scrolling-wrapper w-[32%] flex flex-col gap-4">
              <div
                className="scroll-image h-[69rem]"
                style={{ backgroundImage: `url(${img7})` }}
              ></div>
              <div className="scroll-image h-[69rem]" 
                style={{ backgroundImage: `url(${img8})` }}></div>
              
            </div>
            
            
          </div>
          
          
          </div>
          
          
          
        </div>
      </section>
    </main>
  );
}

export default Home;
