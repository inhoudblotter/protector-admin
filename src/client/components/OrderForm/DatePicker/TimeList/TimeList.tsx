import { h } from "preact";
import { TimeItem } from "./TimeItem";
import styles from "./TimeList.module.css";
import { useContext, useEffect, useState } from "preact/hooks";
import { Loader } from "src/client/shared/ui/Loader";
import { AlertContext } from "src/client/shared/model/alertContext";
import { getFreeTimes } from "src/client/api/freeTime/getFreeTimes";
import { isError } from "src/client/shared/types/typeGuards/isError";

interface ITimeList extends h.JSX.HTMLAttributes<HTMLUListElement> {
  date: string;
  services: string[];
  wheels: number;
  setTime: (v: string) => void;
}

export function TimeList({ date, setTime, services, wheels }: ITimeList) {
  const { setAction: setAlertAction } = useContext(AlertContext);
  const [freeTime, setFreeTime] = useState<string[][] | null>(null);
  useEffect(() => {
    getFreeTimes(date, { services, wheels })
      .then((times) => setFreeTime(times))
      .catch((error) => {
        if (error instanceof Error || isError(error)) {
          setAlertAction({
            type: "add",
            payload: { type: "error", message: error.message },
          });
        } else throw error;
      });
  }, [setFreeTime, services, wheels, setAlertAction]);
  return (
    <ul class={styles.container}>
      {freeTime === null ? (
        <Loader class={styles.loader} />
      ) : (
        freeTime.map((times) => (
          <TimeItem key={times[0]} times={times} setTime={setTime} />
        ))
      )}
    </ul>
  );
}
