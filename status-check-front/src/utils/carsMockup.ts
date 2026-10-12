import type { Car } from "../hooks/useCars";
import { CarStatus } from "./carStatus";

export type RefactoredCar = Car & {
  status: string;
  order: number | null;
  brand: string;
  model: string;
  year: number;
  ownerTel: string;
};

export const getCarListMockup = (carList: Car[]) => {
  const refactoredCars: RefactoredCar[] = carList.map((car, index) => {
    return {
      ...car,
      status: CarStatus.Queued,
      order: index + 1,
      brand: "Volkswagen",
      model: "Polo",
      year: 2008,
      ownerTel: "724863771",
    };
  });
  return refactoredCars;
};
