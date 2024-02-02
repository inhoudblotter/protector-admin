export type ITabs = "day" | "monthly" | "annual";

export function isTab(str: string): str is ITabs {
  if (!["day", "monthly", "annual"].includes(str)) return false;
  return true;
}
