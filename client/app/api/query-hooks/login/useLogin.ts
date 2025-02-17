import { login, LoginResponse } from "@/api/api";
import { useMutation, UseMutationOptions } from "@tanstack/react-query";

export const useLogin = (
  options?: UseMutationOptions<
    LoginResponse,
    Error,
    { username: string; password: string }
  >
) => {
  return useMutation({
    mutationFn: async ({
      username,
      password,
    }: {
      username: string;
      password: string;
    }) => {
      return await login(username, password);
    },
    ...options,
  });
};
