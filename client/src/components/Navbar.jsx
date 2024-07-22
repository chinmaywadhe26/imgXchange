import { Link } from "react-router-dom";
import React, { useState } from "react";

import { FiMenu } from "react-icons/fi";
import { AiOutlineShoppingCart } from "react-icons/ai";
import { IoCloseOutline } from "react-icons/io5";

import clsx from "clsx";
const Navbar = () => {
  // return (
  //   <nav className="flex flex-col sm:flex-row justify-between items-start sm:items-center px-5 py-5 fixed top-0 left-0 right-0 shadow-md gap-1 sm:gap-0 z-30 bg-white">
  //     <div className="flex justify-between items-center">
  //       <Link to="/" className="font-bold text-3xl">
  //         ImgXchange
  //       </Link>
  //     </div>

  //     <ul className="flex gap-5 text-lg font-semibold text-gray-400 ">
  //       <Link to="/" className="hover:text-black cursor-pointer sm:p-2">
  //         About
  //       </Link>
  //       <Link to="/" className="hover:text-black cursor-pointer sm:p-2">
  //         Contact
  //       </Link>
  //       <Link to="/login" className="hover:text-black cursor-pointer sm:p-2">
  //         Log In
  //       </Link>
  //       <Link to="/signup" className="hover:text-black cursor-pointer sm:p-2">
  //         Sign Up
  //       </Link>
  //     </ul>
  //   </nav>
  // );

  const [isSideMenuOpen, setMenu] = useState(false);

  const navlinks = [
    {
      labe: "About",
      link: "/about",
    },
    {
      labe: "Contact",
      link: "/contact",
    },
    {
      labe: "Login",
      link: "/login",
    },
    {
      labe: "Signup",
      link: "/signup",
    },
  ];

  return (
    <main>
      <nav className=" bg-white border-b-4 fixed top-0 left-0 right-0 z-50  flex justify-between px-8 items-center py-6   ">
        <div className="flex items-center gap-8">
          <section className="flex items-center gap-4">
            {/* menu */}
            <FiMenu
              onClick={() => setMenu(true)}
              className="text-3xl cursor-pointer lg:hidden"
            />
            {/* logo */}
            <Link to={"/"} className="text-4xl font-mono">
              logo
            </Link>
          </section>
          {navlinks.map((d, i) => (
            <Link
              key={i}
              className="hidden lg:block  text-gray-400 hover:text-black"
              to={d.link}
            >
              {d.labe}
            </Link>
          ))}
        </div>

        {/* sidebar mobile menu */}
        <div
          className={clsx(
            " fixed z-50 h-full w-screen lg:hidden bg-black/50  backdrop-blur-sm top-0 right-0  -translate-x-full  transition-all ",
            isSideMenuOpen && "translate-x-0"
          )}
        >
          <section className="text-black bg-white flex-col absolute left-0 top-0 h-screen p-8 gap-8  w-56 flex  ">
            <IoCloseOutline
              onClick={() => setMenu(false)}
              className="mt-0 mb-8 text-3xl cursor-pointer"
            />

            {navlinks.map((d, i) => (
              <Link key={i} className="font-bold" to={d.link}>
                {d.labe}
              </Link>
            ))}
          </section>
        </div>
      </nav>
    </main>
  );
};

export default Navbar;
