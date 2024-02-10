import { h } from "preact";
import { useEffect } from "preact/hooks";
import { RefObject } from "preact/compat";
import { Item } from "./Item";
import styles from "./Items.module.css";

interface IItems extends h.JSX.HTMLAttributes<HTMLDivElement> {
  items: { name: string; value: string }[];
  outerRef: RefObject<HTMLUListElement>;
  onMount: () => void;
  closeFunction: () => void;
}

export function Items({ onMount, closeFunction, items, outerRef }: IItems) {
  useEffect(onMount, [onMount]);
  return (
    <ul class={styles.container} ref={outerRef}>
      {items.map((item) => (
        <Item key={item.value} closeFunction={closeFunction} {...item} />
      ))}
    </ul>
  );
}
