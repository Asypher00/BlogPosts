import React, {useState, useEffect} from "react" ; 
import { AuthContext } from "../customHooks/useAuth";
export const AuthProvider = ({ children }) => {
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