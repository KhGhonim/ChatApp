import { useState } from "react";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { SignInSuccess } from "../Redux/UserSlice";

export const useSignIn = (FormData) => {
  const [loading, setloading] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch()

  const handleSubmit = async (eo) => {
    eo.preventDefault();
    setloading(true);
    if (
      FormData.email === "" ||
      FormData.password === ""
    ) {
      toast.error("Please fill all the fields");
      setloading(false);
      return;

    }

    if (FormData.password.length < 6) {
      toast.error("Password must be at least 6 characters");
      setloading(false);
      return;
    }

    try {
      const res = await fetch("http://localhost:5000/api/auth/signin", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(FormData),
        credentials: "include",
      });
      const data = await res.json();

      if (!res.ok) {
        toast.error(data.message || "Internal Server Error in Login");
        setloading(false);
        return;
      }

      toast.success("Login Successful", data);
      dispatch(SignInSuccess(data.user));
      navigate("/");
    } catch (error) {
      toast.error("An error occurred during login");
      console.log("Login error:", error);
    } finally {
      setloading(false);
    }
  };

  return {
    loading, handleSubmit
  };

}

