import { useState } from "react";
import { CiChat1, CiImageOn, CiPhone } from "react-icons/ci";
import { FaVideo } from "react-icons/fa6";
import { IoDocument, IoPersonOutline } from "react-icons/io5";
import { GrFavorite } from "react-icons/gr";
import { PiVideoLight } from "react-icons/pi";
import { BsFiletypeMp3 } from "react-icons/bs";
import { useSelector } from "react-redux";

export default function ID({ UserContact }) {
  const [SearchInsideContact, setSearchInsideContact] = useState("");

  // @ts-ignore
  const { SelectedConversation } = useSelector((state) => state.UserShop);

  return (
    <div
      className={` overflow-hidden flex flex-col items-center bg-[--SliderBG] text-[--Text] p-6 bg-background border-l shadow-md  transition-all duration-500 ease-in-out ${
        UserContact ? "block translate-x-0" : "hidden translate-x-full"
      }`}
    >
      <div className="relative">
        <div className="absolute left-0 top-1/4 flex items-center pl-3 pointer-events-none">
          <IoPersonOutline />
        </div>
        <input
          type="text"
          value={SearchInsideContact}
          onChange={(e) => setSearchInsideContact(e.target.value)}
          placeholder="Search Here..."
          className="w-full p-2 px-10 mb-4 border border-border rounded-full focus:outline-none hover:shadow-md duration-300 ease-in-out transition-all"
        />
      </div>

      <img
        src={SelectedConversation?.profilePic}
        alt="Profile Picture"
        className="rounded-full mb-4 w-32 object-cover h-32 hover:shadow-sm duration-300 ease-in-out transition-all"
      />
      <h2 className="text-lg text-[--UserName]">
        {SelectedConversation?.fullName}
      </h2>
      <p className="text-[--Text]">{SelectedConversation?.email}</p>

      <div className="flex space-x-4 my-4 relative">
        <button className="bg-[--MessageSender] text-[--MessageReceiver] text-xl p-4 rounded-full flex items-center">
          <CiChat1 />
        </button>
        <button className="bg-[--MessageSender] text-[--MessageReceiver] text-xl p-4 rounded-full flex items-center">
          <FaVideo />
        </button>
        <button className="bg-[--MessageSender] text-[--MessageReceiver] text-xl p-4 rounded-full flex items-center">
          <CiPhone />
        </button>
      </div>

      <div className="flex space-x-4 my-9">
        <div className="flex items-center gap-2 cursor-pointer group">
          <IoPersonOutline className="group-hover:text-[#4399FF] transition-all duration-300 ease-in-out" />
          <p> View Friends</p>
        </div>
        <button className="flex items-center gap-2 cursor-pointer group">
          {" "}
          <GrFavorite className="group-hover:text-[#ff4943] transition-all duration-300 ease-in-out" />
          <p>Add to Favorites</p>
        </button>
      </div>

      <h3 className="text-lg font-semibold mt-4">Attachments</h3>
      <div className="flex space-x-4 my-2">
        <div className="bg-[--MessageSender] text-[--MessageReceiver] p-2 text-xs rounded-lg cursor-pointer flex flex-col items-center">
          <IoDocument className="text-xl" />
          <p> PDF</p>{" "}
        </div>
        <div className="bg-[--MessageSender] text-[--MessageReceiver] p-2 text-xs rounded-lg cursor-pointer flex flex-col items-center">
          <PiVideoLight className="text-xl" />
          <p> Video</p>{" "}
        </div>
        <div className="bg-[--MessageSender] text-[--MessageReceiver] p-2 text-xs rounded-lg cursor-pointer flex flex-col items-center">
          <BsFiletypeMp3 className="text-xl" />
          <p> MP3</p>{" "}
        </div>
        <div className="bg-[--MessageSender] text-[--MessageReceiver] p-2 text-xs rounded-lg cursor-pointer flex flex-col items-center">
          <CiImageOn className="text-xl" />
          <p> Image</p>{" "}
        </div>
      </div>

      <button className="border-2 border-[--MessageReceiver] text-[--MessageReceiver] px-6 py-2 rounded-full mt-4">
        View All
      </button>
    </div>
  );
}
