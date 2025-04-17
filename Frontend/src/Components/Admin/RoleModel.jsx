import React, { useState } from "react";
import { IoMdClose } from "react-icons/io";
import Spinner from "../../Shared/Spinner";
import toast from "react-hot-toast";
import axios from "axios";
import { BASE_URL } from "../../Utils/constants";

function RoleModel({ currUser, setusers, setCurrUser }) {
  const [showSpinner, setShowSpinner] = useState(false);
  const [role, setRole] = useState(currUser.role);
  console.log(role);

  const updateRole = async () => {
    try {
      const res = await axios.patch(
        BASE_URL + "/credential/role",
        { id: currUser._id, role: role },
        { withCredentials: true }
      );
      const updatedUser = res?.data?.user;

      // Update user role in UI
      setusers((prev) =>
        prev.map((user) => (user._id === updatedUser._id ? updatedUser : user))
      );

      setCurrUser(false);
      toast.success(res.data.message);
    } catch (err) {
      console.log("Error:", err.message);
      toast.error("No role is updated please try again!");
    } finally {
      setShowSpinner(false);
    }
  };

  const handleRole = () => {
    setShowSpinner(true);

    updateRole();
  };

  return (
    <section
      id="roleModel"
      onClick={(e) => e.target.id === "roleModel" && setCurrUser(false)}
      className="fixed inset-0 z-[999] flex items-center justify-center bg-black/60 px-4"
    >
      <div className="w-full max-w-md bg-white dark:bg-gray-900 rounded-2xl shadow-2xl p-6 relative">
        {/* Close Icon */}
        <div
          onClick={() => setCurrUser(false)}
          className="absolute top-4 right-4"
        >
          <IoMdClose
            className="text-gray-500 hover:text-gray-800 dark:text-gray-300 dark:hover:text-white cursor-pointer"
            size={24}
          />
        </div>

        {/* Heading */}
        <h2 className="text-2xl font-semibold text-gray-800 dark:text-white text-center mb-6">
          Change User Role
        </h2>

        {/* User Details */}
        <div className="space-y-2 mb-4">
          <p className="text-gray-700 dark:text-gray-300">
            <span className="font-medium">Full Name:</span> {currUser.username}
          </p>
          <p className="text-gray-700 dark:text-gray-300">
            <span className="font-medium">Email:</span> {currUser.email}
          </p>
        </div>

        {/* Role Selection */}
        <div className="mb-6">
          <label
            htmlFor="role"
            className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
          >
            Select Role
          </label>
          <select
            id="role"
            defaultValue={currUser.role}
            onChange={(e) => setRole(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-800 text-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="Admin">Admin</option>
            <option value="User">User</option>
            <option value="Seller">Seller</option>
            <option value="Moderator">Moderator</option>
          </select>
        </div>

        {/* Action Button */}
        <button
          onClick={handleRole}
          className="flex items-center justify-center  gap-3 w-full bg-emerald-600 hover:bg-emerald-700 cursor-pointer text-white font-semibold py-2 rounded-md transition"
        >
          {showSpinner && <Spinner />} Update Role
        </button>
      </div>
    </section>
  );
}

export default RoleModel;
