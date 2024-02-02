import { h } from "preact";
import styles from "./Header.module.css";
import { cn } from "src/client/shared/utils/cn";
import { Arrow } from "src/client/shared/ui/icons";
import { DateToDateString } from "src/client/shared/utils/DateToDateString";

interface IHeader extends h.JSX.HTMLAttributes<HTMLDivElement> {
  type: "day" | "month";
  setType: (v: "day" | "month") => void;
  date: string;
  setDate: (v: string) => void;
}

export function Header({ type, setType, date, setDate }: IHeader) {
  const d = new Date(date);
  const prevDay = () => {
    d.setDate(d.getDate() - 1);
    setDate(DateToDateString(d));
  };

  const prevMonth = () => {
    d.setMonth(d.getMonth() - 1);
    setDate(DateToDateString(d));
  };

  const nextDay = () => {
    d.setDate(d.getDate() + 1);
    setDate(DateToDateString(d));
  };

  const nextMonth = () => {
    d.setMonth(d.getMonth() + 1);
    setDate(DateToDateString(d));
  };

  return (
    <div class={styles.container}>
      <button
        class={cn(styles.action, styles.prev)}
        onClick={type === "day" ? prevDay : prevMonth}
      >
        <Arrow class={styles.actionIcon} />
      </button>
      {type === "day" ? (
        <button class={styles.value} onClick={() => setType("month")}>
          {d.toLocaleDateString("ru-RU", {
            month: "short",
            day: "numeric",
            weekday: "short",
          })}
        </button>
      ) : (
        <span class={styles.value}>
          {d.toLocaleDateString("ru-RU", { month: "long" })}
        </span>
      )}
      <button
        class={cn(styles.action, styles.next)}
        onClick={type === "day" ? nextDay : nextMonth}
      >
        <Arrow class={styles.actionIcon} />
      </button>
    </div>
  );
}
