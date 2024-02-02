import { h } from "preact";
import styles from "./Dates.module.css";
import { StateUpdater, useMemo } from "preact/hooks";
import { cn } from "src/client/shared/utils/cn";

interface IDates extends h.JSX.HTMLAttributes<HTMLUListElement> {
  month: string;
  setDate: StateUpdater<string>;
}

export function Dates({ month, setDate }: IDates) {
  const dates = useMemo(() => {
    const dates = [];
    const temp = new Date(month);
    temp.setHours(0, 0, 0, 0);
    temp.setDate(1);
    temp.setMonth(temp.getMonth() + 1);
    temp.setDate(0);
    const currentMonth = temp.getMonth();
    const breakEnd = temp.getTime();
    const cursor = new Date(month);
    cursor.setHours(0, 0, 0, 0);
    cursor.setDate(1);
    const firstDay = cursor.getDay();
    if (firstDay === 0) {
      cursor.setDate(-6);
    } else if (firstDay !== 1) {
      cursor.setDate(2 - firstDay);
    }
    while (cursor.getTime() <= breakEnd || cursor.getDay() !== 1) {
      dates.push({
        day: cursor.getDate(),
        date: cursor.toISOString(),
        another: cursor.getMonth() !== currentMonth,
      });
      cursor.setDate(cursor.getDate() + 1);
    }
    return dates;
  }, [month]);
  return (
    <ul class={styles.container}>
      {dates.map((el) => (
        <li class={cn(styles.item, el.another && styles.another)} key={el.date}>
          <button class={styles.btn} onClick={() => setDate(el.date)}>
            {el.day}
          </button>
        </li>
      ))}
    </ul>
  );
}
