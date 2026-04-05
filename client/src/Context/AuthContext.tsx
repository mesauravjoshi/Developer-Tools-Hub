import { createContext } from "react";

type UserModelInterface = {
  username: string;
  email: string;
  userId: string;
};

type AuthContextType = {
  user: UserModelInterface | null;
  token: string | null;
  login: (data: { user: UserModelInterface; token: string }) => void;
  logout: () => void;
  fetchUserData: () => Promise<void>;
};

export const AuthContext = createContext<AuthContextType | undefined>(undefined);
