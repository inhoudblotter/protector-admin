import { isCarType } from "../types/ICarType";
import { IOrder } from "../types/IOrder";
import {
  isKeyOfServices,
  isServiceDefaultSettings,
  isServiceMinMaxSettings,
  isStorageSettings,
} from "../types/IServicesSettings";
import { ISettings } from "../types/ISettings";

export function calculatePrice(settings: ISettings, order: IOrder) {
  let totalPrice = 0;
  for (const service of order.services) {
    if (isKeyOfServices(service)) {
      const s = settings.services[service];
      if (isServiceDefaultSettings(s) && isCarType(order.client.carType)) {
        totalPrice +=
          s["prices"][order.client.carType][order.wheels.radius] *
          order.wheels.quantity;
      } else if (
        isServiceMinMaxSettings(s) &&
        isCarType(order.client.carType)
      ) {
        totalPrice +=
          s["prices"][order.client.carType][order.wheels.radius].min *
          order.wheels.quantity;
      } else if (isStorageSettings(s)) {
        totalPrice += s["prices"][order.wheels.radius] * order.wheels.quantity;
      }
    }
  }
  return totalPrice;
}
