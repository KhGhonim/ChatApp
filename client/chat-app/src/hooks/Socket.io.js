import { useEffect, useState } from "react";
import { io } from "socket.io-client";
import useGetLastMessage from "./GetLastMessage";


const useSocket = () => {
  const [socket, setSocket] = useState(null);

  useGetLastMessage();
  useEffect(() => {
    const newSocket = io(import.meta.env.VITE_SOCKET_URL, {
      withCredentials: true,
      transports: ["websocket"], // Ensure WebSocket transport is used
    });

    newSocket.on("connect", () => {
      console.log("Connected to server:", newSocket.id);
    });

    

    newSocket.on("Sendmessage", (message) => {
      console.log("Message received from server:", message);
      

    });


    newSocket.on("disconnect", () => {
      console.log("Disconnected from server");
    });

    setSocket(newSocket);


    return () => newSocket.close();
  }, []);

  return socket;
}

export default useSocket;
