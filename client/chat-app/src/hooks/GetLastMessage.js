import { useState } from "react";
import toast from "react-hot-toast";

const useGetLastMessage = () => {
  const [GetLastMessageData, setGetLastMessageData] = useState([]);
  const GetLastMessage = async () => {


    try {
      const res = await fetch("http://localhost:5000/api/messages/latestMessages", {
        method: "GET",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
      });

      const data = await res.json();

      if (!res.ok) {
        toast.error(data.message);
        return;
      }

      setGetLastMessageData(data.lastmessage);
      console.log(GetLastMessageData)
    } catch (error) {
      console.log(error);
    }

  }
  return { GetLastMessage, GetLastMessageData }
}

export default useGetLastMessage