import React from "react" ; 
import { Navigate } from "react-router-dom"; 
import { useAuth } from "../customHooks/useAuth";
export const PublicRoute = ({ children }) => {
  const { isAuthenticated, loading } = useAuth();

  if (loading) {
    return (
      <div className="flex justify-center items-center py-12">
        <div className="text-lg text-gray-600">Loading...</div>
      </div>
    );
  }

  return isAuthenticated ? <Navigate to="/" /> : children;
};