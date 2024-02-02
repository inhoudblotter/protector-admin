import { ICarType } from "./ICarType";
import { isObject } from "./typeGuards/isObject";

export interface IPrice {
  [radius: number]: number;
}

export type IPrices = {
  [key in ICarType]: IPrice;
};

export function isPrice(obj: unknown): obj is IPrice {
  if (!isObject(obj)) return false;
  for (const [radius, price] of Object.entries(obj)) {
    if (isNaN(Number(radius)) || isNaN(Number(price))) return false;
  }
  return true;
}

export function isPrices(obj: unknown): obj is IPrices {
  if (!isObject(obj)) return false;
  const { passengerCar, suv } = obj as IPrices;
  if (!isPrice(passengerCar) || !isPrice(suv)) return false;
  return true;
}
