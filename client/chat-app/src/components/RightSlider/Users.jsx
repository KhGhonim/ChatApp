import { useEffect } from "react";
import useGetUsers from "../../hooks/GetUsers";
import { useDispatch } from "react-redux";
import { fetchMessages } from "../../Redux/MessagesSlice";
import { UserDetails } from "../../Redux/UserSlice";
import useGetLastMessage from "../../hooks/GetLastMessage";
import useSocket from "../../hooks/Socket.io";

export default function Users({ setPhone }) {
  const { handleGetUsers, FetchedUsers } = useGetUsers();
  const { GetLastMessage, GetLastMessageData } = useGetLastMessage();

  useEffect(() => {
    handleGetUsers();
    GetLastMessage();
  }, []);
  const dispatch = useDispatch();

  const HandleChat = (user) => {
    // @ts-ignore
    dispatch(fetchMessages(user._id));
    dispatch(UserDetails(user));
    setPhone(true);
  };
  const { onlineUsers } = useSocket();
  useEffect(() => {}, [onlineUsers]);

  return (
    <div className="w-full h-4/6 md:h-3/4 overflow-y-scroll  ">
      {FetchedUsers && FetchedUsers.length > 0 ? (
        FetchedUsers?.map((user, index) => {
          const lastMessageData =
            GetLastMessageData[index]?.messages[
              GetLastMessageData[index]?.messages?.length - 1
            ]?.createdAt;
          const date = new Date(lastMessageData);
          const formattedDateTime = date.toLocaleString("en-US", {
            hour: "2-digit",
            minute: "2-digit",
            hour12: true,
          });
          return (
            <div
              onClick={() => {
                HandleChat(user);
              }}
              key={index}
              className="mt-4 hover:bg-[--SliderBGHovr] hover:shadow-sm p-2  cursor-pointer rounded-xl transition-all duration-300 ease-in-out  "
            >
              <div className="flex items-center p-2  cursor-pointer justify-between">
                <div className="flex flex-1 relative">
                  <img
                    src={user.profilePic}
                    alt={user.fullName}
                    className="rounded-full mr-2 w-10 h-10  object-cover"
                  />

                  {/* Active Indicator */}
                  <div
                    className={`text-green-500 text-3xl absolute -top-5 left-0 ${
                      onlineUsers && onlineUsers.includes(user._id)
                        ? "block"
                        : "hidden"
                    }`}
                  >
                    ●
                  </div>

                  <div className="flex flex-col ">
                    <span className="font-semibold text-[--UserName]">
                      {user.fullName}
                    </span>

                    {GetLastMessageData && GetLastMessageData.length > 0 ? (
                      <div>
                        {GetLastMessageData[index]?.messages &&
                        GetLastMessageData[index]?.messages.length > 0 ? (
                          <p className="text-xs text-[--Text] text-start overflow-hidden line-clamp-1">
                            {GetLastMessageData[index]?.messages[index]?.message}
                          </p>
                        ) : null}
                      </div>
                    ) : null}
                  </div>
                </div>

                {/* Time and Unread Message Count */}
                <div>
                  <span className="text-xs text-[--Text] ml-auto">
                    {formattedDateTime !== "Invalid Date"
                      ? formattedDateTime
                      : null}
                  </span>
                </div>
              </div>
            </div>
          );
        })
      ) : (
        <p className="text-center text-red-500 text-[--Text] flex justify-center items-center h-1/2">
          No Users Found
        </p>
      )}
    </div>
  );
}
