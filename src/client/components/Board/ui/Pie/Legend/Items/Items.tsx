import { RefObject, h } from "preact";
import styles from "./Items.module.css";
import { cn } from "src/client/shared/utils/cn";
import { useEffect } from "preact/hooks";

interface IItems extends h.JSX.HTMLAttributes<HTMLUListElement> {
  outerRef: RefObject<HTMLUListElement>;
  values: { label: string; value: number; color: string }[];
  onMount: () => void;
}

export function Items({ outerRef, values, onMount, class: className }: IItems) {
  useEffect(onMount, [onMount]);
  return (
    <ul class={cn(styles.container, className)} ref={outerRef}>
      {values.map((el, i) => (
        <li class={styles.item} key={i}>
          <span class={styles.color} style={{ "--color": el.color }} />
          <span class={styles.label}>{el.label}</span>
          <span class={styles.value}>{el.value}</span>
        </li>
      ))}
    </ul>
  );
}
