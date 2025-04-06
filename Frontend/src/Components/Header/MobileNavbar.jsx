import React from "react";
import { BsMoon, BsSun } from "react-icons/bs";
import { FaRegUser } from "react-icons/fa";
import { HiOutlineShoppingCart } from "react-icons/hi2";
import { RxCross2 } from "react-icons/rx";

function MobileNavbar({ sidebarOpen, setSidebarOpen, darkMode, setDarkMode }) {

    
  return (
    <div
      className={`fixed top-0 right-0 h-full w-64 bg-white dark:bg-gray-900 shadow-lg z-50 transform transition-transform duration-300 md:hidden ${
        sidebarOpen ? "translate-x-0" : "translate-x-full"
      }`}
    >
      {/* Close Icon */}
      <div className="flex justify-end p-4">
        <button
          onClick={() => setSidebarOpen(false)}
          className="text-2xl text-gray-700 dark:text-white"
        >
          <RxCross2 />
        </button>
      </div>

      {/* Sidebar Content */}
      <div className="flex flex-col p-5 space-y-5 pb-20">
        <button
          onClick={() => setDarkMode(!darkMode)}
          className="text-xl flex items-center space-x-2 hover:text-emerald-500 transition-colors"
        >
          {darkMode ? <BsSun /> : <BsMoon />}
          <span className="text-sm">
            {darkMode ? "Light Mode" : "Dark Mode"}
          </span>
        </button>

        <button className="flex items-center space-x-2 hover:text-emerald-500 transition-colors">
          <FaRegUser className="text-xl" />
          <span className="text-sm">Profile</span>
        </button>

        <button className="relative flex items-center space-x-2 hover:text-emerald-500 transition-colors">
          <HiOutlineShoppingCart className="text-2xl" />
          <span className="text-sm">Cart</span>
          <span className="absolute -top-1 left-16 bg-red-500 text-white text-xs w-4 h-4 flex items-center justify-center rounded-full">
            0
          </span>
        </button>
      </div>

      {/* Login button fixed at bottom */}
      <div className="absolute bottom-5 left-0 w-full px-5">
        <button className="w-full bg-emerald-500 hover:bg-emerald-600 text-white px-4 py-2 rounded-full text-sm shadow">
          Login
        </button>
      </div>
    </div>
  );
}

export default MobileNavbar;