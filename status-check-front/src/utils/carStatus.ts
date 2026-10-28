export const CarStatus = {
  WaitingForParts: "waitingForParts",
  ReadyToCollect: "readyToCollect",
  InRepair: "inRepair",
  Review: "review",
  Queued: "queued",
} as const;

export type CarStatus = (typeof CarStatus)[keyof typeof CarStatus];

export const carStatusLabels: Record<CarStatus, string> = {
  [CarStatus.Queued]: "W kolejce",
  [CarStatus.Review]: "Przegląd",
  [CarStatus.InRepair]: "W naprawie",
  [CarStatus.WaitingForParts]: "Czekamy na części",
  [CarStatus.ReadyToCollect]: "Gotowe do odbioru",
};

export const getCarStatusLabel = (status: CarStatus): string => {
  return carStatusLabels[status];
};
