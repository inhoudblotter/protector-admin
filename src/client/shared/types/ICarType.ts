export type ICarType = "passengerCar" | "suv";

export function isCarType(str: unknown): str is ICarType {
  if (typeof str !== "string" || !["passengerCar", "suv"].includes(str))
    return false;
  return true;
}
