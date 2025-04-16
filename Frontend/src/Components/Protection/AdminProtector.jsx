import React from "react";
import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";

function AdminProtector() {
  const user = useSelector((store) => store.user);

  // Protect user routes
  if (!user) return <Navigate path="/auth" replace />;

  // Protect Admin routes
  if (!["Admin", "Seller", "Moderator"].includes(user?.role)) {
    return <Navigate to="/unauthorized" replace />;
  }

  // Not protection
  return <Outlet />;
}

export default AdminProtector;
