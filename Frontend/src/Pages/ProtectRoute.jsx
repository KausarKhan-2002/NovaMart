import React from "react";
import { Navigate, Outlet } from "react-router-dom";

function ProtectRoute({ children, user, redirect = "/auth" }) {
  
  // replace ensures a smoother user experience by preventing unnecessary history entries in the browser
  if (!user) return <Navigate to={redirect} replace />; // Proper redirection

  return children ? children : <Outlet />; // Renders nested routes if user is authenticated
}

export default ProtectRoute;