import { IPrice, IPrices, isPrice, isPrices } from "./IPrices";
import { IPricesRange, isPricesRange } from "./IPricesRange";
import { isObject } from "./typeGuards/isObject";

interface IServiceDefaultSettings {
  leadTime: number;
  maxCars: number;
  prices: IPrices;
}

interface IServiceMinMaxSettings {
  leadTime: number;
  maxCars: number;
  prices: IPricesRange;
}

interface IStorageSettings {
  maxWheels: number;
  prices: IPrice;
}

export interface IServicesSettings {
  complex: IServiceDefaultSettings;
  balancing: IServiceDefaultSettings;
  removalAndInstalation: IServiceDefaultSettings;
  dismantling: IServiceDefaultSettings;
  instalation: IServiceDefaultSettings;
  puncture: IServiceDefaultSettings;
  cut: IServiceDefaultSettings;
  addSpikes: IServiceMinMaxSettings;
  storage: IStorageSettings;
}

export function isKeyOfServices(str: unknown): str is keyof IServicesSettings {
  if (
    typeof str !== "string" ||
    ![
      "complex",
      "balancing",
      "removalAndInstalation",
      "dismantling",
      "instalation",
      "puncture",
      "cut",
      "addSpikes",
      "storage",
    ].includes(str)
  )
    return false;
  return true;
}

export function isServiceDefaultSettings(
  obj: unknown
): obj is IServiceDefaultSettings {
  if (!isObject(obj)) return false;
  const { maxCars, leadTime, prices } = obj as IServiceDefaultSettings;
  if (typeof maxCars !== "number" || typeof leadTime !== "number") return false;
  if (!isPrices(prices)) return false;
  return true;
}

export function isServiceMinMaxSettings(
  obj: unknown
): obj is IServiceMinMaxSettings {
  if (!isObject(obj)) return false;
  const { maxCars, leadTime, prices } = obj as IServiceDefaultSettings;
  if (typeof maxCars !== "number" || typeof leadTime !== "number") return false;
  if (!isPricesRange(prices)) return false;
  return true;
}

export function isStorageSettings(obj: unknown): obj is IStorageSettings {
  if (!isObject(obj)) return false;
  const { maxWheels, prices } = obj as IStorageSettings;
  if (typeof maxWheels !== "number") return false;
  if (!isPrice(prices)) return false;
  return true;
}
