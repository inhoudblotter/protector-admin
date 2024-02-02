import { h } from "preact";
import styles from "./Fieldset.module.css";

interface IFieldset extends h.JSX.HTMLAttributes<HTMLDivElement> {
  title: string;
}

export function Fieldset({ title, children }: IFieldset) {
  return (
    <div class={styles.container}>
      <span class={styles.label}>{title}</span>
      {children}
    </div>
  );
}
