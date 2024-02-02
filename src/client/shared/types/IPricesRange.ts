import { ICarType } from "./ICarType";
import { isObject } from "./typeGuards/isObject";

export interface IPriceRange {
  [radius: number]: { min: number; max: number };
}

export type IPricesRange = {
  [key in ICarType]: IPriceRange;
};

export function isPriceRange(obj: unknown): obj is IPriceRange {
  if (!isObject(obj)) return false;
  for (const [radius, price] of Object.entries(obj)) {
    if (isNaN(Number(radius)) || isNaN(Number(price))) return false;
  }
  return true;
}

export function isPricesRange(obj: unknown): obj is IPricesRange {
  if (!isObject(obj)) return false;
  const { suv, passengerCar } = obj as IPricesRange;
  if (!isPriceRange(suv) || !isPriceRange(passengerCar)) return false;
  return true;
}
