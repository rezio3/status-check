export const CarStatus = {
  WaitingForParts: "waitingForParts",
  ReadyToCollect: "readyToCollect",
  InRepair: "inRepair",
  Queued: "queued",
} as const;

export type CarStatus = (typeof CarStatus)[keyof typeof CarStatus];
