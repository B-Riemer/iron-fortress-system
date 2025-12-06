export type ClearanceLevel = "RECRUIT" | "OPERATOR" | "SHADOW";

export const CLEARANCE_LEVELS = {
  RECRUIT: 0,
  OPERATOR: 1,
  SHADOW: 2,
} as const;

