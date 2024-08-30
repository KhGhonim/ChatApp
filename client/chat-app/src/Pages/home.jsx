import { useEffect, useState } from "react";
import Conversation from "../components/Conversation/Conversation";
import ID from "../components/ID";
import RightSlider from "../components/RightSlider/RightSlider";
import PCRightSlider from "../components/RightSlider/PCRightSlider";
import ConPC from "../components/Conversation/ConPC";

export default function Home() {
  const [UserContact, setUserContact] = useState(false);
  const UserContactHandler = () => {
    setUserContact((prev) => !prev);
  };
  const [Phone, setPhone] = useState(false);

  const [isLargeScreen, setIsLargeScreen] = useState(window.innerWidth > 767);

  useEffect(() => {
    const handleResize = () => {
      setIsLargeScreen(window.innerWidth > 767);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <div className="flex h-screen bg-gray-100">
      {!isLargeScreen ? (
        <>
          <RightSlider setPhone={setPhone} Phone={Phone} />
          <Conversation
            UserContactHandler={UserContactHandler}
            setPhone={setPhone}
            Phone={Phone}
          />
        </>
      ) : (
        <>
          <PCRightSlider setPhone={setPhone} />
          <ConPC UserContactHandler={UserContactHandler} />
        </>
      )}

      <ID UserContact={UserContact} />
    </div>
  );
}
