import Header from "../../components/header/header";
import Hero from "../../components/hero/hero";
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
import icon2 from "../../assets/icons/chat-iconrepo-com 1.svg";
import { useGSAP } from "@gsap/react";
import ScrollTrigger from "gsap-trial/ScrollTrigger";
import gsap from "gsap";
import { useEffect } from "react";

function Home() {
  
  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      document.documentElement.style.setProperty("--scroll", `${scrollY}`);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
  return (
    <main>
      <Header />

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
      <section className="offers-container">
        <div className="offers-header">
          <h2 >What do we offer</h2>
          <center>
            <p className="subheading">
              Master new skills through structured courses and hands-on
              exercises.
            </p>
          </center>
        </div>

        <div className="offers-list">
          {/* Bloc 1 */}
          <div className="offer-row">
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
              <div className="offer-title-group">
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
    </main>
  );
}

export default Home;
