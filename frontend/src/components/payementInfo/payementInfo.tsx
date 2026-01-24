import { Shield } from "lucide-react";
import { useNavigate } from "react-router-dom";

type info = {
    items:number,
    total:number,
    text:string

}


function PayementInfo({items,total,text}:info) {
    const navigate = useNavigate()
  return (
    <div className="checkout fixed bottom-0 left-0 shadow-[0px -10px 15px -3px rgba(0,0,0,0.1)]  lg:sticky lg:top-6 h-fit p-4 bg-white shadow-lg w-full lg:w-[30%] gap-10 flex flex-col rounded-3xl">
      <div className="flex flex-row justify-between">
        <p className="font-semibold text-2xl">Total items:</p>
        <p className="text-2xl font-medium item">{items}</p>
      </div>
      <div className="flex flex-row justify-between border-b pb-2">
        <p className="font-semibold text-3xl">Total:</p>
        <p className="text-3xl font-bold item">{total}DA</p>
      </div>
      {text=="Checkout" && (<button onClick={()=>navigate("/payement")} className="cta main-btn flex flex-row items-center gap-2 justify-center text-[12px] px-2 py-3  squircle sm:px-12 sm:py-3 sm:text-[16px] md:px-12 md:py-3 md:text-[18px] lg:px-12 lg:py-3 lg:text-[18px] ">
        <Shield strokeWidth={3} /> {text}
      </button>)}
    </div>
  );
}

export default PayementInfo
