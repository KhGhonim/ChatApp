import { useState } from "react";
import useSearchUsers from "../../hooks/SearchUsers";
import { useDispatch } from "react-redux";
import { UserDetails } from "../../Redux/UserSlice";
import { fetchMessages } from "../../Redux/MessagesSlice";

export default function Search({ setPhone }) {
  const [searchTerm, setSearchTerm] = useState("");
  const { SearchUsers, Users } = useSearchUsers();

  const dispatch = useDispatch();

  const HandleChat = (user) => {
    // @ts-ignore
    dispatch(fetchMessages(user._id));
    dispatch(UserDetails(user));
    setPhone(true);
  };

  return (
    <div className="relative">
      <input
        type="text"
        onChange={(e) => setSearchTerm(e.target.value)}
        value={searchTerm}
        onKeyUp={(e) => {
          e.key === "Enter" && SearchUsers(searchTerm);
        }}
        placeholder="Search Here..."
        className="mt-4 p-2 px-4 border border-border rounded-3xl w-full focus:outline-none shadow-md hover:shadow-xl transition-all duration-300 ease-in-out"
      />
      <div
        className={`${
          searchTerm ? "block" : "hidden"
        } absolute shadow-2xl left-0 w-full  top-14 rounded-3xl z-40 flex flex-col p-6 pointer-events-none bg-[--SliderBG] h-56 overflow-y-auto`}
      >
        {Users
          ? Users.map((user, index) => {
              return (
                <div
                  onClick={() => {
                    HandleChat(user);
                  }}
                  key={index}
                  className="mt-4 text-xs z-50 hover:bg-black  hover:shadow-sm p-2 cursor-pointer rounded-xl transition-all duration-300 ease-in-out"
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
          : null}
      </div>
    </div>
  );
}
