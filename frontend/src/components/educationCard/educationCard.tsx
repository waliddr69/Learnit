import cartt from "../../assets/icons/icons8-caddie-64 (1).png";
import favorite from "../../assets/icons/icons8-favorite-64.png";

import { Check, Heart, Notebook } from "lucide-react";
import incart from "../../assets/icons/inCart.png";
import { useNavigate } from "react-router-dom";
import { Star } from "lucide-react";
import type { Courses } from "@/types/courses";
import { useEffect, useState } from "react";
import { useCart } from "@/context/cartContext";
import type { ReviewsC } from "@/types/reviewsC";
import domain from "../domainCard/domain";

type params = {
  courses: Courses;
  liked: boolean;
  inCart: boolean;
  isEnrolled?: boolean;
  _count:number
};
function EducationCard({ courses, liked, inCart, isEnrolled, _count }: params) {
  const history = useNavigate();

  const id = courses.id;
  const [like, setLike] = useState(liked);
  const [cart, setCart] = useState(inCart);
  useEffect(() => {
    setLike(liked);
  }, [liked]);

  const [src, setSrc] = useState(cartt);

  useEffect(() => {
    setSrc(cart ? incart : cartt);
  }, [cart]);

  useEffect(() => {
    setCart(inCart);
  }, [inCart]);

  const [items, setItems] = useState<number[]>(() => {
    const saved = localStorage.getItem("filled");

    return saved ? JSON.parse(saved) : [];
  });

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
          setLike(true);
        } else {
          history("/login");
        }
      });
  }
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
          setCart(true);
          const i = [...items, id];
          setItems(i);
          refreshCart(undefined);
          localStorage.setItem("filled", JSON.stringify(i));
        } else {
          history("/login");
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
          const i = items.filter((v) => v != id);
          setItems(i);
          refreshCart(undefined);
          localStorage.setItem("filled", JSON.stringify(i));
        } else {
          history("/login");
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
          setLike(false);
        } else {
          history("/login");
        }
      });
  }

  const [show, setShow] = useState(false);
  const [animate, setAnimate] = useState(false);

  function animateHeart() {
    setAnimate(true);
    setTimeout(() => setAnimate(false), 300);
  }
  const [reviews, setReviews] = useState(0);
  useEffect(() => {
    if (courses.reviewsCs?.length! > 0) {
      const total = courses.reviewsCs?.reduce(
        (acc, curr: ReviewsC) => acc + curr.rating,
        0,
      );
      setReviews(total! / courses.reviewsCs!.length);
      return;
    }
  }, []);
  return (
    <div className="card p-2  min-w-80 lg:min-w-90     border-2 bg-[#F8FAFF] border-[#E1E2F3] rounded-3xl   flex flex-col gap-4">
      <div
        className="thumbnail relative rounded-3xl"
        style={{
          backgroundImage: `url(${import.meta.env.VITE_API_FILE_URL}/${
            courses.photo
          })`,
        }}
      >
        <div className="icons flex gap-2 absolute  top-2 right-2 w-full justify-end">
          <p
            className={`bg-[#ffffffe7] w-fit h-fit p-2 ${
              show ? "opacity-100" : ""
            } rounded-3xl group-hover:opacity-100 transition-all opacity-0`}
            style={{ color: "#1F1CD9", fontWeight: "600", fontSize: "12px" }}
          >
            {" "}
            <span style={{ color: "#1f1cd99c" }}>{courses.domain} /</span>{" "}
            {courses.subdomain}{" "}
          </p>
          <div className="flex flex-row gap-2">
            {inCart !== null && !isEnrolled && (
              <img
                src={src}
                alt="cart"
                onClick={() => (!cart ? addCart() : deleteCart())}
                width={40}
                className={`p-2 ${
                  cart ? "cart" : ""
                } cursor-pointer border-2 border-[#10305A] rounded-full`}
              />
            )}
            <Heart
              size={40}
              color="#10305A"
              onClick={(e) => {
                e.stopPropagation();
                animateHeart();
                like ? deleteLike() : addLike();
              }}
              className={`cursor-pointer p-2 rounded-full border-[#10305A] border-2 bg-[#ffffffa9] ${
                animate ? "heart-bounce" : ""
              } ${like ? "fill-red-500" : ""}`}
              strokeWidth={2.9}
            />
          </div>
        </div>
      </div>
      <div className="px-2 flex flex-col gap-4">
        <h5 className="font-semibold">{courses.title.length>18 ? `${courses.title.substring(0,18)}...` : courses.title}</h5>

        <div className="teacher flex gap-2 items-center">
          <div
            className="teacher-img"
            style={{
              backgroundImage: `url(${import.meta.env.VITE_API_FILE_URL}/${
                courses.creator?.photo
              })`,
            }}
          ></div>
          <p>{courses.creator?.fname} {courses.creator?.lname}</p>
        </div>
        <div className="rating flex flex-row gap-1 items-center">
          <Star size={40} color="#FF8000" />
          <p className="font-semibold">
            <span className="text-2xl">{reviews}</span>/5 (
            {courses.reviewsCs?.length} reviews)
          </p>
        </div>
        <div className="course-info  gap-2 flex items-center justify-between">
          <div className="difficulty-course items-center  gap-3 flex-col     rounded-3xl flex border-[#00c93257]">
            <p
              className="text-[#ffffff] font-medium  border bg-[#0028c9] px-2 border-[#0028c957] rounded-3xl"
              style={{ color: "white", fontSize: "17px" }}
            >
              {courses.domain == "Sciences and technologies" ? "ST":courses.domain == "Computer science" ? "CS":courses.domain}
            </p>
          </div>
          <div className="num-courses flex-row gap-3 flex items-center">
            <Notebook color="#0C2443" />
            <p>{_count} {courses.cat}</p>
          </div>
        </div>

        <div className="main-card-info flex justify-between items-center px-2 mt-4">
          <p className="price flex flex-row gap-2 items-center">
            {isEnrolled ? (
              <>
                Enrolled <Check />
              </>
            ) : courses.price == 0 ? (
              "Free"
            ) : (
              courses.price + " DA"
            )}
          </p>
          {!isEnrolled && (
            <button
              onClick={() => history("/educationCourse/" + id)}
              className="enroll-btn cta cta-education main-btn text-[12px] px-1 py-3  squircle sm:px-5 sm:py-3 sm:text-[16px] md:px-5 md:py-3 md:text-[18px] lg:px-5 lg:py-3 lg:text-[18px]"
            >
              Enroll Now
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export default EducationCard;
