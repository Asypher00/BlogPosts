import React from "react" ; 
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../../customHooks/useAuth" ; 
export const Header = () => {
  const { user, logout, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <header className="bg-blue-600 text-white shadow-lg">
      <div className="container mx-auto px-4 py-4">
        <div className="flex justify-between items-center">
          <Link to="/" className="text-2xl font-bold hover:text-blue-200">
            My Blog
          </Link>
          <nav className="flex items-center space-x-4">
            {isAuthenticated ? (
              <>
                <Link to="/" className="hover:text-blue-200">Home</Link>
                <Link to="/my-posts" className="hover:text-blue-200">My Posts</Link>
                <Link to="/create" className="hover:text-blue-200">Create Post</Link>
                <span className="text-sm">Welcome, {user?.username}!</span>
                <button
                  onClick={handleLogout}
                  className="bg-red-500 hover:bg-red-600 px-3 py-1 rounded text-sm"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link to="/login" className="hover:text-blue-200">Login</Link>
                <Link to="/register" className="hover:text-blue-200">Register</Link>
              </>
            )}
          </nav>
        </div>
      </div>
    </header>
  );
};

