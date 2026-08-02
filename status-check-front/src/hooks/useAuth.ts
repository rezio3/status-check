import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { apiFetch } from "../api/client";

interface AuthCredentials {
  email: string;
  password: string;
  name?: string;
}

export const useRegisterMutation = () => {
  return useMutation({
    mutationFn: (data: AuthCredentials) => {
      return apiFetch("/auth/register", {
        method: "POST",
        body: JSON.stringify(data),
      });
    },
  });
};

export const useLoginMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: AuthCredentials) =>
      apiFetch("/auth/login", {
        method: "POST",
        body: JSON.stringify(data),
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["authUser"] });
    },
  });
};

export const useAuthUser = () => {
  return useQuery({
    queryKey: ["authUser"],
    queryFn: () => apiFetch<{ authenticated: boolean; user?: any }>("/auth/me"),
    retry: false,
    staleTime: 1000 * 60 * 5,
  });
};

export const useLogoutMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: () =>
      apiFetch("/auth/logout", {
        method: "POST",
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["authUser"] });
    },
  });
};
