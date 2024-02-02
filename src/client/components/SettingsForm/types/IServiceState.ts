import { IPrices } from "src/client/shared/types/IPrices";

export interface IServiceState {
  maxCars: number;
  leadTime: number;
  prices: IPrices;
}
