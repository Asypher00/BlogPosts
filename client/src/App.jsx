// import React, { useState, useEffect, useContext, createContext } from "react";

// //Auth Context
// const AuthContext = createContext();
// const useAuth = () => {
//   const context = useContext(AuthContext);
//   if (!context) {
//     throw new Error("useAuth must be used inside a provider");
//   }

//   return context;

// }

// //API Base URL
// const API_BASE_URL = "http://localhost:5000/api";

// //API helper functions

// const api = {
//   //Auth endpoints
//   register: async (userData) => {
//     const response = await fetch(`${API_BASE_URL}/auth/register`, {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify(userData),
//     });

//     return response.json();
//   },

//   login: async (credentials) => {
//     const response = await fetch(`${API_BASE_URL}/auth/login`, {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify(credentials),
//     });
//     return response.json();
//   },

//   getProfile: async (token) => {
//     const response = await fetch(`${API_BASE_URL}/auth/profile`, {
//       method: "GET",
//       headers: {
//         "Content-Type": "application/json",
//         "Authorization": `Bearer ${token}`,
//       }
//     });
//     return response.json();
//   },

//   //Blog Endpoints
//   getAllPosts: async () => {
//     const response = await fetch(`${API_BASE_URL}/blogs`)
//     return response.json();
//   },

//   createPost: async (postData, token) => {
//     const response = await fetch(`${API_BASE_URL}/blogs`, {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//         "Authorization": `Bearer ${token}`,
//       },
//       body: JSON.stringify(postData),
//     });
//     return response.json();
//   },

//   updatePost: async (postData, token, id) => {
//     const response = await fetch(`${API_BASE_URL}/blogs/${id}`, {
//       method: "PUT",
//       headers: {
//         "Content-Type": "application/json",
//         "Authorization": `Bearer ${token}`,
//       },
//       body: JSON.stringify(postData),
//     });
//     return response.json();
//   },

//   deletePost: async (id, token) => {
//     const response = await fetch(`${API_BASE_URL}/blogs/${id}`, {
//       method: "DELETE",
//       headers: {
//         "Content-Type": "application/json",
//         "Authorization": `Bearer ${token}`,
//       },
//     });
//     return response.json();
//   },

//   getPostById: async (token, id) => {
//     const response = await fetch(`${API_BASE_URL}/blogs/${id}`, {
//       method: "GET",
//       headers: {
//         "Content-Type": "application/json",
//         "Authorization": `Bearer ${token}`,
//       },
//     });
//     return response.json();
//   },

//   getMyPosts: async (token) => {
//     const response = await fetch(`${API_BASE_URL}/blogs/user/my-posts`, {
//       method: "GET",
//       headers: {
//         "Content-Type": "application/json",
//         "Authorization": `Bearer ${token}`,
//       },
//     });
//     return response.json();
//   }
// };

// //Auth Provider Component

// const AuthProvider = ({ children }) => {
//   const [user, setUser] = useState(null);
//   const [token, setToken] = useState(null);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const savedToken = localStorage.getItem("blogToken");
//     const savedUser = localStorage.getItem("blogUser");

//     if (savedToken && savedUser) {
//       setToken(savedToken);
//       setUser(savedUser);
//     }
//     setLoading(false);
//   }, []);

//   const login = (userData, userToken) => {
//     setUser(userData);
//     setToken(userToken);
//     localStorage.setItem("blogToken", userToken);
//     localStorage.setItem("blogUser", userData);
//   }

//   const logout = () => {
//     setUser(null);
//     setToken(null);
//     localStorage.removeItem("blogToken");
//     localStorage.removeItem("blogUser");
//   }

//   const value = {
//     token,
//     user,
//     login,
//     logout,
//     isAuthenticated: !!user,
//     loading,
//   }

//   return (
//     <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
//   )
// }

// //Login Component

// const LoginForm = ({ onSwitchToRegister }) => {
//   const [formData, setFormData] = useState({
//     username: "",
//     password: "",
//   })
//   const [errors, setErrors] = useState({});
//   const [loading, setLoading] = useState(false);
//   const { login } = useAuth();

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setLoading(true);

