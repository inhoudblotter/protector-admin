import { IOrder } from "./IOrder";
declare global {
  interface Window {
    __order__?: IOrder;
  }
}
