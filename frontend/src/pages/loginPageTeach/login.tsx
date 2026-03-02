import "./login.css";
import { Mail, TriangleAlert } from "lucide-react";
import { Eye } from "lucide-react";
import { useRef, useState } from "react";
import { EyeClosed } from "lucide-react";
import logo from "../../assets/images/full_logo.svg";
import { useNavigate } from "react-router-dom";
import Alert from "@/components/alertMsg/alert";
import { useAuth } from "@/context/authContext";
function LoginTeach() {
  const [visible, setVisible] = useState(false);
  const [disabled, setDisabled] = useState(true);
  const emailRef = useRef<HTMLInputElement>(null);
  const passRef = useRef<HTMLInputElement>(null);
  const [color, setColor] = useState("");
  const [message, setMessage] = useState("");
  const { refreshUser } = useAuth();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const form = e.currentTarget;
    const formData = new FormData(form);

    const email = formData.get("email");

    const password = formData.get("pass");
    if (!email || !password) {
      setMessage("all fields are mandatory!");
      setColor("rgb(205,61,100)");
      return;
    }

    fetch(import.meta.env.VITE_API_USER_URL + "/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify({ email, password, role: "TEACHER" }),
    })
      .then((res) => res.json())
      .then(async (res) => {
        setMessage(res.message);
        if (res.success) {
          setColor("green");
          await refreshUser();
          navigate("/teach/content");
        } else {
          setColor("rgb(205,61,100)");
        }
      })
      .catch((err) => console.log(err));
  };
  function handleDisabled() {
    if (
      passRef.current &&
      emailRef.current &&
      passRef.current.value.length > 0 &&
      emailRef.current.value.length > 0
    ) {
      setDisabled(false);
    } else {
      setDisabled(true);
    }
  }
  const navigate = useNavigate();
  return (
    <>
      <div className="bg-[#eeeeee] h-fit">
        <img
          src={logo}
          alt="logo"
          onClick={() => navigate("/")}
          className="  w-34 h-auto sm:w-38 md:w-48 lg:w-68 pt-10 pl-10 cursor-pointer"
        />
        <main className="h-full  pt-10 w-full flex justify-center">
          <div className="login  h-fit bg-[#fdfdfd] border-[#4b4b4b4e] justify-start py-10 border flex flex-col gap-6 rounded-md sm:rounded-3xl w-[40%] relative z-10 shadow-lg">
            <h2 className="text-center auth-heading  flex flex-col">
              <span>Welcome back👋</span>{" "}
              <span>Log in to continue your teaching journey</span>
            </h2>
            <Alert message={message} color={color} />

            <form
              action=""
              onSubmit={handleSubmit}
              className="flex flex-col gap-10 items-center"
            >
              <div className=" w-[95%] sm:w-[80%] flex flex-col gap-2">
                <label htmlFor="" className="font-medium text-[#333333]">
                  Email
                </label>
                <div className="email  flex items-center border-[#cccee7de] rounded-3xl border-2 justify-between p-3">
                  <input
                    onChange={handleDisabled}
                    ref={emailRef}
                    type="email"
                    name="email"
                    className="flex-1"
                    placeholder="you@example.com"
                  />
                  <Mail color="#9CA3AF" />
                </div>
              </div>
              <div className=" w-[95%] sm:w-[80%] flex flex-col gap-2">
                <label htmlFor="" className="font-medium text-[#333333]">
                  Password
                </label>
                <div className="pass  flex items-center border-[#cccee7de] border-2 rounded-3xl  justify-between p-3">
                  <input
                    onChange={handleDisabled}
                    ref={passRef}
                    type={visible ? "text" : "password"}
                    placeholder="Enter a secure password ..."
                    name="pass"
                    className=" flex-1"
                  />
                  {visible ? (
                    <Eye
                      color="#9CA3AF"
                      className="cursor-pointer"
                      onClick={() => setVisible(false)}
                    />
                  ) : (
                    <EyeClosed
                      color="#9CA3AF"
                      className="cursor-pointer"
                      onClick={() => setVisible(true)}
                    />
                  )}
                </div>
              </div>

              <button
                type="submit"
                disabled={disabled}
                className={` ${
                  disabled ? "disabled" : "cta"
                } w-[95%] sm:w-[80%]  text-[12px] px-2 py-3 shadow-lg  squircle sm:px-12 sm:py-3 sm:text-[16px] md:px-12 md:py-3 md:text-[18px] lg:px-12 lg:py-3 lg:text-[18px] `}
              >
                Log in
              </button>
              <p>
                Don't have an account?{" "}
                <span
                  className="text-[#006EFD] cursor-pointer"
                  onClick={() => navigate("/signup")}
                >
                  Sign up
                </span>
              </p>
            </form>
          </div>
        </main>
      </div>

      <div className="bg-login w-full h-full"></div>
    </>
  );
}

export default LoginTeach;
