import { useEffect } from "react";
import useGetUsers from "../../hooks/GetUsers";
import { useDispatch } from "react-redux";
import { fetchMessages } from "../../Redux/MessagesSlice";
import { UserDetails } from "../../Redux/UserSlice";
export default function Users({ setPhone }) {
  const { handleGetUsers, FetchedUsers } = useGetUsers();

  useEffect(() => {
    handleGetUsers();
  }, []);
  const dispatch = useDispatch();
  const HandleChat = (user) => {
    // @ts-ignore
    dispatch(fetchMessages(user._id));
    dispatch(UserDetails(user));
    setPhone(true);
  };

  return (
    <>
      {FetchedUsers && FetchedUsers.length > 0 ? (
        FetchedUsers?.map((user, index) => {
          return (
            <div
              onClick={() => {
                HandleChat(user);
              }}
              key={index}
              className="mt-4 hover:bg-[--SliderBGHovr] hover:shadow-sm p-2 cursor-pointer rounded-xl transition-all duration-300 ease-in-out"
            >
              <div className="flex items-center p-2 hover:bg-muted cursor-pointer justify-between">
                <div className="flex flex-1 relative">
                  <img
                    src={user.profilePic}
                    alt={user.fullName}
                    className="rounded-full mr-2 w-10  object-cover"
                  />

                  {/* Active Indicator */}
                  <div className="text-green-500 text-3xl absolute -top-5 left-0">
                    ●
                  </div>

                  <div className="flex flex-col ">
                    <span className="font-semibold text-[--UserName]">
                      {user.fullName}
                    </span>
                    <span className="text-xs text-[--Text] text-start overflow-hidden line-clamp-1">
                      MessageText
                    </span>
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
    </>
  );
}
