import type { User } from "@/types/users";
import "./message.css";

type MessageProps = {
    onClick: ()=>void;
    user:User
    lastMessage:string

}
function Message({onClick,user,lastMessage}: MessageProps) {
  return (
    <>
      <div onClick={onClick} className="message cursor-pointer p-3 flex  justify-between w-full items-center border-b-2 border-[#E1E2F3]">
        <div className="flex flex-row gap-4">
          <div className="sender w-15 h-15  text-white flex justify-center font-bold items-center rounded-full">
            {user.initials}
          </div>
          <div className="flex flex-col justify-between">
            <h6 className="sender-name">{user.fname} {user.lname}</h6>
            <p className="message-content font-bold">
              {lastMessage}
            </p>
          </div>
        </div>

        <div className="new w-2 h-2 bg-[#E4327E] text-white flex justify-center items-center rounded-full"></div>
      </div>
      <div className="message cursor-pointer p-3 flex  justify-between w-full items-center border-b-2 border-[#E1E2F3]">
        <div className="flex flex-row gap-4">
          <div className="sender w-15 h-15  text-white flex justify-center font-bold items-center rounded-full">
            DW
          </div>
          <div className="flex flex-col justify-between">
            <h6 className="sender-name">Dari Walid</h6>
            <p className="message-content text-[#333333c4]">
              Hello, I need help with my course.
            </p>
          </div>
        </div>

        
      </div>
    </>
  );
}

export default Message;
