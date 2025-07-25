import React, { useContext, createContext} from "react" ; 
export const AuthContext = createContext();
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used inside a provider");
  }
  return context;
};
