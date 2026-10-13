import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { queryKeys } from "../utils/queryKeys";
import { apiFetch } from "../api/client";
import type { CarFormValues } from "../views/user/modals/AddOrEditCarModal";

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
    mutationFn: (newCar: CarFormValues) =>
      apiFetch("/cars", {
        method: "POST",
        body: JSON.stringify(newCar),
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.userCarList });
    },
  });
};
