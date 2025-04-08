import React from "react";
import { BsMoon, BsSun } from "react-icons/bs";
import { FaRegUser } from "react-icons/fa";
import { HiOutlineShoppingCart } from "react-icons/hi2";
import { RxCross2 } from "react-icons/rx";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useLogout } from "../../Hooks/useLogout";
import { DEFAULT_PROFILE } from "../../Utils/constants";

function MobileNavbar({ sidebarOpen, setSidebarOpen, darkMode, setDarkMode }) {
  const user = useSelector((store) => store.user);
  const navigate = useNavigate();
  const logout = useLogout();

  const handleLogInOut = async () => {
    if (!user) {
      setSidebarOpen(false)
      navigate("/auth");
      return;
    }
    setSidebarOpen(false)

    logout();
  };

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
          className="text-2xl text-gray-700"
        >
          <RxCross2 />
        </button>
      </div>

      {/* Sidebar Content */}
      <div className="flex flex-col p-5 space-y-5 pb-20">
        <img
          src={
            user
              ? user.cloudinaryImage
                ? user.cloudinaryImage
                : DEFAULT_PROFILE
              : DEFAULT_PROFILE
          }
          className="mx-auto w-25 h-25 border border-slate-600 rounded-full"
        />

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
        <button
          onClick={handleLogInOut}
          className="w-full bg-emerald-500 hover:bg-emerald-600 text-white px-4 py-2 rounded-full text-sm shadow"
        >
          {user ? "Logout" : "Login"}
        </button>
      </div>
    </div>
  );
}

export default MobileNavbar;
