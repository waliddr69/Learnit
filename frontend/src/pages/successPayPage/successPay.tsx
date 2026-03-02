
import success from "./Success Check.json"
import { ChevronRight } from "lucide-react";
import { useNavigate } from "react-router-dom";
import Lottie from "lottie-react";

const SuccessPay = () => {
    const navigate = useNavigate()
  return (
    <main className="flex flex-col gap-10 h-full justify-center items-center">
        <div className="w-22">
            <Lottie animationData={success} size={20} loop={false} width={20} height={20}/>
        </div>
        
        <h3 className="text-3xl">Payement successful!</h3>
        <button
                        onClick={() => navigate("/dashboard/yourLearning")}
                        className="cta main-btn flex text-[12px] px-8 py-3  squircle sm:px-12 sm:py-3 sm:text-[16px] md:px-12 md:py-3 md:text-[18px] lg:px-12 lg:py-3 lg:text-[18px] "
        >Go To Dashboard <ChevronRight/> </button>
    </main>
  );
};

export default SuccessPay;