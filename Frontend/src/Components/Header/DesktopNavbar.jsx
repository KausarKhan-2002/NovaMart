import React, { useState } from "react";
import { BsMoon, BsSun } from "react-icons/bs";
import { FiMenu } from "react-icons/fi";
import { HiOutlineShoppingCart } from "react-icons/hi2";
import { useSelector } from "react-redux";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useLogout } from "../../Hooks/useLogout";
import { DEFAULT_PROFILE } from "../../Utils/constants";
import { IoChevronDown } from "react-icons/io5";

function DesktopNavbar({ sidebarOpen, setSidebarOpen, darkMode, setDarkMode }) {
  const [showDropdown, setShowDropdown] = useState(false);

  const user = useSelector((store) => store.user);
  const location = useLocation();
  const path = location.pathname;

  const navigate = useNavigate();
  const logout = useLogout();

  const handleLogInOut = async () => {
    if (!user) {
      navigate("/auth");
      return;
    }
    logout();
  };

  const imgUrl = user?.cloudinaryImage || DEFAULT_PROFILE;

  return (
    <div className="flex items-center space-x-4">
      {/* Desktop Nav */}
      <nav className="hidden md:flex items-center space-x-4 lg:space-x-7">
       
          <div className="flex items-center gap-1 bg-slate-100/50 rounded-full pr-1">
          <img
            onClick={() => setShowDropdown((prev) => !prev)}
            src={imgUrl}
            className="w-10 h-10 object-cover rounded-full border border-slate-200 cursor-pointer"
          />

          <IoChevronDown
            onClick={() => setShowDropdown((prev) => !prev)}
            className={`text-xl text-gray-600 transition-transform duration-200 cursor-pointer ${
              showDropdown ? "rotate-180" : "rotate-0"
            }`}
          />
          </div>

          {/* Profile dropdown */}
          <div
            className={`absolute top-16 w-[140px] bg-white shadow-xl rounded-xl transition-transform duration-300 origin-top transform ${
              showDropdown ? "scale-y-100" : "scale-y-0"
            }`}
          >
            <div className="flex flex-col items-center py-4 gap-2">
              <Link
                onClick={() => path !== "/" && setShowDropdown(false)}
                to={"/"}
                className={`w-full text-center rounded-lg ${
                  path === "/" && "text-emerald-600"
                } hover:text-emerald-600 transition font-medium p-1`}
              >
                Home
              </Link>
              {user && (
                <Link
                  onClick={() =>
                    path !== "/admin-panel" && setShowDropdown(false)
                  }
                  to={"/admin-panel"}
                  className={`w-full text-center rounded-lg ${
                    path === "/admin-panel" && "text-emerald-600"
                  } hover:text-emerald-600 transition font-medium p-1`}
                >
                  Admin panel
                </Link>
              )}
              {user && (
                <Link
                  onClick={() => path !== "/profile" && setShowDropdown(false)}
                  to={"/profile"}
                  className={`w-full text-center rounded-lg ${
                    path === "/profile" && "text-emerald-600"
                  } hover:text-emerald-600 transition font-medium p-1`}
                >
                  Profile
                </Link>
              )}

              {/* Triangle Tail (optional) */}
              {/* <div className="absolute -top-2 left-4 w-0 h-0 border-l-8 border-r-8 border-b-8 border-l-transparent border-r-transparent border-b-white"></div> */}
            </div>
          </div>
        

        {/* 2️⃣ Dark Mode Toggle */}
        <button
          onClick={() => setDarkMode(!darkMode)}
          className="text-xl hover:text-emerald-500 transition-colors"
        >
          {darkMode ? <BsSun /> : <BsMoon />}
        </button>

        {/* 3️⃣ Shopping Cart */}
        <button className="relative hover:text-emerald-500 transition-colors">
          <HiOutlineShoppingCart className="text-2xl" />
          <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs w-4 h-4 flex items-center justify-center rounded-full">
            2
          </span>
        </button>

        {/* 4️⃣ Login / Logout Button */}
        <button
          onClick={handleLogInOut}
          className="ml-2 bg-emerald-500 hover:bg-emerald-600 text-white px-4 py-1.5 rounded-full text-sm shadow cursor-pointer"
        >
          {user ? "Logout" : "Login"}
        </button>
      </nav>

      {/* 5️⃣ Hamburger Icon for Mobile */}
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
