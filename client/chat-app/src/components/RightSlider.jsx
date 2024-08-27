import { useEffect, useState } from "react";
import { LuPenSquare } from "react-icons/lu";
import { IoSunnyOutline } from "react-icons/io5";
import { CiCloudMoon } from "react-icons/ci";
import { CiLogout } from "react-icons/ci";
import { useDispatch, useSelector } from "react-redux";
import { SignOut } from "../Redux/UserSlice";

export default function RightSlider() {
  const [Search, setSearch] = useState("");
  const [Theme, setTheme] = useState(
    JSON.parse(localStorage.getItem("Theme"))
      ? JSON.parse(localStorage.getItem("Theme"))
      : "light"
  );
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(SignOut());
  };
  const handleSearch = () => {};

  useEffect(() => {
    localStorage.setItem("Theme", JSON.stringify(Theme));

    if (Theme === "light") {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("Theme", JSON.stringify("light"));
      setTheme("light");
    } else {
      document.documentElement.classList.add("dark");
      localStorage.setItem("Theme", JSON.stringify("dark"));
      setTheme("dark");
    }
  }, [Theme]);

  // @ts-ignore
  const { currentUser } = useSelector((state) => state.UserShop);

  return (
    <div className="w-full md:w-1/4 border-r border-border p-8 bg-[--SliderBG]  transition-all duration-300 ease-in-out relative">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <img
            src={currentUser.profilePic}
            alt={currentUser.fullName}
            className="w-12 h-12 object-cover"
          />
          <div>
            <h2 className="text-lg font-semibold text-[--UserName]">
              {currentUser.fullName || "User"}
            </h2>
            <p className="text-xs text-[--Text]">{currentUser.email}</p>
          </div>
        </div>

        <div className="cursor-pointer">
          <LuPenSquare size={20} className="text-[--Text]" />
        </div>
      </div>

      {/* Search Input */}
      <input
        type="text"
        value={Search}
        onChange={(e) => setSearch(e.target.value)}
        placeholder="Search Here..."
        onKeyUp={(e) => e.key === "Enter" && handleSearch()}
        className="mt-4 p-2 px-4 border border-border rounded-3xl w-full focus:outline-none shadow-md hover:shadow-xl transition-all duration-300 ease-in-out"
      />

      <div className="border-b border-border my-5"></div>
      <div className="mt-4 hover:bg-[--SliderBGHovr] cursor-pointer rounded-lg transition-all duration-300 ease-in-out">
        <div className="flex items-center p-2 hover:bg-muted cursor-pointer justify-between">
          <div className="flex flex-1 relative">
            <img
              src="https://avatar.iran.liara.run/public"
              alt=""
              className="rounded-full mr-2 w-10  object-cover"
            />

            {/* Active Indicator */}
            <div className="text-green-500 text-3xl absolute -top-5 left-0">
              ●
            </div>

            <div className="flex flex-col">
              <span className="font-semibold text-[--UserName]">UserName</span>
              <span className="text-xs text-[--Text] ml-auto overflow-hidden line-clamp-1">
                MessageText
              </span>
            </div>
          </div>

          {/* Time and Unread Message Count */}
          <div>
            <span className="text-xs text-[--Text] ml-auto">10:35 AM</span>
            <span className="bg-[--MessageReceiver] text-white rounded-full px-1 text-xs ml-2">
              1
            </span>
          </div>
        </div>
      </div>

      <div className="absolute container mx-auto shadow-lg bottom-5 p-2 px-5 hover:shadow-2xl transition-all duration-300 ease-in-out  border-2  rounded-full flex justify-between w-10/12 ">
        {/* DarkMode */}
        {Theme === "light" ? (
          <span
            className="text-3xl text-[--Text] cursor-pointer"
            onClick={() => setTheme("dark")}
          >
            <IoSunnyOutline />
          </span>
        ) : (
          <span
            className="text-3xl text-[--Text] cursor-pointer"
            onClick={() => setTheme("light")}
          >
            <CiCloudMoon />
          </span>
        )}

        {/* Logout */}

        <span
          onClick={handleLogout}
          className="text-3xl text-[--Text] cursor-pointer hover:text-[--MessageReceiver] transition-all duration-300 ease-in-out"
        >
          <CiLogout />
        </span>
      </div>
    </div>
  );
}
