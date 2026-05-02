import axios from "axios";
// import { useNavigate } from "react-router-dom";
// const navigate = useNavigate(); // This returns a function

const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  // baseURL: import.meta.env.VITE_API_BASE_URL + "/api/v1",
});

// Request Interceptor
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("AutoAPIAuthToken");

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => {
    if (error.response?.status === 401) {
      window.location.href = "/login";
      console.log("Unauthorized - redirect to login");
    }
    return Promise.reject(error);
  }
);

// Response Interceptor
api.interceptors.response.use(
  (response) => {
    // console.log(response);

    return response;
  },
  (error) => {
    // Example: handle unauthorized
    if (error.response?.status === 401) {
      window.location.href = "/login";
      console.log("Unauthorized - redirect to login");
    }

    return Promise.reject(error);
  }
);

export default api;