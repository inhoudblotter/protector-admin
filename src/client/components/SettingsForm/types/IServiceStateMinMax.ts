import { IPricesRange } from "src/client/shared/types/IPricesRange";

export interface IServiceStateMinMax {
  maxCars: number;
  leadTime: number;
  prices: IPricesRange;
}
