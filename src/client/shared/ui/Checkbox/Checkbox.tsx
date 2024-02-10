import { h } from "preact";
import styles from "./Checkbox.module.css";

interface ICheckbox extends h.JSX.HTMLAttributes<HTMLInputElement> {
  title: string;
  lighten?: boolean;
}

export function Checkbox({
  title,
  class: className,
  lighten,
  ...props
}: ICheckbox) {
  return (
    <label
      class={[
        styles.container,
        className,
        lighten ? styles.lighten : undefined,
      ].join(" ")}
    >
      <input class={styles.input} type="checkbox" {...props} />
      <div class={styles.icon} />
      <h3 class={styles.label}>{title}</h3>
    </label>
  );
}
