import React from "react";
import { BsMoon, BsSun } from "react-icons/bs";
import { FaRegUser } from "react-icons/fa";
import { FiMenu } from "react-icons/fi";
import { HiOutlineShoppingCart } from "react-icons/hi2";

function DesktopNavbar({ sidebarOpen, setSidebarOpen, darkMode, setDarkMode }) {
  console.log("Desktop");

  return (
    <div className="flex items-center space-x-4">
      {/* Desktop Nav */}
      <nav className="hidden md:flex items-center space-x-4">
        <button
          onClick={() => setDarkMode(!darkMode)}
          className="text-xl hover:text-emerald-500 transition-colors"
        >
          {darkMode ? <BsSun /> : <BsMoon />}
        </button>

        <button className="inline-flex items-center space-x-1 hover:text-emerald-500 transition-colors">
          <FaRegUser className="text-xl" />
        </button>

        <button className="relative hover:text-emerald-500 transition-colors">
          <HiOutlineShoppingCart className="text-2xl" />
          <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs w-4 h-4 flex items-center justify-center rounded-full">
            2
          </span>
        </button>

        <button className="ml-2 bg-emerald-500 hover:bg-emerald-600 text-white px-4 py-1.5 rounded-full text-sm shadow">
          Login
        </button>
      </nav>

      {/* Hamburger Icon */}
      <button
        onClick={() => setSidebarOpen(!sidebarOpen)}
        className="md:hidden text-xl sm:text-2xl focus:outline-none"
      >
        <FiMenu />
      </button>
    </div>
  );
}

export default DesktopNavbar;
