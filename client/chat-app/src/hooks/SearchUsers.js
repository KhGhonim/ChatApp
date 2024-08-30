import { useState } from "react";
import toast from "react-hot-toast";

const useSearchUsers = () => {
  const [Users, setUsers] = useState([]);

  const SearchUsers = async (searchTerm) => {
    try {
      const res = await fetch(
        `http://localhost:5000/api/users/search?q=${searchTerm}`,
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