export const CarStatus = {
  WaitingForParts: "waitingForParts",
  ReadyToCollect: "readyToCollect",
  InRepair: "inRepair",
  Review: "review",
  Queued: "queued",
} as const;

export type CarStatus = (typeof CarStatus)[keyof typeof CarStatus];

export const isCarStatus = (value: unknown): value is CarStatus => {
  return (
    typeof value === "string" &&
    Object.values(CarStatus).includes(value as CarStatus)
  );
};
