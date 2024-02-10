import { h } from "preact";
import { RefObject } from "preact/compat";
import { useEffect } from "preact/hooks";
import styles from "./Items.module.css";

interface IItems extends h.JSX.HTMLAttributes<HTMLUListElement> {
  times: string[];
  setTime: (v: string) => void;
  outerRef: RefObject<HTMLUListElement>;
  onMount: () => void;
}

export function Items({ times, onMount, outerRef, setTime }: IItems) {
  useEffect(onMount, [onMount]);
  return (
    <ul class={styles.items} ref={outerRef}>
      {times.map((time) => (
        <li class={styles.item} key={time}>
          <button
            class={styles.option}
            onClick={() => setTime(time)}
            type={"button"}
          >
            {new Date(time).toLocaleString("ru-RU", {
              hour: "2-digit",
              minute: "2-digit",
            })}
          </button>
        </li>
      ))}
    </ul>
  );
}
