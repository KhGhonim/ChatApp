import { useState } from "react";
// @ts-ignore
import Logo from "../../../assets/logo.png";
import { Link } from "react-router-dom";
import useRegister from "../../../hooks/RegisterAuth";
import { FaSpinner } from "react-icons/fa";

export default function Register() {
  const [FormData, setFormData] = useState(null);
  const { handleSubmit, loading } = useRegister(FormData);

  return (
    <div className="flex flex-col md:flex-row min-h-screen">
      <div className="flex flex-col justify-evenly w-full max-md:h-1/4 md:w-1/2 bg-white p-10 md:rounded-l-lg shadow-lg relative  bg-gradient-to-l from-blue-400 to-blue-600">
        <h1 className="text-xl md:text-3xl font-bold text-center text-zinc-800">
          Welcome to{" "}
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
            Create your account
          </h2>
          <div className="mb-4">
            <label className="block text-zinc-700" htmlFor="name">
              Full Name
            </label>
            <input
              onChange={(e) =>
                setFormData({ ...FormData, fullName: e.target.value })
              }
              className="border border-zinc-300 p-2 w-full rounded"
              type="text"
              id="name"
              placeholder="Enter your name"
              required
            />
          </div>
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
          <div className="mb-4">
            <label className="block text-zinc-700" htmlFor="confirm-password">
              Confirm Password
            </label>
            <input
              className="border border-zinc-300 p-2 w-full rounded"
              type="password"
              onChange={(e) =>
                setFormData({ ...FormData, confirmPassword: e.target.value })
              }
              id="confirm-password"
              name="confirmpassword"
              placeholder="Confirm your password"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-zinc-700" htmlFor="confirm-password">
              Choose Your Gender
            </label>
            <select
              className="border border-zinc-300 p-2 w-full rounded"
              onChange={(e) =>
                setFormData({ ...FormData, gender: e.target.value })
              }
              id="gender"
              required
              name="gender"
              defaultValue=""
            >
              <option value="" disabled>
                Choose Your Gender
              </option>
              <option value="male">Male</option>
              <option value="female">Female</option>
            </select>
          </div>
          <div className="flex items-center mb-4">
            <input
              type="checkbox"
              name="terms"
              value="terms"
              id="terms"
              required
              onChange={(e) =>
                setFormData({ ...FormData, terms: e.target.checked })
              }
              className="mr-2"
            />
            <label htmlFor="terms" className="text-zinc-600">
              By Signing Up, I Agree with{" "}
              <a href="#" className="text-blue-500">
                Terms & Conditions
              </a>
            </label>
          </div>
          <button
            type="submit"
            onClick={handleSubmit}
            disabled={loading}
            className="bg-black text-white p-2 rounded-lg w-full hover:bg-primary/80 mb-4 flex justify-center items-center text-center"
          >
            {loading ? <FaSpinner className="animate-spin" /> : "Sign Up"}
          </button>

          <p className="text-center text-zinc-600">
            Already have an account?{" "}
            <Link to="/signin" className="text-blue-500">
              Sign In
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}
