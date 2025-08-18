import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL, // backend base URL
  withCredentials: true, // if using auth cookies/JWT
});

export default api;
