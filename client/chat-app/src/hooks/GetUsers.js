import { useState } from "react";
import toast from "react-hot-toast";

const useGetUsers = () => {
  const [FetchedUsers, setFetchedUsers] = useState([]);
  // eslint-disable-next-line no-undef
  const API = import.meta.env.VITE_DB_URL;

  const handleGetUsers = async () => {

    try {
      const res = await fetch(`${API}/api/users/getUsers`, {
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