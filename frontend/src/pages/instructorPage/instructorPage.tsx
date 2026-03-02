import { MonitorPlay, Send, Star, User as UserrIcon } from "lucide-react"
import "./instructorPage.css"
import Header from "@/components/header/header"
import CoursesCard from "@/components/coursesCard/coursesCard"
import Footer from "@/components/footer/footer"
import { useLocation, useNavigate } from "react-router-dom"
import { getIns } from "@/services/userServices"
import { useEffect, useState } from "react"
import type { User } from "@/types/users"
import type { ReviewsI } from "@/types/reviewsI"
import type { Courses } from "@/types/courses"
import { getLikes } from "@/services/likesService"
import type { Likes } from "@/types/likes"
import { useAuth } from "@/context/authContext"
import { useCart } from "@/context/cartContext"
import EducationCard from "@/components/educationCard/educationCard"

function InstructorPage(){

    const location = useLocation()
    const navigate = useNavigate()
    const id = location.pathname.split("/").pop()
    const [userr,setUser] = useState<User>()
    const [courses,setCourses] = useState<Courses[]>([])
    const [educourses,setEduCourses] = useState<Courses[]>([])
    const [enr,setEnr] = useState<number>(0)
    const [rating,setRating] = useState<number>(0)
    const { user,refreshUser } = useAuth();
    const [lessons,setLessons] = useState([])
                        
        useEffect(()=>{
            
            refreshUser()
            
        },[])
    const get = async()=>{
        const res = await getIns(Number(id),user?.id)
        
        if(res.success){
           
            setUser(res.user)
            setCourses(res.user.contents.filter((c:Courses)=>c.type=="course"))
            setEduCourses(res.user.contents.filter((c:Courses)=>c.type=="education"))
            setEnr(res.user.contents.reduce((acc:any,curr:any)=>{
                return acc+curr.enrollements.length
            },0))
            const lessonsCount = res.user.contents.map(
                    (course: { chapters: any[] }) =>
                    course.chapters.reduce(
                        (acc: number, curr: any) => acc + curr._count.lessons,
                        0
                    )
                )

            setLessons(lessonsCount)
            if(res.user.receivedReviews.length>0){
                 const total = res.user.receivedReviews.reduce((acc:any,curr:ReviewsI)=>{
                return acc+curr.rating
            },0)
            setRating(total/res.user.receivedReviews.length)
            }
           
        }else{
            navigate("/courses")
        }
    }
    const [likes,setLikes] = useState<Likes[]>([])
        async function getL(){
            
                const res = await getLikes()
                
                if(res.success){
                    setLikes(res.likes)
                }
        
            }
        
            useEffect(()=>{
                get()
            },[user])

    useEffect(()=>{
        get()
        getL()
    },[])
    function checkLikable(courseId:number){
        
        
        return likes.some(l => l.courseId === courseId);
        
    }
        const {cart} = useCart()
        function chackInCart(courseId:number){
            
           
            return cart!.some(l => l.courseId === courseId);
            
        }
    return(
        <main className="bg-[#dbebff]">
            <Header/>
            <div className="instructor-wrapper flex flex-col gap-15">
                <div className="flex  gap-20 sm:px-5 px-2 flex-col lg:flex-row border-b pb-10 border-b-[#2d2d2d74]">
                    <div className="metadata w-full self-center sm:w-fit bg-[#ffffff] shadow-lg rounded-3xl p-4 flex gap-8 flex-col items-center">
                        <div className="profile-pic text-white font-bold text-3xl h-22 w-22 rounded-full bg-black" style={{backgroundImage: userr?.photo?`url(${import.meta.env.VITE_API_FILE_URL}/${userr?.photo})`:undefined}}>
                            {!userr?.photo && userr?.initials}
                        </div>
                        <div className="info flex flex-row gap-2">
                            <div className="info-item">
                                <h6 className="flex font-bold text-lg flex-row gap-1 items-center"><UserrIcon strokeWidth={3}/>{enr}</h6>
                                <small>enrollements</small>
                            </div>
                            <div className="info-item">
                                <h6 className="flex font-bold text-lg flex-row gap-1 items-center"><Star fill="black" strokeWidth={3}/>{rating.toFixed(1)}/5</h6>
                                <small>rating</small>
                            </div>
                            <div className="info-item">
                                <h6 className="flex font-bold text-lg flex-row gap-1 items-center"><MonitorPlay strokeWidth={3}/>{userr?.contents?.length}</h6>
                                <small>courses</small>
                            </div>
                        </div>
                    </div>

                    <div className="main-data flex flex-col gap-4">
                        <h3 className="text-start" >{userr?.fname} {userr?.lname}</h3>
                        <div className="flex flex-col gap-2">
                            <p className="font-semibold text-[#333333] text-lg">Personnel informartions</p>
                            <p className="text-[#494949]">{userr?.bio}</p>
                        </div>
                        <button onClick={()=>navigate("/dashboard/messages/"+userr?.id)} className="px-4 py-2 rounded-3xl bg-white w-fit self-end hover:bg-[#f2f6fb] transition-all text-[#2a7ae2] font-medium flex flex-row gap-2 cursor-pointer items-center">Send message<Send strokeWidth={2}/></button>
                    </div>
                </div>

                <div className="courses">
                    <h4 className="font-bold">Courses</h4>
                    <div className="courses relative right-0 w-full snap-x py-2 snap-mandatory  flex flex-row overflow-x-auto gap-4">
                        {courses.length>0 ? courses.map((c:Courses,i:number)=>{
                            return  <CoursesCard inCart={chackInCart(c.id)} _count={lessons[i]} isEnrolled={c.enrollements?.some(e=>e.userId==user?.id)} liked={checkLikable(c.id)} key={c.id} title={c.title} id={c.id} photo={c.photo!} price={c.price!} difficulty={c.difficulty!} cat={c.cat!} domain={c.domain!} subdomain={c.subdomain!} creator={userr!} reviewsCs={c.reviewsCs!}/>
                        }):(
                            <h4>No courses!</h4>
                        )}
                    
                        
                        
                    </div>
                    
                </div>
                <div className="courses">
                    <h4 className="font-bold">Educational Courses</h4>
                    <div className="courses relative right-0 w-full snap-x py-2 snap-mandatory  flex flex-row overflow-x-auto gap-4">
                        {educourses.length>0 ? educourses.map((c:Courses,i:number)=>{
                            return  <EducationCard courses={c} liked={checkLikable(c.id)} inCart={chackInCart(c.id)} _count={lessons[i]} />
                        }):(
                            <h4>No educational courses!</h4>
                        )}
                        
                    </div>
                    
                </div>
            </div>
            <Footer/>
        </main>
    )
}

export default InstructorPage