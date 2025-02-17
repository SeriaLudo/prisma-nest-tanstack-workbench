// apiClient.ts
import axios from "axios";

const apiClient = axios.create({
  baseURL: "http://localhost:3002",
});

apiClient.interceptors.request.use((config) => {
  const token = localStorage.getItem("authToken");
  if (token) {
    config.headers["Authorization"] = token;
  }
  return config;
});

export default apiClient;
