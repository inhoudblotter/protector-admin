export type ICarType = "passengerCar" | "suv" | "crossover";

export function isCarType(str: unknown): str is ICarType {
  if (
    typeof str !== "string" ||
    !["passengerCar", "suv", "crossover"].includes(str)
  )
    return false;
  return true;
}
