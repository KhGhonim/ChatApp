import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { io } from "socket.io-client";
// @ts-ignore
import notfiy from '../assets/notfiy.mp3'
import { addMessage } from "../Redux/MessagesSlice";

const useSocket = () => {
  const [socket, setSocket] = useState(null);
  const [onlineUsers, setOnlineUsers] = useState([]);
  // @ts-ignore
  const { FetchedMessages } = useSelector((state) => state.messages);

  // @ts-ignore
  const { currentUser: { _id: userId } } = useSelector((state) => state.UserShop);
  const dispatch = useDispatch();

  useEffect(() => {
    // @ts-ignore
    const newSocket = io(import.meta.env.VITE_DB_URL, {
      withCredentials: true,
      transports: ["websocket"],
      query: { userId },

    });

    // Handle receiving new messages
    newSocket.on("message", (message) => {
      if (message.message.ReceiverID === userId && message.notify) {
        const audio = new Audio(notfiy);
        audio.play();
      }

      dispatch(addMessage(message.message));

    });

    console.log(FetchedMessages)

    // Handle receiving online users list
    newSocket.on("getOnlineUsers", (users) => {
      setOnlineUsers(users.filter((user) => user !== userId));
    });




    setSocket(newSocket);

    return () => {
      if (newSocket) newSocket.close();
    };
  }, [FetchedMessages, dispatch, userId]);


  return { socket, onlineUsers };
};

export default useSocket;
