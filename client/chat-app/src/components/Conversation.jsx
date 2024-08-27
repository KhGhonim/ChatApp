import {
  CiCamera,
  CiMicrophoneOn,
  CiPhone,
  CiSearch,
  CiVideoOn,
} from "react-icons/ci";
import { MdOutlineEmojiEmotions } from "react-icons/md";
import { GrAttachment } from "react-icons/gr";
import { LuSend } from "react-icons/lu";
import { useEffect, useRef, useState } from "react";
import { FaSpinner } from "react-icons/fa";
import EmojiPicker from "emoji-picker-react";

export default function Conversation({ UserContactHandler }) {
  const [IsSending, setIsSending] = useState(false);
  const [Emoji, setEmoji] = useState(false);
  const [Message, setMessage] = useState("");
  // const [messageList, setmessageList] = useState([]);

  const EmojiHook = useRef(null);

  useEffect(() => {
    const handleClickOutside = (eo) => {
      if (EmojiHook.current && !EmojiHook.current.contains(eo.target)) {
        setEmoji(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [EmojiHook]);

  return (
    <div className="hidden md:block flex-1 p-4 h-screen bg-[--SliderBG]">
      <div className="m-4 py-2 flex flex-col justify-between h-full ">
        {/* Chat Header */}
        <div className="m-4 py-2 border-b flex justify-between items-center">
          <div className=" flex items-center gap-1">
            <img
              src="https://avatar.iran.liara.run/public"
              alt=""
              className="rounded-full w-10 mr-3 object-cover"
            />
            <h2
              onClick={() => UserContactHandler()}
              className="text-lg font-semibold text-[--UserName] cursor-pointer"
            >
              UserName
            </h2>

            {/* Active Indicator */}
            <div className="text-green-500">●</div>
          </div>

          {/* Icons */}
          <div className="flex items-center gap-4  ">
            <CiSearch className="text-[--Text] hover:shadow-sm cursor-pointer text-3xl hover:text-[--MessageReceiver] transition-all duration-300 ease-in-out" />
            <CiVideoOn className="text-[--Text] hover:shadow-sm cursor-pointer text-3xl  hover:text-[--MessageReceiver] transition-all duration-300 ease-in-out" />
            <CiPhone className="text-[--Text] hover:shadow-sm cursor-pointer text-3xl  hover:text-[--MessageReceiver] transition-all duration-300 ease-in-out" />
          </div>
        </div>

        {/* Chat Messages */}

        <div className="flex flex-1 bg-[--MessageSender] rounded-2xl p-9">
          Messages
        </div>

        {/* {messageList.map((data, index) => (
            <div
              key={index}
              className={`flex flex-1 bg-[--MessageSender] rounded-2xl p-9 ${
                data.author === UserName ? "justify-end" : "justify-start"
              } mb-2`}
            >
              <div
                className={`max-w-[45%] p-3 rounded-lg ${
                  data.author === UserName
                    ? "bg-blue-500 text-white"
                    : "bg-gray-200 text-gray-800"
                }`}
              >
                <p>
                  <span className="font-bold">{data.author}:</span> {data.message}
                </p>
                <span className="text-gray-500 text-sm">{data.time}</span>
              </div>
            </div>
          ))} */}

        {/* Chat Input */}
        <div className="mt-4 flex">
          <div className="relative w-full flex">
            <div className=" absolute p-2 px-2 hover:shadow-sm text-2xl cursor-pointer  text-[--UserName]">
              <CiMicrophoneOn />
            </div>
            <input
              type="text"
              value={Message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Write Something..."
              className="flex-1 p-2 px-10 border border-border rounded-full outline-none shadow-md hover:shadow-xl transition-all duration-300 ease-in-out"
            />

            {/* Icons Button */}
            <div className="absolute right-0 p-2 px-2 hover:shadow-sm text-2xl cursor-pointer  text-[--UserName] flex gap-4">
              {Emoji ? (
                <div
                  className="absolute left-0 translate-y-[-100%] translate-x-[-100%]"
                  ref={EmojiHook}
                >
                  <EmojiPicker
                    lazyLoadEmojis={true}
                    open={Emoji}
                    skinTonesDisabled={true}
                    onEmojiClick={(data) => setMessage(Message + data.emoji)}
                  />
                </div>
              ) : (
                <MdOutlineEmojiEmotions onClick={() => setEmoji(!Emoji)} />
              )}
              <CiCamera />
              <GrAttachment />
            </div>
          </div>
          <button
            disabled={IsSending}
            type="submit"
            onClick={() => setIsSending(!IsSending)}
            className="ml-2 text-2xl p-2 rounded-full text-white bg-[--MessageReceiver]"
          >
            {IsSending ? <FaSpinner className="animate-spin" /> : <LuSend />}
          </button>
        </div>
      </div>
    </div>
  );
}
