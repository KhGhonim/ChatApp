import { TiMessages } from "react-icons/ti";
import { useSelector } from "react-redux";

export default function NoChatSelected() {
  // @ts-ignore
  const { currentUser } = useSelector((state) => state.UserShop);
  return (
    <div className="flex items-center justify-center w-full h-full">
      <div className="px-4 text-center sm:text-lg md:text-xl text-black font-semibold flex flex-col items-center gap-2">
        <p>Welcome {currentUser.fullName} 👋 </p>
        <p>Select a chat to start messaging</p>
        <TiMessages className="text-3xl md:text-6xl text-center" />
      </div>
    </div>
  );
}
