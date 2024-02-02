import { h } from "preact";
import styles from "./Day.module.css";
import { cn } from "src/client/shared/utils/cn";

interface IDay extends h.JSX.HTMLAttributes<HTMLLIElement> {
  date: number;
  iso: string;
  free: boolean;
  disabled: false;
  setDate: (v: string) => void;
}

export function Day({ date, iso, free, setDate, disabled }: IDay) {
  return (
    <li class={styles.container}>
      <button
        class={cn(
          styles.btn,
          !free && styles.busy,
          disabled && styles.disabled
        )}
        onClick={() => setDate(iso)}
        disabled={disabled || !free}
        type={"button"}
      >
        {date}
      </button>
    </li>
  );
}
