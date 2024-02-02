import { h } from "preact";
import { cn } from "../../utils/cn";
import { Car } from "../icons/Car";
import styles from "./Loader.module.css";

interface ILoader extends h.JSX.HTMLAttributes<HTMLDivElement> {}

export function Loader({ class: className }: ILoader) {
  return (
    <div class={cn(styles.loader, className)}>
      <div class={styles.lines}>
        <span class={styles.line}></span>
        <span class={styles.line}></span>
      </div>
      <Car class={styles.car} />
    </div>
  );
}
