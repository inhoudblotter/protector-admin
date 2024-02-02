import { h } from "preact";
import styles from "./Header.module.css";
import { useCallback, useMemo } from "preact/hooks";
import { Arrow } from "src/client/shared/ui/icons";

interface IHeader extends h.JSX.HTMLAttributes<HTMLDivElement> {
  type: "month" | "day";
  value: string;
  setValue: (v: string) => void;
  cleanDate: () => void;
}

export function Header({
  type,
  value,
  setValue,
  cleanDate,
  ...props
}: IHeader) {
  const isToday = useMemo(() => {
    const today = new Date();
    const currentDate = new Date(value);
    return (
      today.getMonth() === currentDate.getMonth() &&
      today.getDate() === currentDate.getDate()
    );
  }, [value]);
  const prevMonth = useCallback(() => {
    if (isToday) return;
    const currentDate = new Date(value);
    currentDate.setMonth(currentDate.getMonth() - 1);
    setValue(currentDate.toISOString());
  }, [value, setValue, isToday]);
  const prevDay = useCallback(() => {
    if (isToday) return;
    const currentDate = new Date(value);
    currentDate.setDate(currentDate.getDate() - 1);
    setValue(currentDate.toISOString());
  }, [value, setValue]);
  const nextMonth = useCallback(() => {
    const currentDate = new Date(value);
    currentDate.setMonth(currentDate.getMonth() + 1);
    setValue(currentDate.toISOString());
  }, [value, setValue]);
  const nextDay = useCallback(() => {
    const currentDate = new Date(value);
    currentDate.setDate(currentDate.getDate() + 1);
    setValue(currentDate.toISOString());
  }, [value, setValue]);
  const month = useMemo(() => {
    const m = new Date(value).toLocaleDateString("ru-RU", { month: "long" });
    return m.charAt(0).toUpperCase() + m.slice(1);
  }, [value]);
  const date = useMemo(() => {
    const d = new Date(value).toLocaleDateString("ru-RU", {
      day: "numeric",
      month: "short",
    });
    return d;
  }, [value]);

  return (
    <div class={styles.container} {...props}>
      <button
        class={[styles.action, styles.prev].join(" ")}
        onClick={type === "month" ? prevMonth : prevDay}
        disabled={isToday}
        type={"button"}
      >
        <Arrow class={[styles.icon, styles.iconPrev].join(" ")} />
      </button>
      <button
        class={styles.date}
        disabled={type === "month"}
        onClick={cleanDate}
        type={"button"}
      >
        {type === "month" ? month : date}
      </button>
      <button
        class={[styles.action, styles.next].join(" ")}
        onClick={type === "month" ? nextMonth : nextDay}
        type={"button"}
      >
        <Arrow class={[styles.icon, styles.iconPrev].join(" ")} />
      </button>
    </div>
  );
}