//     try {
//       const result = await api.login(formData);
//       if (result.success) {
//         login(result.data.user, result.data.token);
//       } else {
//         setErrors({
//           submit: result.message,
//         });
//       }
//     } catch (error) {
//       setErrors({
//         submit: "Network Error, Please Try Again",
//       });
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleChange = (e) => {
//     setFormData({
//       ...formData,
//       [e.target.name]: e.target.value,
//     });
//     if (errors[e.target.name]) {
//       setErrors({
//         ...errors,
//         [e.target.name]: "",
//       });
//     }
//   };

//   return (
//     <div className="max-w-md mx-auto bg-white p-8 rounded-lg shadow-md">
//       <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">Login</h2>
//       <form onSubmit={handleSubmit} className="space-y-4">
//         <div>
//           <label className="block text-sm font-medium text-gray-700 mb-1">
//             Email
//           </label>
//           <input
//             type="text"
//             name="username"
//             value={formData.email}
//             onChange={handleChange}
//             className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//             required
//           />
//         </div>
//         <div>
//           <label className="block text-sm font-medium text-gray-700 mb-1">
//             Password
//           </label>
//           <input
//             type="password"
//             name="password"
//             value={formData.password}
//             onChange={handleChange}
//             className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//             required
//           />
//         </div>
//         {errors.submit && (
//           <div className="text-red-600 text-sm">{errors.submit}</div>
//         )}
//         <button
//           type="submit"
//           disabled={loading}
//           className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
//         >
//           {loading ? 'Logging in...' : 'Login'}
//         </button>
//       </form>
//       <p className="mt-4 text-center text-sm text-gray-600">
//         Don't have an account?{' '}
//         <button
//           onClick={onSwitchToRegister}
//           className="text-blue-600 hover:underline"
//         >
//           Register here
//         </button>
//       </p>
//     </div>
//   );
// };

// const RegisterForm = ({ onSwitchToLogin }) => {
//   const [formData, setFormData] = useState({
//     username: "",
//     email: "",
//     password: "",
//     confirmPassword: "",
//   });
//   const [errors, setErrors] = useState({});
//   const [loading, setLoading] = useState(false);
//   const { login } = useAuth();

//   const validateForm = () => {
//     const newErrors = {};

//     if (formData.username.length < 3) {
//       newErrors.username = "Username must be atleast three characters";
//     };

//     if (!/\S+@\S+\.\S+/.test(formData.email)) {
//       newErrors.email = 'Please enter a valid email';
//     };

//     if (formData.password.length < 6) {
//       newErrors.password = "Password must be atleast 6 characters"
//     };

//     if (formData.password !== formData.confirmPassword) {
//       newErrors.confirmPassword = "Passwords dont match";
//     }

//     return newErrors;
//   }

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     const formErrors = validateForm();
//     if (Object.keys(formErrors).length > 0) {
//       setErrors(formErrors);
//       return;
//     }

//     setLoading(true);
//     //setErrors({});

//     try {
//       const result = await api.register({
//         username: formData.username,
//         email: formData.email,
//         password: formData.password,
//       });

//       if (result.success) {
//         login(result.data.user, result.data.token);
//       } else {
//         setErrors({
//           submit: result.message
//         })
//       }
//     } catch (error) {
//       setErrors({
//         submit: "Network Error,Please try again",
//       });
//     } finally {
//       setLoading(false);
//     }
//   }

//   const handleChange = (e) => {
//     setFormData({
//       ...formData,
//       [e.target.name]: e.target.value,
//     });
//     if (errors[e.target.name]) {
//       setErrors({
//         ...errors,
//         [e.target.name]: "",
//       });
//     };
//   };

//   return (
//     <div className="max-w-md mx-auto bg-white p-8 rounded-lg shadow-md">
//       <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">Register</h2>
//       <form onSubmit={handleSubmit} className="space-y-4">
//         <div>
//           <label className="block text-sm font-medium text-gray-700 mb-1">
//             Username
//           </label>
//           <input
//             type="text"
//             name="username"
//             value={formData.username}
//             onChange={handleChange}
//             className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//             required
//           />
//           {errors.username && (
//             <div className="text-red-600 text-sm mt-1">{errors.username}</div>
//           )}
//         </div>
//         <div>
//           <label className="block text-sm font-medium text-gray-700 mb-1">
//             Email
//           </label>
//           <input
//             type="email"
//             name="email"
//             value={formData.email}
//             onChange={handleChange}
//             className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//             required
//           />
//           {errors.email && (
//             <div className="text-red-600 text-sm mt-1">{errors.email}</div>
//           )}
//         </div>
//         <div>
//           <label className="block text-sm font-medium text-gray-700 mb-1">
//             Password
//           </label>
//           <input
//             type="password"
//             name="password"
//             value={formData.password}
//             onChange={handleChange}
//             className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//             required
//           />
//           {errors.password && (
//             <div className="text-red-600 text-sm mt-1">{errors.password}</div>
//           )}
//         </div>
//         <div>
//           <label className="block text-sm font-medium text-gray-700 mb-1">
//             Confirm Password
//           </label>
//           <input
//             type="password"
//             name="confirmPassword"
//             value={formData.confirmPassword}
//             onChange={handleChange}
//             className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//             required
//           />
//           {errors.confirmPassword && (
//             <div className="text-red-600 text-sm mt-1">{errors.confirmPassword}</div>
//           )}
//         </div>
//         {errors.submit && (
//           <div className="text-red-600 text-sm">{errors.submit}</div>
//         )}
//         <button
//           type="submit"
//           disabled={loading}
//           className="w-full bg-green-600 text-white py-2 px-4 rounded-md hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed"
//         >
//           {loading ? 'Registering...' : 'Register'}
//         </button>
//       </form>
//       <p className="mt-4 text-center text-sm text-gray-600">
//         Already have an account?{' '}
//         <button
//           onClick={onSwitchToLogin}
//           className="text-blue-600 hover:underline"
//         >
//           Login here
//         </button>
//       </p>
//     </div>
//   );

// }

// // Header Component
// const Header = () => {
//   const { user, logout, isAuthenticated } = useAuth();

//   return (
//     <header className="bg-blue-600 text-white shadow-lg">
//       <div className="container mx-auto px-4 py-4">
//         <div className="flex justify-between items-center">
//           <h1 className="text-2xl font-bold">My Blog</h1>
//           {isAuthenticated ? (
//             <div className="flex items-center space-x-4">
//               <span className="text-sm">Welcome, {user.username}!</span>
//               <button
//                 onClick={logout}
//                 className="bg-red-500 hover:bg-red-600 px-3 py-1 rounded text-sm"
//               >
//                 Logout
//               </button>
//             </div>
//           ) : (
//             <div className="text-sm">Please login to create posts</div>
//           )}
//         </div>
//       </div>
//     </header>
//   );
// };

// //Blog Post Card Component

// const BlogPostCard = ({ post, onEdit, onDelete, showActions = true }) => {
//   const formatDate = (dateString) => {
//     return new Date(dateString).toLocaleDateString("en-us", {
//       year: "numeric",
//       month: "long",
//       day: "numeric",
//       hour: "2-digit",
//       minute: "2-digit",
//     });
//   }

//   return (
//     <div className="bg-white rounded-lg shadow-md p-6 mb-6">
//       <div className="flex justify-between items-start mb-4">
//         <div>
//           <h3 className="text-xl font-semibold text-gray-800 mb-2">{post.title}</h3>
//           <div className="text-sm text-gray-600">
//             By {post.authorName} • {formatDate(post.createdAt)}
//             {post.updatedAt !== post.createdAt && (
//               <span> • Updated {formatDate(post.updatedAt)}</span>
//             )}
//           </div>
//         </div>
//         {showActions && (
//           <div className="flex space-x-2">
//             <button
//               onClick={() => onEdit(post)}
//               className="text-blue-600 hover:text-blue-800 text-sm"
//             >
//               Edit
//             </button>
//             <button
//               onClick={() => onDelete(post.id)}
//               className="text-red-600 hover:text-red-800 text-sm"
//             >
//               Delete
//             </button>
//           </div>
//         )}
//       </div>
//       <div className="text-gray-700 whitespace-pre-wrap">{post.content}</div>
//     </div>
//   );
// }

// //Create/edit Post From Component

// const PostForm = ({ post, onSubmit, onCancel }) => {
//   const [formData, setFormData] = useState({
//     title: post ? post.title : "",
//     content: post ? post.content : "",
//   });

//   const [errors, setErrors] = useState({});
//   const [loading, setLoading] = useState(false);

//   const validateForm = () => {
//     const newErrors = {}
//     if (formData.title.trim().length < 3) {
//       newErrors.title = "Title must be atlest 3 characters";
//     }

//     if (formData.content.trim().length < 10) {
//       newErrors.content = "Content must be atleast 10 characters";
//     }
//     return newErrors;

//   }

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     const formErrors = validateForm();
//     if (Object.keys(formErrors).length > 0) {
//       setErrors(formErrors);
//       return;
//     }
//     setLoading(true);
//     try {
//       await onSubmit(formData);
//     } catch (error) {
//       setErrors({
//         submit: "Failed to save post",
//       });
//     } finally {
//       setLoading(false);
//     }
//   }

//   const handleChange = (e) => {
//     setFormData({
//       ...formData,
//       [e.target.name]: e.target.value,
//     });
//     if (errors[e.target.name]) {
//       setErrors({
//         ...errors,
//         [e.target.name]: "",
//       });
//     }
//   };
//   return (
//     <div className="bg-white rounded-lg shadow-md p-6 mb-6">
//       <h3 className="text-xl font-semibold mb-4">
//         {post ? 'Edit Post' : 'Create New Post'}
//       </h3>
//       <form onSubmit={handleSubmit} className="space-y-4">
//         <div>
//           <label className="block text-sm font-medium text-gray-700 mb-1">
//             Title
//           </label>
//           <input
//             type="text"
//             name="title"
//             value={formData.title}
//             onChange={handleChange}
//             className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//             required
//           />
//           {errors.title && (
//             <div className="text-red-600 text-sm mt-1">{errors.title}</div>
//           )}
//         </div>
//         <div>
//           <label className="block text-sm font-medium text-gray-700 mb-1">
//             Content
//           </label>
//           <textarea
//             name="content"
//             value={formData.content}
//             onChange={handleChange}
//             rows="6"
//             className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//             required
//           />
//           {errors.content && (
//             <div className="text-red-600 text-sm mt-1">{errors.content}</div>
//           )}
//         </div>
//         {errors.submit && (
//           <div className="text-red-600 text-sm">{errors.submit}</div>
//         )}
//         <div className="flex space-x-4">
//           <button
//             type="submit"
//             disabled={loading}
//             className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 disabled:opacity-50"
//           >
//             {loading ? 'Saving...' : (post ? 'Update Post' : 'Create Post')}
//           </button>
//           <button
//             type="button"
//             onClick={onCancel}
//             className="bg-gray-500 text-white px-4 py-2 rounded-md hover:bg-gray-600"
//           >
//             Cancel
//           </button>
//         </div>
//       </form>
//     </div>
//   );
// }

// //Main Blog Component

// const BlogList = () => {
//   const [posts, setPosts] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [showCreateForm, setShowCreateForm] = useState(false);
//   const [editingPost, setEditingPost] = useState(null);
//   const { isAuthenticated, token, user } = useAuth();

//   const fetchPosts = async () => {
//     try {
//       const result = await api.getAllPosts();
//       if (result.success) {
//         setPosts(result.data.posts);
//       }
//     } catch (error) {
//       console.log(error)
//     } finally {
//       setLoading(false)
//     }
//   }

//   useEffect(() => {
//     fetchPosts();
//   }, []);

//   const handleCreatePost = async (postData) => {
//     const result = await api.createPost(postData, token);
//     if (result.success) {
//       setPosts([result.data.post, ...posts]);
//       setShowCreateForm(false);
//     }
//   }

//   const handleUpdatePost = async (postData) => {
//     const result = await api.updatePost(postData, token, editingPost.id);
//     if (result.success) {
//       setPosts(posts.map(p => p.id === editingPost.id ? result.data.post : p));
//       setEditingPost(null);
//     }
//   }

//   const handleDeletePost = async (postId) => {
//     if (window.confirm("Are you sure you want to delete this post?")) {
//       const result = await api.deletePost(postId, token);
//       if (result.success) {
//         setPosts(posts.filter(p => p.id != postId));
//       }
//     }
//   }
//   if (loading) {
//     return (
//       <div className="flex justify-center items-center py-12">
//         <div className="text-lg text-gray-600">Loading posts...</div>
//       </div>
//     );
//   }

//   return (
//     <div className="container mx-auto px-4 py-8">
//       {isAuthenticated && (
//         <div className="mb-8">
//           {!showCreateForm && !editingPost && (
//             <button
//               onClick={() => setShowCreateForm(true)}
//               className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700"
//             >
//               Create New Post
//             </button>
//           )}

//           {showCreateForm && (
//             <PostForm
//               onSubmit={handleCreatePost}
//               onCancel={() => setShowCreateForm(false)}
//             />
//           )}

//           {editingPost && (
//             <PostForm
//               post={editingPost}
//               onSubmit={handleUpdatePost}
//               onCancel={() => setEditingPost(null)}
//             />
//           )}
//         </div>
//       )}

//       <div className="space-y-6">
//         {posts.length === 0 ? (
//           <div className="text-center py-12">
//             <div className="text-gray-600 text-lg">No blog posts yet.</div>
//             {isAuthenticated && (
//               <div className="text-gray-500 mt-2">Be the first to create one!</div>
//             )}
//           </div>
//         ) : (
//           posts.map((post) => (
//             <BlogPostCard
//               key={post.id}
//               post={post}
//               showActions={isAuthenticated && user.id === post.authorId}
//               onEdit={setEditingPost}
//               onDelete={handleDeletePost}
//             />
//           ))
//         )}
//       </div>
//     </div>
//   );

// }

// // Auth Screen Component
// const AuthScreen = () => {
//   const [isLogin, setIsLogin] = useState(true);

//   return (
//     <div className="min-h-screen bg-gray-100 flex items-center justify-center py-12 px-4">
//       {isLogin ? (
//         <LoginForm onSwitchToRegister={() => setIsLogin(false)} />
//       ) : (
//         <RegisterForm onSwitchToLogin={() => setIsLogin(true)} />
//       )}
//     </div>
//   );
// };

// // Main App Component
// const App = () => {
//   return (
//     <AuthProvider>
//       <div className="min-h-screen bg-gray-100">
//         <AuthContent />
//       </div>
//     </AuthProvider>
//   );
// };

// // Auth Content Component
// const AuthContent = () => {
//   const { isAuthenticated, loading } = useAuth();

//   if (loading) {
//     return (
//       <div className="min-h-screen flex items-center justify-center">
//         <div className="text-lg text-gray-600">Loading...</div>
//       </div>
//     );
//   }

//   return (
//     <>
//       <Header />
//       <BlogList />
//       {!isAuthenticated && (
//         <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
//           <AuthScreen />
//         </div>
//       )}
//     </>
//   );
// };

// export default App;




import React, { useState, useEffect, useContext, createContext } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate, useNavigate, Link } from "react-router-dom";

