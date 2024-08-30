import { IoSunnyOutline } from "react-icons/io5";
import { CiCloudMoon } from "react-icons/ci";
import { CiLogout } from "react-icons/ci";

import { useEffect, useState } from "react";
import useLogOutAuth from "../../hooks/LogOutAuth";

export default function ThemeToggleWithLogOut() {
  const { handleLogOut } = useLogOutAuth();
  const [Theme, setTheme] = useState(
    JSON.parse(localStorage.getItem("Theme"))
      ? JSON.parse(localStorage.getItem("Theme"))
      : "light"
  );

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

  
  return (
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
      onClick={handleLogOut}
      className="text-3xl text-[--Text] cursor-pointer hover:text-[--MessageReceiver] transition-all duration-300 ease-in-out"
    >
      <CiLogout />
    </span>
  </div>
  )
}
