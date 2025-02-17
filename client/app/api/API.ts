// api.ts
import apiClient from "./apiClient";

export interface UserData {
  id: number;
  name: string;
  email: string;
  featureFlags: string[];
}

export interface LoginResponse {
  token: string;
  user: UserData;
}

export const fetchUserData = async (): Promise<UserData> => {
  const response = await apiClient.get("/auth/me");
  return response.data;
};

export const login = async (
  username: string,
  password: string
): Promise<LoginResponse> => {
  const response = await apiClient.post("/auth/login", { username, password });
  // Optionally, set token in localStorage here if needed.
  localStorage.setItem("authToken", response.data.token);
  return response.data;
};
