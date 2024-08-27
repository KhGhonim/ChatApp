import { useState } from "react";
import { useSignIn } from "../../../hooks/SignInAuth";
// @ts-ignore
import Logo from "../../../assets/logo.png";
import { Link } from "react-router-dom";
import { FaSpinner } from "react-icons/fa";

export default function SignIn() {
  const [FormData, setFormData] = useState(null);
  const { handleSubmit, loading } = useSignIn(FormData);
  return (
    <div className="flex flex-col md:flex-row min-h-screen">
      <div className="flex flex-col justify-evenly w-full max-md:h-1/4 md:w-1/2 bg-white p-10 md:rounded-l-lg shadow-lg relative  bg-gradient-to-l from-blue-400 to-blue-600">
        <h1 className="text-xl md:text-3xl font-bold text-center text-zinc-800">
          Welcome back to{" "}
          <span className="text-4xl font-bold text-center text-zinc-800">
            Spacer
          </span>
        </h1>
        <img src={Logo} alt="" className="w-1/2 mx-auto" />
        <p className="text-center hidden md:block text-zinc-600 mt-2">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit.
        </p>
      </div>

      <div className="flex items-center justify-center w-full lg:w-1/2 p-10">
        <img src="" alt="" />
        <form className="bg-white p-8 rounded-lg shadow-lg w-full max-w-sm">
          <h2 className="text-2xl font-bold text-center text-zinc-800 mb-6">
            Sign in to your account
          </h2>

          <div className="mb-4">
            <label className="block text-zinc-700" htmlFor="email">
              E-mail Address
            </label>
            <input
              className="border border-zinc-300 p-2 w-full rounded"
              type="email"
              onChange={(e) =>
                setFormData({ ...FormData, email: e.target.value })
              }
              id="email"
              placeholder="Enter your email"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-zinc-700" htmlFor="password">
              Password
            </label>
            <input
              className="border border-zinc-300 p-2 w-full rounded"
              type="password"
              onChange={(e) =>
                setFormData({ ...FormData, password: e.target.value })
              }
              id="password"
              placeholder="Enter your password"
              required
            />
          </div>

          <button
            type="submit"
            onClick={handleSubmit}
            disabled={loading}
            className="bg-black text-white p-2 rounded-lg w-full hover:bg-primary/80 mb-4 flex justify-center items-center text-center"
          >
            {loading ? <FaSpinner className="animate-spin" /> : "Sign In"}
          </button>

          <p className="text-center text-zinc-600">
            Dont have an account?{" "}
            <Link to="/register" className="text-blue-500">
              Sign up
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}
