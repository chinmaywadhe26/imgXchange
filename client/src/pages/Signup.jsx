import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
// import toast from react-hot-toast;
const Signup = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState({
    username: "",
    email: "",
    password: "",
    accountType: "",
  });
  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser((pv) => ({
      ...pv,
      [e.target.name]: e.target.value,
    }));
  };
  const handleValidation = () => {
    const { username, email, password, accountType } = user;
    if (username === "" || email === "" || password === "") {
      return false;
    }
    return true;
  };

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      const { username, email, password, accountType } = user;
      if (handleValidation()) {
        const { data } = await axios.post(
          import.meta.env.VITE_API_URL + "/signup",
          {
            username,
            email,
            password,
            accountType,
          }
        );

        if (data.success === true) {
          console.log(data.message);
          navigate("/login");
        } else {
          console.log(data.message);
        }
      }
    } catch (error) {
      console.error("Signup error:", error);
    }
  };

  return (
    <div className="mt-20 flex min-h-screen items-center justify-center w-full">
      <div className="bg-white shadow-md rounded-3xl px-5 py-6 w-full sm:w-[27rem]">
        <h1 className="text-2xl font-bold text-center mb-4">Let's connect!</h1>
        <form onSubmit={(e) => handleSubmit(e)}>
          <div className="mb-4">
            <label
              htmlFor="username"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Username
            </label>
            <input
              type="text"
              name="username"
              id="name"
              placeholder="name"
              onChange={(e) => handleChange(e)}
              className="shadow-md rounded-md w-full  px-3 py-2 border-gray-300 focus:outline-none focus:ring-black focus:border-black"
            />
          </div>
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
              onChange={(e) => handleChange(e)}
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
              onChange={(e) => handleChange(e)}
              className="shadow-md rounded-md w-full  px-3 py-2 border-gray-300 focus:outline-none focus:ring-black focus:border-black"
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="accountType"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Select your account type
            </label>
            <select
              name="accountType"
              onChange={(e) => handleChange(e)}
              className="shadow-md rounded-md w-full  px-3 py-2 border-gray-300 focus:outline-none focus:ring-black focus:border-black"
            >
              <option value="buyer">Buyer</option>
              <option value="seller"> Seller</option>
            </select>
          </div>
          <div className="flex items-center justify-end mb-4">
            <Link to="/login" className="text-xs text-black">
              Login with Account
            </Link>
          </div>
          <button
            type="submit"
            className="w-full py-2 px-4 rounded-md shadow-md text-sm font-medium text-white bg-black"
          >
            SignUp
          </button>
        </form>
      </div>
    </div>
  );
};

export default Signup;
