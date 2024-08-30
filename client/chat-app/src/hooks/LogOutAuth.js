import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { SignOut } from "../Redux/UserSlice";

const useLogOutAuth = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleLogOut = async () => {
    const res = await fetch("http://localhost:5000/api/auth/logout", {
      method: "POST",
      credentials: "include",
    });
    const data = await res.json();
    if (res.ok) {
      dispatch(SignOut(data));
      navigate("/signin");
    }
  }
  return { handleLogOut }
}

export default useLogOutAuth