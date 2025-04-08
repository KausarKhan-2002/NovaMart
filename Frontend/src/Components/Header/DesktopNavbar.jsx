import axios from "axios";
import React from "react";
import { BsMoon, BsSun } from "react-icons/bs";
import { FaRegUser } from "react-icons/fa";
import { FiMenu } from "react-icons/fi";
import { HiOutlineShoppingCart } from "react-icons/hi2";
import { useSelector } from "react-redux";
import { BASE_URL } from "../../Utils/constants";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

function DesktopNavbar({ sidebarOpen, setSidebarOpen, darkMode, setDarkMode }) {
  const user = useSelector((store) => store.user);
  const navigate = useNavigate();

  const handleLogInOut = async () => {
    try {
      if (!user) {
        navigate("/auth");
        return;
      }
      const res = await axios.post(
        BASE_URL + "/auth/logout",
        {},
        { withCredentials: true }
      );
      console.log(res);
      toast.success(res.data.message);
    } catch (err) {
      console.log("Error:", err.message);
      // toast.error(res)/\
    }
  };

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

        <button
          onClick={handleLogInOut}
          className="ml-2 bg-emerald-500 hover:bg-emerald-600 text-white px-4 py-1.5 rounded-full text-sm shadow cursor-pointer"
        >
          {user ? "Login" : "Login"}
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
