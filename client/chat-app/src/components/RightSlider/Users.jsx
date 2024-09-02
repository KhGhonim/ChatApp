import { useEffect } from "react";
import useGetUsers from "../../hooks/GetUsers";
import { useDispatch } from "react-redux";
import { fetchMessages } from "../../Redux/MessagesSlice";
import { UserDetails } from "../../Redux/UserSlice";
import useGetLastMessage from "../../hooks/GetLastMessage";
export default function Users({ setPhone }) {
  const { handleGetUsers, FetchedUsers } = useGetUsers();
  const { GetLastMessage, GetLastMessageData } = useGetLastMessage();

  useEffect(() => {
    handleGetUsers();
    GetLastMessage();
  }, [GetLastMessageData]);
  const dispatch = useDispatch();


  const HandleChat = (user) => {
    // @ts-ignore
    dispatch(fetchMessages(user._id));
    dispatch(UserDetails(user));
    setPhone(true);
  };

  return (
    <div className="w-full h-4/6 md:h-3/4 overflow-y-scroll  ">
      {FetchedUsers && FetchedUsers.length > 0 ? (
        FetchedUsers?.map((user, index) => {
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
                  <div className="text-green-500 text-3xl absolute -top-5 left-0">
                    ●
                  </div>

                  <div className="flex flex-col ">
                    <span className="font-semibold text-[--UserName]">
                      {user.fullName}
                    </span>
                    {GetLastMessageData.map((msgGroup) => {
                      if (msgGroup.messages && msgGroup.messages.length > 0) {
                        // Create a map to store the last message for each SenderID
                        const lastMessagesBySender = new Map();

                        // Iterate over messages to find the last message for each SenderID
                        msgGroup.messages.forEach((msg) => {
                          if (msg.ReceiverID === user._id) {
                            lastMessagesBySender.set(msg.SenderID, msg);
                          }
                        });

                        // Now render the last message for each SenderID
                        return Array.from(lastMessagesBySender.values()).map(
                          (msg, index) => {
                            return (
                              <p
                                key={msg._id || index} // Use message ID if available, otherwise use index
                                className="text-xs text-[--Text] text-start overflow-hidden line-clamp-1"
                              >
                                {msg.message}
                              </p>
                            );
                          }
                        );
                      }
                      // If there are no messages, return null or any fallback UI
                      return null;
                    })}
                  </div>
                </div>

                {/* Time and Unread Message Count */}
                <div>
                  <span className="text-xs text-[--Text] ml-auto">
                    10:35 AM
                  </span>
                  <span className="bg-[--MessageReceiver] text-white rounded-full px-1 text-xs ml-2">
                    1
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
