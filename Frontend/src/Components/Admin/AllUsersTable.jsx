import React from "react";
import { FaEdit } from "react-icons/fa";

const users = [
  {
    id: 1,
    name: "Amit Sharma",
    email: "amit@example.com",
    role: "Admin",
    createdAt: "2024-01-20",
  },
  {
    id: 2,
    name: "Priya Mehta",
    email: "priya@example.com",
    role: "User",
    createdAt: "2024-03-10",
  },
  // Add more users as needed
];

const AllUsersTable = () => {
  return (
    <div className="overflow-x-auto w-full bg-white shadow-md rounded-xl p-4">
      <h2 className="text-xl font-semibold mb-4 text-gray-800">All Users</h2>
      <table className="min-w-full text-sm text-left text-gray-700">
        <thead className="bg-slate-100 text-gray-600 uppercase text-xs">
          <tr>
            <th className="py-3 px-4">Sr</th>
            <th className="py-3 px-4">Name</th>
            <th className="py-3 px-4">Email</th>
            <th className="py-3 px-4">Role</th>
            <th className="py-3 px-4">Created At</th>
            <th className="py-3 px-4">Action</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user, idx) => (
            <tr
              key={user.id}
              className="border-b hover:bg-slate-50 transition duration-200"
            >
              <td className="py-3 px-4">{idx + 1}</td>
              <td className="py-3 px-4 font-medium">{user.name}</td>
              <td className="py-3 px-4">{user.email}</td>
              <td className="py-3 px-4">
                <span
                  className={`px-2 py-1 rounded-full text-xs font-semibold ${
                    user.role === "Admin"
                      ? "bg-emerald-100 text-emerald-700"
                      : "bg-indigo-100 text-indigo-700"
                  }`}
                >
                  {user.role}
                </span>
              </td>
              <td className="py-3 px-4">{user.createdAt}</td>
              <td className="py-3 px-4">
                <button className="text-blue-500 hover:text-blue-700">
                  <FaEdit />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AllUsersTable;