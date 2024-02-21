import { h } from "preact";
import { useState, useEffect, useContext } from "preact/hooks";
import { DatePicker } from "./DatePicker";
import { ServicesList } from "./ServicesList";
import { Button } from "src/client/shared/ui/Button";
import { CarType } from "./CarType";
import { Wheels } from "./Wheels";
import { ClientFields } from "./ClientFields";
import styles from "./OrderForm.module.css";
import { ChosenDate } from "./ChosenDate";
import { addOrder } from "src/client/api/order/addOrder";
import { TargetedEvent } from "preact/compat";
import { isError } from "src/client/shared/types/typeGuards/isError";
import { updateOrder } from "src/client/api/order/updateOrder";
import { formatDateToISO } from "src/client/shared/utils/formatDateToISO";
import { IOrderResponse } from "src/client/shared/types/IOrderResponse";
import { IOrder } from "src/client/shared/types/IOrder";
import { AlertContext } from "src/client/shared/model/alertContext";
import { route } from "preact-router";

interface IOrderForm extends h.JSX.HTMLAttributes<HTMLFormElement> {
  type: "new" | "update";
  preloadState?: IOrderResponse;
}
// SERVICES_WITHOUT_DATE = ["storage"];
// SERVICES_WITHIOUT_CAR_TYPE = ["storage"];

export function OrderForm({ preloadState, type }: IOrderForm) {
  console.log(preloadState);
  const { setAction: setAlertAction } = useContext(AlertContext);
  const [needDate, setNeedDate] = useState(false);
  const [needCarType, setNeedCarType] = useState(false);
  const [services, setServices] = useState(preloadState?.services || []);
  const [carType, setCarType] = useState<null | string>(
    preloadState?.client.carType || null
  );
  const [quantity, setQuantity] = useState(
    preloadState?.wheels.quantity.toString() || "4"
  );
  const [radius, setRadius] = useState(
    preloadState?.wheels.radius.toString() || "14"
  );
  const [date, setDate] = useState<null | string>(
    preloadState && preloadState.date
      ? formatDateToISO(new Date(preloadState.date))
      : null
  );
  const [name, setName] = useState(preloadState?.client.name || "");
  const [phone, setPhone] = useState(preloadState?.client.phone || "");
  const [carNumber, setCarNumber] = useState(
    preloadState?.client.carNumber || ""
  );

  const [isLoading, setLoading] = useState(false);
  useEffect(() => {
    let needDate = false;
    let needCarType = false;
    for (let service of services) {
      if (service !== "storage") {
        needDate = true;
        needCarType = true;
        break;
      }
    }
    setNeedCarType(needCarType);
    setNeedDate(needDate);
  }, [services, setNeedCarType, setNeedDate]);

  function onSubmit(e: TargetedEvent<HTMLFormElement, Event>) {
    e.preventDefault();

    if (!services.length) {
      return setAlertAction({
        type: "add",
        payload: {
          type: "error",
          message: "Выберите хотя бы одну услугу",
        },
      });
    }
    if (needCarType && !carType) {
      return setAlertAction({
        type: "add",
        payload: { type: "error", message: "Выберите тип автомобиля" },
      });
    }
    const q = Number(quantity);
    if (isNaN(q) || q < 1 || q > 6) {
      return setAlertAction({
        type: "add",
        payload: {
          type: "error",
          message: "Количество колёс должно быть от 1 до 6",
        },
      });
    }
    const r = Number(radius);
    if (isNaN(r) || r < 12 || r > 24) {
      return setAlertAction({
        type: "add",
        payload: {
          type: "error",
          message: "Радиус колес должен быть от 12 до 24",
        },
      });
    }
    if (!name || name.length > 102) {
      return setAlertAction({
        type: "add",
        payload: {
          type: "error",
          message:
            "Имя не должно быть пустым, а его длинна не должна превышать 102 символа",
        },
      });
    }
    if (!phone || phone.length > 15) {
      return setAlertAction({
        type: "add",
        payload: {
          type: "error",
          message:
            "Номер обязательно заполнять. Проверте правильно ли вы его ввели.",
        },
      });
    }
    if (carNumber.length > 6) {
      return setAlertAction({
        type: "add",
        payload: {
          type: "error",
          message: "Номер автомобиля не должен превышать 6 символов",
        },
      });
    }

    const order: IOrder & { id?: number } = {
      client: {
        name,
        phone,
        carNumber,
        carType,
      },
      wheels: {
        quantity: q,
        radius: r,
      },
      date: date || undefined,
      services,
    };

    let res: Promise<void>;

    if (type === "update" && preloadState) {
      order.client.id = preloadState.client.id;
      order.client.carId = preloadState.client.carId;
      order.id = preloadState.id;
      res = updateOrder(order as IOrderResponse).then(() => {
        setAlertAction({
          type: "add",
          payload: {
            type: "default",
            message: `Заявка обновлена`,
          },
        });
      });
    } else {
      res = addOrder(order).then((id) => {
        setAlertAction({
          type: "add",
          payload: {
            type: "default",
            message: `Заявка создана`,
          },
        });
        route(`/orders/${id}`);
      });
      res
        .catch((error) => {
          if (isError(error)) {
            if (error.code === 4060) {
              preloadState = undefined;
              type = "new";
            }
            setDate(null);
            setAlertAction({
              type: "add",
              payload: { type: "error", message: error.message },
            });
          } else throw error;
        })
        .finally(() => {
          setLoading(false);
        });
    }
  }

  return (
    <form class={styles.container} onSubmit={onSubmit}>
      <ServicesList value={services} setValue={setServices} />
      {needCarType && <CarType carType={carType} setValue={setCarType} />}
      <Wheels
        quantity={quantity}
        setQuantity={setQuantity}
        radius={radius}
        setRadius={setRadius}
      />
      <ClientFields
        name={name}
        setName={setName}
        phone={phone}
        setPhone={setPhone}
        carNumber={carNumber}
        setCarNumber={setCarNumber}
      />
      {needDate && !date && quantity && services.length && (
        <DatePicker
          services={services}
          wheels={Number(quantity)}
          class={styles.datePicker}
          setValue={setDate}
        />
      )}
      {needDate && date && (
        <ChosenDate date={date} cleanDate={() => setDate(null)} />
      )}
      <Button isLoading={isLoading}>
        {`${type === "new" ? "Создать" : "Обновить"} заявку`}
      </Button>
    </form>
  );
}
