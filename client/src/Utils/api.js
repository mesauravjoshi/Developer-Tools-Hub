import axios from "axios";
const api = axios.create({
    baseURL: import.meta.env.VITE_API_BASE_URL,
    // baseURL: import.meta.env.VITE_API_BASE_URL + "/api/v1",
});
api.interceptors.request.use((config) => {
    const token = localStorage.getItem("token");
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
}, (error) => {
    return Promise.reject(error);
});
api.interceptors.response.use((response) => {
    return response;
}, (error) => {
    // Example: handle unauthorized
    if (error.response?.status === 401) {
        console.log("Unauthorized - redirect to login");
    }
    return Promise.reject(error);
});
export default api;
