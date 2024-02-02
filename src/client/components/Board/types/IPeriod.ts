export type IPeriod = "daily" | "weekly" | "annual";

export function isPeriod(str: unknown): str is IPeriod {
  if (typeof str !== "string" || !["daily", "weekly", "annual"].includes(str))
    return false;
  return true;
}
