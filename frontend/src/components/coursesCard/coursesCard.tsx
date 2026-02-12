import cartt from "../../assets/icons/icons8-caddie-64 (1).png"
import incart from "../../assets/icons/inCart.png"
import { Heart, Notebook } from 'lucide-react';
import "./coursesCard.css"
import { useNavigate } from "react-router-dom";
import { Star } from 'lucide-react';
import { useEffect, useState } from "react";
import { diffBorder, diffData } from "@/types/courses";
import { useCart } from "@/context/cartContext";


type params={
    title:string,
    id:number,
    
    photo:string,
    price:number,
    difficulty:string,
    rating:number,
    _count?:number,
    cat:string,
    domain:string,
    subdomain:string
    creator:{
        photo:string
        fname: string;
        lname: string;
    },
    liked:boolean,
    inCart?:boolean | null

}
function CoursesCard({title,photo,inCart,id,price,cat,difficulty,creator,rating,_count,domain,subdomain,liked}:params){
    const history = useNavigate();
    const [like,setLike] = useState(liked)
    const [cart,setCart] = useState(inCart)
    useEffect(() => {
    setLike(liked);
    }, [liked]);

    const [src,setSrc] = useState(cartt)

    useEffect(()=>{
        setSrc(cart?incart:cartt)
    },[cart])


    useEffect(() => {
    setCart(inCart);
    }, [inCart]);

    const [items,setItems] = useState<number[]>(() => {
        const saved = localStorage.getItem("filled")
        
        return saved ? JSON.parse(saved) : []
    })

        function addLike(){
            fetch(import.meta.env.VITE_API_LIKES_URL + "/addLike",{
                method:"POST",
                credentials:"include",
                headers:{"Content-Type":"application/json"},
                body:JSON.stringify({id})
            })
            .then(res=>res.json())
            .then(res=>{
                if(res.success){
                    setLike(true)
                }else{
                    
                        history("/login")
                    
                }

            })
        }
        const {refreshCart} = useCart()
        function addCart(){
            fetch(import.meta.env.VITE_API_CART_URL + "/addCart",{
                method:"POST",
                credentials:"include",
                headers:{"Content-Type":"application/json"},
                body:JSON.stringify({id})
            })
            .then(res=>res.json())
            .then(res=>{
                if(res.success){
                    setCart(true)
                    const i = [...items,id]
                    setItems(i)
                    refreshCart(undefined)
                    localStorage.setItem("filled",JSON.stringify(i))
                }else{
                    
                        history("/login")
                    
                }

            })
        }

        function deleteCart(){
            fetch(import.meta.env.VITE_API_CART_URL + "/deleteCart",{
                method:"DELETE",
                credentials:"include",
                headers:{"Content-Type":"application/json"},
                body:JSON.stringify({id})
            })
            .then(res=>res.json())
            .then(res=>{
                if(res.success){
                    const i = items.filter(v=>v!=id)
                    setItems(i)
                    refreshCart(undefined)
                    localStorage.setItem("filled",JSON.stringify(i))
                }else{
                    
                        history("/login")
                    
                }

            })
        }

        function deleteLike(){
            fetch(import.meta.env.VITE_API_LIKES_URL + "/deleteLike",{
                method:"DELETE",
                credentials:"include",
                headers:{"Content-Type":"application/json"},
                body:JSON.stringify({id})
            })
            .then(res=>res.json())
            .then(res=>{
                if(res.success){
                    setLike(false)
                }else{
                    
                    history("/login")
                    
                }

            })
        }
    
        const diffLabel = diffData[difficulty];
        const color = diffBorder[difficulty];
        const[show,setShow]=useState(false)
        const [animate, setAnimate] = useState(false);

            function animateHeart() {
                setAnimate(true);
                setTimeout(() => setAnimate(false), 300);
            }

    
    return(
        <div tabIndex={1} onClick={()=>setShow(true)} onBlur={()=>setShow(false)} className="card p-2  min-w-80 lg:min-w-90 group    border-2 bg-[#F8FAFF] border-[#E1E2F3] rounded-3xl   flex flex-col gap-4">
            <div className="thumbnail relative rounded-3xl" style={{backgroundImage: `url(${import.meta.env.VITE_API_FILE_URL}/${photo})`}}>
                <div className="icons px-2 z-10 flex gap-2 absolute  top-2  w-full justify-between">
                    <p className={`bg-[#ffffffe7] w-fit h-fit p-2 ${show?"opacity-100":""} rounded-3xl group-hover:opacity-100 transition-all opacity-0`} style={{ color: "#1F1CD9", fontWeight: "600",fontSize:"12px" }}>
                        {" "}
                        <span style={{ color: "#1f1cd99c" }}>{domain} /</span> {subdomain}{" "}
                    </p>
                    <div className="flex flex-row gap-2">
                        {inCart!==null && <img src={src} alt="cart" onClick={()=>!cart ? addCart():deleteCart()} width={40} className={`p-2 ${cart? "cart":""} cursor-pointer border-2 border-[#10305A] rounded-full`}/>}
                    <Heart
                    size={40}
                    color="#10305A"
                    onClick={(e) => {
                        e.stopPropagation();
                        animateHeart();
                        like ? deleteLike() : addLike();
                    }}
                    className={`cursor-pointer p-2 rounded-full border-[#10305A] border-2 bg-[#ffffffa9] ${animate ? "heart-bounce" : ""} ${
                        like ? "fill-red-500" : ""
                    }`}
                    strokeWidth={2.9}
                    />

                    </div>
                    
                </div>
            </div>
            <div className="px-2 flex flex-col gap-4">
                <h5 className="font-semibold">{title}</h5>

            <div className="teacher flex gap-2 items-center">
                <div className="teacher-img w-8 h-8 rounded-3xl" style={{backgroundImage: `url(${import.meta.env.VITE_API_FILE_URL}/${creator.photo})`}}></div>
                <p>{creator.fname} {creator.lname}</p>
            </div>
            <div className="rating flex flex-row gap-1 items-center">
                    <Star size={40} color="#FF8000"/>
                    <p className="font-semibold"><span className="text-2xl">{rating}</span>/5 (1,248 reviews)</p>
            </div>
            <div className="course-info  gap-2 flex justify-between">
                
                <div className="difficulty-course items-center  gap-3 flex-col     rounded-3xl flex border-[#00c93257]">
                    
                    <p className={`text-green-400 font-medium p-2 border-2 border-[${color}] rounded-3xl`} style={{color:color,borderColor:color, fontSize:"17px"}}>{diffLabel}</p>
                </div>
                <div className="num-courses flex-row gap-3 flex items-center">
                    <Notebook color="#0C2443" />
                    <p>{_count} {cat}</p>
                </div> 
               

            </div>
            
            

            <div className="main-card-info flex justify-between items-center px-2 mt-4">
                <p className="price">{price==0?"Free":price+" DA"}</p>
                <button onClick={()=>history("/course/"+id)} className="enroll-btn cta cta main-btn text-[12px] px-1 py-3  squircle sm:px-5 sm:py-3 sm:text-[16px] md:px-5 md:py-3 md:text-[18px] lg:px-5 lg:py-3 lg:text-[18px]">Enroll Now</button>
            </div>
            </div>

            
        </div>
    )
}

export default CoursesCard