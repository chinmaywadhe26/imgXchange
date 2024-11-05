import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { login } from "../../store/slices/authSlice";
import toast, { Toaster } from "react-hot-toast";
import { useDispatch } from "react-redux";
const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(import.meta.env.VITE_API_URL + "/login", {
        email,
        password,
      });
      const data = await res.data;
      console.log(data)
      toast.success(data.message);
      dispatch(login(data));
      navigate(`/${data.role}/profile`);
    } catch (error) {
      toast.error(error.data.message);
    }
  };
  return (
    <div className="mt-20 flex min-h-screen items-center justify-center w-full">
      <div className="bg-white shadow-md rounded-3xl px-5 py-6 w-full sm:w-[27rem]">
        <h1 className="text-2xl font-bold text-center mb-4">Let's connect!</h1>
        <form onSubmit={handleLogin}>
          <div className="mb-4">
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Email id
            </label>
            <input
              type="text"
              name="email"
              id="email"
              placeholder="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="shadow-md rounded-md w-full  px-3 py-2 border-gray-300 focus:outline-none focus:ring-black focus:border-black"
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Password
            </label>
            <input
              type="password"
              name="password"
              id="password"
              placeholder="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="shadow-md rounded-md w-full  px-3 py-2 border-gray-300 focus:outline-none focus:ring-black focus:border-black"
            />
          </div>

          <div className="flex items-center justify-end mb-4">
            <Link to="/signup" className="text-xs text-black">
              Create Account
            </Link>
          </div>
          <button
            type="submit"
            className="w-full py-2 px-4 rounded-md shadow-md text-sm font-medium text-white bg-black"
          >
            Login
          </button>
        </form>
      </div>
      <Toaster />
    </div>
  );
};

export default Login;
