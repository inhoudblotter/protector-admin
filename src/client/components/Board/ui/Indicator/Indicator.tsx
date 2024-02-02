import { h } from "preact";
import styles from "./Indicator.module.css";

interface IIndicator extends h.JSX.HTMLAttributes<HTMLDivElement> {
  label: string;
  value: string | number | undefined;
  unit?: "RUB";
  isLoading?: boolean;
}

export function Indicator({ label, value, unit, isLoading }: IIndicator) {
  return (
    <div class={styles.container}>
      <span class={styles.label}>{label}</span>
      {isLoading || typeof value === "undefined" ? (
        <div class={styles.loader}> </div>
      ) : (
        <span class={styles.value}>
          {`${value.toLocaleString("ru-RU")}${unit === "RUB" ? " ₽" : ""}`}
        </span>
      )}
    </div>
  );
}
