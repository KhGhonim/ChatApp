import { useSelector } from "react-redux";
import NoChatSelected from "../NoChatSelected ";
import ChatHeader from "./ChatHeader";
import ChatInput from "./ChatInput";
import { FaSpinner } from "react-icons/fa";
import useListenToMessages from "../../hooks/Socket.io";
import { useEffect, useRef } from "react";

export default function ConPC({ UserContactHandler }) {
  const { FetchedMessages, loading, error } = useSelector(
    // @ts-ignore
    (state) => state.messages
  );
  const { SelectedConversation, currentUser } = useSelector(
    // @ts-ignore
    (state) => state.UserShop
  );

  const lastMessageRef = useRef(null);


  useListenToMessages();


  useEffect(() => {
    if (lastMessageRef.current) {
      lastMessageRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [FetchedMessages]);


  const renderLoading = () => (
    <div className="h-screen flex justify-center items-center">
      <FaSpinner className="animate-spin" />
    </div>
  );

  const renderError = () => (
    <p className="text-red-500 h-screen flex justify-center items-center text-center">
      There were no Conversations: {error}
    </p>
  );

  const renderNoChatSelected = () => <NoChatSelected />;

  const renderNoMessages = () => (
    <div className={` m-4 py-2 flex flex-col justify-between h-full `}>
      <ChatHeader UserContactHandler={UserContactHandler} setPhone={null} />
      <p className="text-center text-2xl text-[--UserName] flex justify-center items-center">
        Send a message to start the conversation
      </p>
      <ChatInput />
    </div>
  );

  const renderChatMessages = () => (
    <div className={`  mx-4 flex flex-col justify-between h-full`}>
      <ChatHeader UserContactHandler={UserContactHandler} setPhone={null} />
      <div className="flex flex-1 flex-col bg-[--ChatBG] rounded-2xl p-9 gap-2 mb-2 overflow-y-scroll">
        {FetchedMessages?.map((message, index) => (
          <div
            ref={lastMessageRef}
            className={`flex ${
              message.ReceiverID === SelectedConversation._id
                ? ""
                : "flex-row-reverse"
            } gap-2  `}
            key={index}
          >
            <img
              src={
                message.ReceiverID === SelectedConversation._id
                  ? currentUser.profilePic
                  : SelectedConversation.profilePic
              }
              alt={""}
              className={`w-10 h-10 object-cover rounded-full `}
            />
            <div
              className={`w-full flex mb-2 ${
                message.ReceiverID === SelectedConversation._id
                  ? "justify-start"
                  : "justify-end"
              } `}
            >
              <p
                className={`max-w-[45%] p-3 rounded-2xl ${
                  message.ReceiverID === SelectedConversation._id
                    ? "bg-blue-500 text-white"
                    : "bg-gray-400"
                }`}
              >
                {message.message}
              </p>
            </div>
          </div>
        ))}
      </div>
      <ChatInput />
    </div>
  );

  const renderContent = () => {
    if (loading) return renderLoading();
    if (error) return renderError();
    if (!FetchedMessages && !SelectedConversation)
      return renderNoChatSelected();
    if (FetchedMessages && FetchedMessages.length === 0 && SelectedConversation)
      return renderNoMessages();
    if (FetchedMessages && FetchedMessages.length > 0 && SelectedConversation)
      return renderChatMessages();
    return renderNoChatSelected();
  };

  return (
    <div
      className={` text-xs md:text-base block flex-1 max-md:py-5 md:p-4 h-screen bg-[--SliderBG]`}
    >
      {renderContent()}
    </div>
  );
}
