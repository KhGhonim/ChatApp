import { useState } from "react";
import Conversation from "../components/Conversation";
import ID from "../components/ID";
import RightSlider from "../components/RightSlider";

export default function Home() {
  const [UserContact, setUserContact] = useState(false);
  // {Change Between True and False}
  const UserContactHandler = () => {
    setUserContact((prev) => !prev);
  };

  return (
    <div className="flex h-screen bg-gray-100">
      <RightSlider />
      <Conversation UserContactHandler={UserContactHandler} />
      <ID UserContact={UserContact} />
    </div>
  );
}
