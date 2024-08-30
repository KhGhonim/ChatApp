import { useState } from "react";
import toast from "react-hot-toast";

const useGetUsers = () => {
  const [FetchedUsers, setFetchedUsers] = useState([]);

  const handleGetUsers = async () => {

    try {
      const res = await fetch("http://localhost:5000/api/users/getUsers", {
        method: "GET",
        credentials: "include",
      });

      const data = await res.json();

      if (!res.ok) {
        toast.error(data.message);
      }

      setFetchedUsers(data.users);
    } catch (error) {
      toast.error(error.message);
    }

  }
  return { handleGetUsers, FetchedUsers }
}

export default useGetUsers