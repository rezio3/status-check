import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { queryKeys } from "../utils/queryKeys";
import { apiFetch } from "../api/client";

export type Car = {
  id: string;
  plateNumber: string;
  vin: string;
  ownerName: string;
  createdAt: string;
};

export const useUserCars = (enabled: boolean) => {
  return useQuery<Car[]>({
    queryKey: queryKeys.userCarList,
    queryFn: () => apiFetch<Car[]>("/cars/my-cars"),
    enabled,
  });
};

export const useAddCar = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (newPlate: string) =>
      apiFetch("/cars", {
        method: "POST",
        body: JSON.stringify({ plateNumber: newPlate }),
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.userCarList });
    },
  });
};
