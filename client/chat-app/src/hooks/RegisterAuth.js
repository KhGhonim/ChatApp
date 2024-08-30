/* eslint-disable no-unused-vars */
// useRegister.js
import { useState } from 'react';
import toast from "react-hot-toast";
import { useNavigate } from 'react-router-dom';

const useRegister = (FormData) => {
  const [loading, setLoading] = useState(false);
  const nevigate = useNavigate();

  // eslint-disable-next-line no-undef
  const API = import.meta.env.VITE_DB_URL;

  const handleSubmit = async (eo) => {
    eo.preventDefault();
    if (!FormData.terms) {
      toast.error("Please accept terms and conditions");
      return;
    }

    if (
      FormData.fullName === "" ||
      FormData.email === "" ||
      FormData.password === "" ||
      FormData.confirmPassword === "" ||
      FormData.gender === ""
    ) {
      toast.error("Please fill all the fields");
      return;
    }

    if (FormData.password.length < 6 || FormData.confirmPassword.length < 6) {
      toast.error("Password must be at least 6 characters");
      return;
    }

    if (FormData.password !== FormData.confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }

    setLoading(true);
    try {
      const res = await fetch(`${API}/api/auth/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(FormData),
      });

      if (!res.ok) {
        toast.error("Internal Server Error in Registration");
        console.log(res);
        setLoading(false);
        return;
      }

      const data = await res.json();
      toast.success("Registration Successful");
      nevigate("/signin");
      setLoading(false);
    } catch (error) {
      toast.error("Internal Global Server Error in Registration");
    } finally {
      setLoading(false);
    }
  };

  return { handleSubmit, loading };
};

export default useRegister;
