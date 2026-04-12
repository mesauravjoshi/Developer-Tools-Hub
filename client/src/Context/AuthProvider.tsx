import { createContext, useState, useEffect } from "react";
import type { ReactNode } from "react";
import { logoutService } from "@/services/authService";
import { AuthContext } from "@/Context/AuthContext";

type AuthProviderProps = {
  children: ReactNode;
};

type UserModelInterface = {
  username: string;
  email: string;
  userId: string;
};

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [user, setUser] = useState<UserModelInterface | null>(null);
  const [token, setToken] = useState<string | null>(null);

  const login = (data: { user: UserModelInterface; token: string }) => {
    setUser(data.user);
    setToken(data.token);

    localStorage.setItem("AutoAPIUserData",JSON.stringify(data.user));
    localStorage.setItem("AutoAPIAuthToken",data.token);
  };

  const logout = () => {
    logoutService();
    setUser(null);
    setToken(null);

    window.location.href = "/signup";
  };

  const fetchUserData = async () => {
    const authUser = localStorage.getItem("AutoAPIUserData");
    const tclAuthToken = localStorage.getItem("AutoAPIAuthToken");

    try {
      if (authUser && tclAuthToken) {
        setUser(JSON.parse(authUser));
        setToken(tclAuthToken);
      }
    } catch (error) {
      console.error("Error parsing authUser:", error);
      logout();
    }
  };

  useEffect(() => {
    fetchUserData();
  }, []);

  return (
    <AuthContext.Provider value={{ user, token, login, logout, fetchUserData }}>
      {children}
    </AuthContext.Provider>
  );
};