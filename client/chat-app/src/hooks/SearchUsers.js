import { useState } from "react";
import toast from "react-hot-toast";

const useSearchUsers = () => {
  const [Users, setUsers] = useState([]);
  // eslint-disable-next-line no-undef
  const API = process.env.REACT_APP_DB_URL

  const SearchUsers = async (searchTerm) => {
    try {
      const res = await fetch(
        `${API}/api/users/search?q=${searchTerm}`,
        {
          method: "GET",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      const data = await res.json();

      if (!res.ok) {
        toast.error(data.message);
        return;
      }


      setUsers(data.user);
    
      
    }


    catch (error) {
      console.log(error);
    }

  }
  return { SearchUsers, Users }
}

export default useSearchUsers