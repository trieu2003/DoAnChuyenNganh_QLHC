import React from "react";
import { Navigate } from "react-router-dom";

const PrivateRoute = ({ children, requiredRole }) => {
  const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";
  const userRole = localStorage.getItem("vaiTro");

  if (!isLoggedIn) {
    return <Navigate to="/login" />;
  }

  if (requiredRole && userRole !== requiredRole) {
    alert("Bạn không có quyền truy cập vào trang này.");
    return <Navigate to="/home" />;
  }

  return children;
};

export default PrivateRoute;
