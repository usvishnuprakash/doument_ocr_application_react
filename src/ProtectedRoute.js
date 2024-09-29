import React from "react";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  // Check if the JWT token exists in localStorage
  const token = localStorage.getItem("token");
  console.log(token);
  // If the token does not exist, redirect to the login page
  if (!token) {
    return <Navigate to="/login" />;
  }

  // If the token exists, allow access to the protected page
  return children;
};

export default ProtectedRoute;
