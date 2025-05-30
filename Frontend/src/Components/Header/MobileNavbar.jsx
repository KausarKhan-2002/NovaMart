import React from "react";
import { BsMoon, BsSun } from "react-icons/bs";
import { FaRegUser } from "react-icons/fa";
import { HiOutlineShoppingCart } from "react-icons/hi2";
import { IoHomeOutline } from "react-icons/io5";
import { RxCross2 } from "react-icons/rx";
import { MdAdminPanelSettings } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { useLogout } from "../../Hooks/useLogout";
import { DEFAULT_PROFILE } from "../../Utils/constants";
// import toast from "react-hot-toast";
import { toast } from "react-toastify";
import { themeSwitcher } from "../../Store/toggleSlice";

function MobileNavbar({
  sidebarOpen,
  setSidebarOpen,
  bgColor,
  textColor,
  theme,
}) {
  const user = useSelector((store) => store.user);
  const navigate = useNavigate();
  const logout = useLogout();
  const dispatch = useDispatch();

  const handleLogInOut = async () => {
    if (!user) {
      setSidebarOpen(false);
      navigate("/auth");
      return;
    }
    setSidebarOpen(false);

    logout();
  };

  const imgUrl = user?.cloudinaryImage || DEFAULT_PROFILE;

  return (
    <div
      className={`fixed top-0 right-0 h-full w-66 bg-white shadow-lg z-50 transform transition-transform duration-300 md:hidden ${
        sidebarOpen ? "translate-x-0" : "translate-x-full"
      } z-999`}
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
          src={imgUrl}
          className="mx-auto w-25 h-25 border border-slate-600 rounded-full"
        />

        <button className="flex items-center space-x-2 hover:text-emerald-500 transition-colors">
          <IoHomeOutline className="text-xl" />
          <Link
            onClick={() => setSidebarOpen(false)}
            to="/"
            className="text-sm"
          >
            Home
          </Link>
        </button>

        <button
          onClick={() => {
            dispatch(themeSwitcher(theme === "l" ? "d" : "l"));
            toast.warn("Themes feature is under process...");
          }}
          className="text-xl flex items-center space-x-2 hover:text-emerald-500 transition-colors"
        >
          {theme === "d" ? <BsSun /> : <BsMoon />}
          <span className="text-sm">
            {theme === "d" ? "Light Mode" : "Dark Mode"}
          </span>
        </button>

        {["Admin", "Seller", "Moderator"].includes(user?.role) && (
          <Link
            to="/admin-panel"
            onClick={() => setSidebarOpen(false)}
            className="flex items-center space-x-2 hover:text-emerald-500 transition-colors"
          >
            <MdAdminPanelSettings className="text-xl" />
            <span className="text-sm">Admin Panel</span>
          </Link>
        )}

        <Link
          onClick={() => setSidebarOpen(false)}
          to={"/cart"}
          className="relative flex items-center space-x-2 hover:text-emerald-500 transition-colors"
        >
          <HiOutlineShoppingCart className="text-2xl" />
          <span className="text-sm">Cart</span>
          <span className="absolute -top-1 left-16 bg-red-500 text-white text-xs w-4 h-4 flex items-center justify-center rounded-full">
            0
          </span>
        </Link>
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
