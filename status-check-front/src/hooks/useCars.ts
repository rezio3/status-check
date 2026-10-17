import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { queryKeys } from "../utils/queryKeys";
import { apiFetch } from "../api/client";
import type { CarFormValues } from "../views/user/modals/AddOrEditCarModal";

export const CarStatus = {
  WaitingForParts: "waitingForParts",
  ReadyToCollect: "readyToCollect",
  InRepair: "inRepair",
  Queued: "queued",
} as const;

export type CarStatus = (typeof CarStatus)[keyof typeof CarStatus];

export type Car = {
  plateNumber: string;
  id: string;
  brand?: string;
  model?: string;
  year?: string;
  vin?: string;
  phone?: string;
  status: CarStatus;
  order: number;
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
