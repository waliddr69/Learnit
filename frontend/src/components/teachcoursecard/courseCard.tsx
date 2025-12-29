import "./courseCard.css"
import { FileCog } from 'lucide-react';

type TeachCourseCardProps = {
  onClick: () => void;
};
function TeachCourseCard({ onClick }: TeachCourseCardProps){
    return(
        <div className="teach-card px-2 min-w-80 lg:min-w-90    py-2 border-2 bg-[#F8FAFF] border-[#E1E2F3] rounded-3xl   flex flex-col gap-4">
            <div className="thumbnail relative rounded-3xl">
                
            </div>
            <div className="status text-black px-5 bg-[#F5BB62] rounded-3xl w-[30%] flex  items-center justify-center">Draft</div>
            <h5 className="font-semibold">Ml for begginers</h5>
            <button onClick={onClick} className="border-2 cursor-pointer hover:bg-[#9dc0ee] transition-all font-semibold border-[#10305A] flex flex-row items-center gap-2 justify-center px-2 py-3  sm:px-12 sm:py-3 sm:text-[16px] md:px-12 md:py-3 md:text-[18px] lg:px-12 lg:py-3 lg:text-[18px] rounded-3xl"><FileCog/> Manage Course</button>
        </div>
    )
}

export default TeachCourseCard