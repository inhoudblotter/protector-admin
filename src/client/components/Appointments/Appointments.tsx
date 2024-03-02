import { getOrdersByDate } from "src/client/api/orders/getOrdersByDate";
import styles from "./Appointments.module.css";
import { useMemo, useState, useCallback, useEffect } from "preact/hooks";
import { Header } from "./Header";
import { Calendar } from "./Calendar";
import { h } from "preact";
import { useRouter } from "preact-router";
import { DateToDateString } from "src/client/shared/utils/DateToDateString";
import { Items } from "./Items/Items";
import { parseQuery } from "src/client/shared/utils/parseQuery";
import { IOrderResponse } from "src/client/shared/types/IOrderResponse";

export function Appointments({ ...props }: h.JSX.HTMLAttributes<HTMLElement>) {
  const [params, route] = useRouter();
  const preloadDate = useMemo(() => {
    return parseQuery(params.url).date;
  }, [params.url]);
  const [date, setDate] = useState(preloadDate || DateToDateString(new Date()));
  const [type, setType] = useState<"day" | "month">("day");
  const [appointments, setAppointments] = useState<IOrderResponse[]>([]);

  const refreshItems = useCallback(() => {
    getOrdersByDate(date).then((orders) => setAppointments(orders));
  }, [date, setAppointments]);

  useEffect(() => {
    route(`/?date=${date}`, false);
    refreshItems();
  }, [date, refreshItems, route]);
  return (
    <main class={styles.container} {...props}>
      <Header type={type} setType={setType} date={date} setDate={setDate} />
      {type === "day" && (
        <Items appointments={appointments} refreshItems={refreshItems} />
      )}
      {type === "month" && (
        <Calendar
          class={styles.calendar}
          month={date}
          setDate={(v) => {
            setDate(v);
            setType("day");
          }}
        />
      )}
    </main>
  );
}
