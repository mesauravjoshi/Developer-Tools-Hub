import { createContext, useState, useEffect } from "react";
import type { ReactNode } from "react";

type AuthContextType = {
  username: string;
  userId: string;
  email: string;
};

type AuthProviderProps = {
  children: ReactNode;
};

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [username, setUsername] = useState<string>("");
  const [userId, setUserId] = useState<string>("");
  const [email, setEmail] = useState<string>("");

  useEffect(() => {
    const getUserData = localStorage.getItem("user_data");

    if (getUserData) {
      const userData = JSON.parse(getUserData);

      setUsername(userData.username);
      setUserId(userData._id);
      setEmail(userData.email);
    }
  }, []);

  return (
    <AuthContext.Provider value={{ username, userId, email }}>
      {children}
    </AuthContext.Provider>
  );
};