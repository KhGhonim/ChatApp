import { io } from "socket.io-client";
import { useDispatch, useSelector } from "react-redux";
import { addNewMessage } from "../Redux/MessagesSlice";
import notificationSound from "../assets/notfiy.mp3";
import { useEffect } from "react";

const useListenToMessages = () => {
  const dispatch = useDispatch();
  const { currentUser } = useSelector(
    // @ts-ignore
    (state) => state.UserShop
  );
  // @ts-ignore
  const SocketIO = import.meta.env.VITE_SOCKET_URL;

  useEffect(() => {
    if (!SocketIO && !currentUser) return;

    if (currentUser) {
      const socket = io(SocketIO);

      socket.on("connect", () => {
        console.log("Connected to Socket.IO via socket:", socket.id);
      });

      socket.on("newMessage", (message) => {
        console.log("Received new message via socket:", message);

        const audio = new Audio(notificationSound);
        audio.play();
        dispatch(addNewMessage(message));
      });
    }
    return () => {
      if (currentUser) {
        const socket = io(SocketIO);
        socket.disconnect();
      }
    };
  }, [SocketIO, currentUser, dispatch]);


}

export default useListenToMessages