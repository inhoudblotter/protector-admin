import { h } from "preact";
import styles from "./Day.module.css";

interface IDay extends h.JSX.HTMLAttributes<HTMLLIElement> {
  date: number;
  iso: string;
  setDate: (v: string) => void;
}

export function Day({ date, iso, setDate }: IDay) {
  return (
    <li class={styles.container}>
      <button class={styles.btn} onClick={() => setDate(iso)} type={"button"}>
        {date}
      </button>
    </li>
  );
}
