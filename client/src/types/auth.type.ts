export type UserModelInterface = {
  username: string;
  email: string;
  userId: string;
};

export type AuthContextType = {
  user: UserModelInterface | null;
  token: string | null;
  loading: boolean;
  login: (data: { user: UserModelInterface; token: string }) => void;
  logout: () => void;
  fetchUserData: () => Promise<void>;
};