// Auth Context
const AuthContext = createContext();
const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used inside a provider");
  }
  return context;
};

// API Base URL
const API_BASE_URL = "http://localhost:5000/api";

// API helper functions
const api = {
  // Auth endpoints
  register: async (userData) => {
    const response = await fetch(`${API_BASE_URL}/auth/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userData),
    });
    return response.json();
  },

  login: async (credentials) => {
    const response = await fetch(`${API_BASE_URL}/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(credentials),
    });
    return response.json();
  },

  getProfile: async (token) => {
    const response = await fetch(`${API_BASE_URL}/auth/profile`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`,
      }
    });
    return response.json();
  },

  // Blog Endpoints
  getAllPosts: async () => {
    const response = await fetch(`${API_BASE_URL}/blogs`);
    return response.json();
  },

  createPost: async (postData, token) => {
    const response = await fetch(`${API_BASE_URL}/blogs`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`,
      },
      body: JSON.stringify(postData),
    });
    return response.json();
  },

  updatePost: async (postData, token, id) => {
    const response = await fetch(`${API_BASE_URL}/blogs/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`,
      },
      body: JSON.stringify(postData),
    });
    return response.json();
  },

  deletePost: async (id, token) => {
    const response = await fetch(`${API_BASE_URL}/blogs/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`,
      },
    });
    return response.json();
  },

  getPostById: async (id, token = null) => {
    const headers = {
      "Content-Type": "application/json",
    };
    if (token) {
      headers["Authorization"] = `Bearer ${token}`;
    }
    
    const response = await fetch(`${API_BASE_URL}/blogs/${id}`, {
      method: "GET",
      headers,
    });
    return response.json();
  },

  getMyPosts: async (token) => {
    const response = await fetch(`${API_BASE_URL}/blogs/user/my-posts`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`,
      },
    });
    return response.json();
  }
};

// Auth Provider Component
const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const savedToken = localStorage.getItem("blogToken");
    const savedUser = localStorage.getItem("blogUser");

    if (savedToken && savedUser) {
      try {
        setToken(savedToken);
        setUser(JSON.parse(savedUser)); // Parse JSON string
      } catch (error) {
        console.error("Error parsing saved user data:", error);
        localStorage.removeItem("blogToken");
        localStorage.removeItem("blogUser");
      }
    }
    setLoading(false);
  }, []);

  const login = (userData, userToken) => {
    setUser(userData);
    setToken(userToken);
    localStorage.setItem("blogToken", userToken);
    localStorage.setItem("blogUser", JSON.stringify(userData)); // Stringify user data
  };

  const logout = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem("blogToken");
    localStorage.removeItem("blogUser");
  };

  const value = {
    token,
    user,
    login,
    logout,
    isAuthenticated: !!user,
    loading,
  };

  return (
    <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
  );
};

// Protected Route Component
const ProtectedRoute = ({ children }) => {
  const { isAuthenticated, loading } = useAuth();

  if (loading) {
    return (
      <div className="flex justify-center items-center py-12">
        <div className="text-lg text-gray-600">Loading...</div>
      </div>
    );
  }

  return isAuthenticated ? children : <Navigate to="/login" />;
};

// Login Component
const LoginForm = () => {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErrors({});

    try {
      const result = await api.login(formData);
      if (result.success) {
        // Extract user data from token or create user object
        const userData = {
          id: result.data.userId || result.data.id,
          username: formData.username,
        };
        login(userData, result.data);
        navigate("/");
      } else {
        setErrors({
          submit: result.message || "Login failed",
        });
      }
    } catch (error) {
      console.error("Login error:", error);
      setErrors({
        submit: "Network Error, Please Try Again",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
    if (errors[e.target.name]) {
      setErrors({
        ...errors,
        [e.target.name]: "",
      });
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center py-12 px-4">
      <div className="max-w-md w-full bg-white p-8 rounded-lg shadow-md">
        <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">Login</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Username
            </label>
            <input
              type="text"
              name="username"
              value={formData.username}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Password
            </label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          {errors.submit && (
            <div className="text-red-600 text-sm">{errors.submit}</div>
          )}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? 'Logging in...' : 'Login'}
          </button>
        </form>
        <p className="mt-4 text-center text-sm text-gray-600">
          Don't have an account?{' '}
          <Link to="/register" className="text-blue-600 hover:underline">
            Register here
          </Link>
        </p>
      </div>
    </div>
  );
};

// Register Component
const RegisterForm = () => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const validateForm = () => {
    const newErrors = {};

    if (formData.username.length < 6) {
      newErrors.username = "Username must be at least 6 characters";
    }

    if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email';
    }

    if (formData.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    }

    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Passwords don't match";
    }

    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formErrors = validateForm();
    if (Object.keys(formErrors).length > 0) {
      setErrors(formErrors);
      return;
    }

    setLoading(true);
    setErrors({});

    try {
      const result = await api.register({
        username: formData.username,
        email: formData.email,
        password: formData.password,
      });

      if (result.success) {
        const userData = {
          username: formData.username,
          email: formData.email,
        };
        login(userData, result.data);
        navigate("/");
      } else {
        setErrors({
          submit: result.message || "Registration failed"
        });
      }
    } catch (error) {
      console.error("Registration error:", error);
      setErrors({
        submit: "Network Error, Please try again",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
    if (errors[e.target.name]) {
      setErrors({
        ...errors,
        [e.target.name]: "",
      });
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center py-12 px-4">
      <div className="max-w-md w-full bg-white p-8 rounded-lg shadow-md">
        <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">Register</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Username
            </label>
            <input
              type="text"
              name="username"
              value={formData.username}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
            {errors.username && (
              <div className="text-red-600 text-sm mt-1">{errors.username}</div>
            )}
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Email
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
            {errors.email && (
              <div className="text-red-600 text-sm mt-1">{errors.email}</div>
            )}
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Password
            </label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
            {errors.password && (
              <div className="text-red-600 text-sm mt-1">{errors.password}</div>
            )}
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Confirm Password
            </label>
            <input
              type="password"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
            {errors.confirmPassword && (
              <div className="text-red-600 text-sm mt-1">{errors.confirmPassword}</div>
            )}
          </div>
          {errors.submit && (
            <div className="text-red-600 text-sm">{errors.submit}</div>
          )}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-green-600 text-white py-2 px-4 rounded-md hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? 'Registering...' : 'Register'}
          </button>
        </form>
        <p className="mt-4 text-center text-sm text-gray-600">
          Already have an account?{' '}
          <Link to="/login" className="text-blue-600 hover:underline">
            Login here
          </Link>
        </p>
      </div>
    </div>
  );
};

// Header Component
const Header = () => {
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

// Blog Post Card Component
const BlogPostCard = ({ post, onEdit, onDelete, showActions = true }) => {
  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-us", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6 mb-6">
      <div className="flex justify-between items-start mb-4">
        <div>
          <h3 className="text-xl font-semibold text-gray-800 mb-2">{post.title}</h3>
          <div className="text-sm text-gray-600">
            By {post.authorName || post.authorId?.username} • {formatDate(post.createdAt)}
            {post.updatedAt !== post.createdAt && (
              <span> • Updated {formatDate(post.updatedAt)}</span>
            )}
          </div>
        </div>
        {showActions && (
          <div className="flex space-x-2">
            <button
              onClick={() => onEdit(post)}
              className="text-blue-600 hover:text-blue-800 text-sm"
            >
              Edit
            </button>
            <button
              onClick={() => onDelete(post._id)}
              className="text-red-600 hover:text-red-800 text-sm"
            >
              Delete
            </button>
          </div>
        )}
      </div>
      <div className="text-gray-700 whitespace-pre-wrap">{post.content}</div>
    </div>
  );
};

// Create/Edit Post Form Component
const PostForm = ({ post, onSubmit, onCancel }) => {
  const [formData, setFormData] = useState({
    title: post ? post.title : "",
    content: post ? post.content : "",
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const validateForm = () => {
    const newErrors = {};
    if (formData.title.trim().length < 3) {
      newErrors.title = "Title must be at least 3 characters";
    }
    if (formData.content.trim().length < 10) {
      newErrors.content = "Content must be at least 10 characters";
    }
    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formErrors = validateForm();
    if (Object.keys(formErrors).length > 0) {
      setErrors(formErrors);
      return;
    }
    setLoading(true);
    try {
      await onSubmit(formData);
    } catch (error) {
      setErrors({
        submit: "Failed to save post",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
    if (errors[e.target.name]) {
      setErrors({
        ...errors,
        [e.target.name]: "",
      });
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6 mb-6">
      <h3 className="text-xl font-semibold mb-4">
        {post ? 'Edit Post' : 'Create New Post'}
      </h3>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Title
          </label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
          {errors.title && (
            <div className="text-red-600 text-sm mt-1">{errors.title}</div>
          )}
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Content
          </label>
          <textarea
            name="content"
            value={formData.content}
            onChange={handleChange}
            rows="6"
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
          {errors.content && (
            <div className="text-red-600 text-sm mt-1">{errors.content}</div>
          )}
        </div>
        {errors.submit && (
          <div className="text-red-600 text-sm">{errors.submit}</div>
        )}
        <div className="flex space-x-4">
          <button
            type="submit"
            disabled={loading}
            className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 disabled:opacity-50"
          >
            {loading ? 'Saving...' : (post ? 'Update Post' : 'Create Post')}
          </button>
          <button
            type="button"
            onClick={onCancel}
            className="bg-gray-500 text-white px-4 py-2 rounded-md hover:bg-gray-600"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

// Home Page Component
const HomePage = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const { isAuthenticated, user } = useAuth();

  const fetchPosts = async () => {
    try {
      const result = await api.getAllPosts();
      if (result.success) {
        setPosts(result.data.posts);
      }
    } catch (error) {
      console.error("Error fetching posts:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center py-12">
        <div className="text-lg text-gray-600">Loading posts...</div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="space-y-6">
        {posts.length === 0 ? (
          <div className="text-center py-12">
            <div className="text-gray-600 text-lg">No blog posts yet.</div>
            {isAuthenticated && (
              <div className="text-gray-500 mt-2">
                <Link to="/create" className="text-blue-600 hover:underline">
                  Be the first to create one!
                </Link>
              </div>
            )}
          </div>
        ) : (
          posts.map((post) => (
            <BlogPostCard
              key={post._id}
              post={post}
              showActions={false}
            />
          ))
        )}
      </div>
    </div>
  );
};

// My Posts Page Component
const MyPostsPage = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingPost, setEditingPost] = useState(null);
  const { token, user } = useAuth();
  const navigate = useNavigate();

  const fetchMyPosts = async () => {
    try {
      const result = await api.getMyPosts(token);
      if (result.success) {
        setPosts(result.data.posts);
      }
    } catch (error) {
      console.error("Error fetching my posts:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMyPosts();
  }, [token]);

  const handleUpdatePost = async (postData) => {
    try {
      const result = await api.updatePost(postData, token, editingPost._id);
      if (result.success) {
        setPosts(posts.map(p => p._id === editingPost._id ? result.data.post : p));
        setEditingPost(null);
      }
    } catch (error) {
      console.error("Error updating post:", error);
    }
  };

  const handleDeletePost = async (postId) => {
    if (window.confirm("Are you sure you want to delete this post?")) {
      try {
        const result = await api.deletePost(postId, token);
        if (result.success) {
          setPosts(posts.filter(p => p._id !== postId));
        }
      } catch (error) {
        console.error("Error deleting post:", error);
      }
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center py-12">
        <div className="text-lg text-gray-600">Loading your posts...</div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-gray-800">My Posts</h1>
        <Link
          to="/create"
          className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700"
        >
          Create New Post
        </Link>
      </div>

      {editingPost && (
        <PostForm
          post={editingPost}
          onSubmit={handleUpdatePost}
          onCancel={() => setEditingPost(null)}
        />
      )}

      <div className="space-y-6">
        {posts.length === 0 ? (
          <div className="text-center py-12">
            <div className="text-gray-600 text-lg">You haven't created any posts yet.</div>
            <div className="text-gray-500 mt-2">
              <Link to="/create" className="text-blue-600 hover:underline">
                Create your first post!
              </Link>
            </div>
          </div>
        ) : (
          posts.map((post) => (
            <BlogPostCard
              key={post._id}
              post={post}
              showActions={true}
              onEdit={setEditingPost}
              onDelete={handleDeletePost}
            />
          ))
        )}
      </div>
    </div>
  );
};

// Create Post Page Component
const CreatePostPage = () => {
  const { token } = useAuth();
  const navigate = useNavigate();

  const handleCreatePost = async (postData) => {
    try {
      const result = await api.createPost(postData, token);
      if (result.success) {
        navigate("/my-posts");
      } else {
        throw new Error(result.message || "Failed to create post");
      }
    } catch (error) {
      console.error("Error creating post:", error);
      throw error;
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <PostForm
        onSubmit={handleCreatePost}
        onCancel={() => navigate("/my-posts")}
      />
    </div>
  );
};

// Main App Component
const App = () => {
  return (
    <Router>
      <AuthProvider>
        <div className="min-h-screen bg-gray-100">
          <Header />
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route 
              path="/login" 
              element={
                <PublicRoute>
                  <LoginForm />
                </PublicRoute>
              } 
            />
            <Route 
              path="/register" 
              element={
                <PublicRoute>
                  <RegisterForm />
                </PublicRoute>
              } 
            />
            <Route
              path="/my-posts"
              element={
                <ProtectedRoute>
                  <MyPostsPage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/create"
              element={
                <ProtectedRoute>
                  <CreatePostPage />
                </ProtectedRoute>
              }
            />
            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
        </div>
      </AuthProvider>
    </Router>
  );
};

// Public Route Component (redirects to home if authenticated)
const PublicRoute = ({ children }) => {
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

export default App;