import { useState, useEffect } from "react";
import type { ReactNode } from "react";
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
  const [loading, setLoading] = useState(true);

  const login = (data: { user: UserModelInterface; token: string }) => {
    setUser(data.user);
    setToken(data.token);

    localStorage.setItem("AutoAPIUserData", JSON.stringify(data.user));
    localStorage.setItem("AutoAPIAuthToken", data.token);
  };

  const logout = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem("AutoAPIUserData");
    localStorage.removeItem("AutoAPIAuthToken");

    // window.location.href = "/signup";
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
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUserData();
  }, []);

  return (
    <AuthContext.Provider
      value={{ user, token, loading, login, logout, fetchUserData }}
    >
      {children}
    </AuthContext.Provider>
  );
};
