import React from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../../customHooks/useAuth";
export const Header = () => {
  const { user, logout, isAuthenticated, token } = useAuth();
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

// import React, { useState } from "react";
// import { useNavigate, Link } from "react-router-dom";
// import { useAuth } from "../../customHooks/useAuth";

// export const Header = () => {
//   const { user, logout, isAuthenticated } = useAuth();
//   const navigate = useNavigate();
//   const [menuOpen, setMenuOpen] = useState(false);

//   const handleLogout = () => {
//     logout();
//     navigate("/login");
//   };

//   return (
//     <header className="bg-blue-600 text-white shadow-md">
//       <div className="max-w-7xl mx-auto px-4 py-4">
//         <div className="flex justify-between items-center">
//           <Link to="/" className="text-2xl font-bold hover:text-blue-200">
//             My Blog
//           </Link>

//           <button
//             className="md:hidden text-white focus:outline-none"
//             onClick={() => setMenuOpen(!menuOpen)}
//           >
//             <svg
//               className="w-6 h-6"
//               fill="none"
//               stroke="currentColor"
//               viewBox="0 0 24 24"
//               xmlns="http://www.w3.org/2000/svg"
//             >
//               {menuOpen ? (
//                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
//               ) : (
//                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
//               )}
//             </svg>
//           </button>
//         </div>

//         <div className={`${menuOpen ? "block" : "hidden"} md:flex md:justify-between md:items-center mt-4 space-y-4 md:space-y-0`}>
//           {isAuthenticated && (
//             <div className="flex flex-col md:flex-row gap-2 md:gap-4 md:items-center md:w-1/2">
//               <input
//                 type="text"
//                 name="searchAuthor"
//                 className="px-3 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400 text-black"
//                 placeholder="Search by Author"
//               />
//               <input
//                 type="text"
//                 name="searchTitle"
//                 className="px-3 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400 text-black"
//                 placeholder="Search by Title"
//               />
//             </div>
//           )}

//           <nav className="flex flex-col md:flex-row md:items-center gap-3 md:gap-6">
//             {isAuthenticated ? (
//               <>
//                 <Link to="/" className="hover:text-blue-200">Home</Link>
//                 <Link to="/my-posts" className="hover:text-blue-200">My Posts</Link>
//                 <Link to="/create" className="hover:text-blue-200">Create Post</Link>
//                 <span className="text-sm">Welcome, {user?.username}!</span>
//                 <button
//                   onClick={handleLogout}
//                   className="bg-red-500 hover:bg-red-600 px-3 py-1 rounded text-sm w-fit"
//                 >
//                   Logout
//                 </button>
//               </>
//             ) : (
//               <>
//                 <Link to="/login" className="hover:text-blue-200">Login</Link>
//                 <Link to="/register" className="hover:text-blue-200">Register</Link>
//               </>
//             )}
//           </nav>
//         </div>
//       </div>
//     </header>
//   );
// };