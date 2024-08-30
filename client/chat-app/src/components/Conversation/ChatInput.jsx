import { CiCamera, CiMicrophoneOn } from "react-icons/ci";
import { MdOutlineEmojiEmotions } from "react-icons/md";
import { GrAttachment } from "react-icons/gr";
import { LuSend } from "react-icons/lu";
import { FaSpinner } from "react-icons/fa";
import EmojiPicker from "emoji-picker-react";
import useSendMessages from "../../hooks/SendMessages";
import { useEffect, useRef, useState } from "react";

export default function ChatInput() {
  const [Message, setMessage] = useState("");
  const { SendMessages, IsSending } = useSendMessages();
  const [Emoji, setEmoji] = useState(false);
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

  const HandleChatInput = (message) => {
    SendMessages(message);
    setMessage("");
  };

  return (
    <div className="mt-3 flex">
      <div className="relative w-full flex">
        <div className=" absolute p-2 px-2 hover:shadow-sm text-2xl cursor-pointer  text-[--UserName]">
          <CiMicrophoneOn />
        </div>
        <input
          type="text"
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              HandleChatInput(Message);
            }
          }}
          value={Message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Write Something..."
          className="w-full p-2 px-8 pr-32 border border-border rounded-full outline-none shadow-md hover:shadow-xl transition-all duration-300 ease-in-out"
        />

        {/* Icons Button */}
        <div className="absolute right-0 p-2 px-2 hover:shadow-sm text-2xl cursor-pointer  text-[--UserName] flex gap-5">
          {Emoji ? (
            <div
              className="absolute left-0 translate-y-[-100%] translate-x-[-50%]"
              ref={EmojiHook}
            >
              <EmojiPicker
              width={"250px"}
                height={"350px"}
                searchDisabled={true}
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
        onClick={() => {
          HandleChatInput(Message);
        }}
        className="ml-2 text-2xl p-2 rounded-full text-white bg-[--MessageReceiver]"
      >
        {IsSending ? <FaSpinner className="animate-spin" /> : <LuSend />}
      </button>
    </div>
  );
}
