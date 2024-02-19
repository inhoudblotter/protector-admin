import { IOrderResponse } from "./IOrderResponse";
declare global {
  interface Window {
    __order__?: IOrderResponse;
  }
}
