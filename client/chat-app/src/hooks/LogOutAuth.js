import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { SignOut } from "../Redux/UserSlice";

const useLogOutAuth = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  // eslint-disable-next-line no-undef
  const API = process.env.REACT_APP_DB_URL

  const handleLogOut = async () => {
    const res = await fetch(`${API}/api/auth/logout`, {
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