import { useState } from "react";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { fetchMessages } from "../Redux/MessagesSlice";

const useSendMessages = () => {
  const [IsSending, setIsSending] = useState(false);
  const { SelectedConversation } = useSelector(
    // @ts-ignore
    (state) => state.UserShop
  );
  const dispatch = useDispatch();
  // eslint-disable-next-line no-undef
  const API = process.env.REACT_APP_DB_URL

  const SendMessages = async (InputData) => {
    console.log(JSON.stringify({ InputData }));
    setIsSending(true);
    try {
      const res = await fetch(
        `${API}/api/messages/sendMessage/${SelectedConversation._id}`,
        {
          method: "POST",
          credentials: "include",
          body: JSON.stringify({ InputData }),
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      const data = await res.json();

      if (!res.ok) {
        toast.error(data.message);
      }

      toast.success("Message sent successfully");
      // @ts-ignore
      dispatch(fetchMessages(SelectedConversation._id));
      setIsSending(false);
    } catch (error) {
      console.log(error);
    } finally {
      setIsSending(false);
    }
  };

  return { SendMessages, IsSending };
};

export default useSendMessages;
