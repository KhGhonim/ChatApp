import { BsArrowDownLeft } from "react-icons/bs";
import { CiPhone, CiSearch, CiVideoOn } from "react-icons/ci";
import { useSelector } from "react-redux";
import useSocket from "../../hooks/Socket.io";
import { useEffect } from "react";
export default function ChatHeader({ UserContactHandler, setPhone }) {
  const { SelectedConversation, currentUser } = useSelector(
    // @ts-ignore
    (state) => state.UserShop
  );

  const { socket, onlineUsers } = useSocket();

  useEffect(() => {}, [onlineUsers]);

  return (
    <div className="md:m-4 md:py-2 border-b flex justify-between items-center">
      <div className="  flex items-center gap-3">
        <BsArrowDownLeft
          onClick={() => {
            setPhone(false);
            if (socket) {
              socket.emit("leaveConversation", {
                currentUserId: currentUser._id,
                userId: SelectedConversation._id,
              });
            }
          }}
          className="md:hidden  text-[--Text] hover:shadow-sm cursor-pointer text-2xl md:text-3xl hover:text-[--MessageReceiver] transition-all duration-300 ease-in-out"
        />
        <div className="flex justify-center items-center mb-1">
          <img
            src={SelectedConversation?.profilePic}
            alt=""
            className="rounded-full w-10 h-10 mr-3 object-cover"
          />
          <h2
            onClick={() => UserContactHandler()}
            className="text-xs md:text-lg font-semibold text-[--UserName] cursor-pointer"
          >
            {SelectedConversation?.fullName}
          </h2>
        </div>

        {/* Active Indicator */}
        <div
          className={` ${
            onlineUsers.includes(SelectedConversation?._id) && "text-green-500"
          }`}
        >
          ●
        </div>
      </div>

      {/* Icons */}
      <div className="flex items-center gap-4  ">
        <CiSearch className="text-[--Text] hover:shadow-sm cursor-pointer text-xl md:text-3xl hover:text-[--MessageReceiver] transition-all duration-300 ease-in-out" />
        <CiVideoOn className="text-[--Text] hover:shadow-sm cursor-pointer text-xl md:text-3xl  hover:text-[--MessageReceiver] transition-all duration-300 ease-in-out" />
        <CiPhone className="text-[--Text] hover:shadow-sm cursor-pointer text-xl md:text-3xl  hover:text-[--MessageReceiver] transition-all duration-300 ease-in-out" />
      </div>
    </div>
  );
}
