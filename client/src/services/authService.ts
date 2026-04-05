import api from "@/Utils/api";

// type UserModelInterface = {
//   username: string;
//   email: string;
//   userId: string;
// };

export const loginApi = (data: { email: string; password: string }) => {
  return api.post("auth/login", data);
};

export const signupApi = (data: {
  email: string;
  username: string;
  password: string;
}) => {
  return api.post("auth/signup", data);
};

export const logoutService = () => {
  return api.post("/logout");
};