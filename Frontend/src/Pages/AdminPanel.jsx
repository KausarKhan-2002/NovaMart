import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { Link, Outlet, useLocation, useNavigate } from "react-router-dom";
import { DEFAULT_PROFILE } from "../Utils/constants";
import { FaUsers } from "react-icons/fa";
import { TbPackages } from "react-icons/tb";

function AdminPanel() {
  const user = useSelector((store) => store.user);

  const imgUrl = user?.cloudinaryImage || DEFAULT_PROFILE;
  const username = user?.username || "admin";
  const navigate = useNavigate()
  const location = useLocation()
  const path = location.pathname

  useEffect(() => {
    navigate("all-users")
  }, [])

  return (
    <div className="flex flex-col md:flex-row h-screen">
      {/* Sidebar */}
      <aside className="w-full md:w-[250px] bg-white shadow-md md:shadow-xl">
        <div className="flex flex-col items-center py-6 border-b border-slate-200">
          <img
            src={imgUrl}
            alt="profile"
            className="w-24 h-24 rounded-full object-cover border-4 border-slate-200"
          />
          <h2 className="mt-4 text-lg font-semibold text-gray-800 capitalize">
            Admin
          </h2>
          <p className="text-sm text-gray-500 mt-1">@{username}</p>

          <Link
            to="/profile"
            className="text-xs mt-2 text-emerald-600 hover:underline"
          >
            Edit Profile
          </Link>
        </div>

        <nav className="flex flex-col gap-2 p-4 text-gray-700">
          <Link
            to="all-users"
            className={`flex items-center gap-2 px-4 py-2 rounded-lg ${path === "/admin-panel/all-users" && "bg-slate-100"} hover:bg-slate-100 font-medium transition`}
          >
            <FaUsers size={20}/> All Users
          </Link>
          <Link
            to="all-products"
            className={`flex items-center gap-2 px-4 py-2 rounded-lg ${path === "/admin-panel/all-products" && "bg-slate-100"} hover:bg-slate-100 font-medium transition`}
          >
            <TbPackages size={20}/> All Products
          </Link>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 bg-gray-50 p-4 overflow-y-auto">
        <Outlet />
      </main>
    </div>
  );
}

export default AdminPanel;
