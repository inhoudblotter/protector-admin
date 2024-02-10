import { h } from "preact";
import styles from "./Pie.module.css";
import { Legend } from "./Legend";
import { useMemo } from "preact/hooks";
import { getRandomColor } from "./utils/getRandomColor";
import { cn } from "src/client/shared/utils/cn";

interface IPie extends h.JSX.HTMLAttributes<HTMLDivElement> {
  values: { label: string; value: number }[] | undefined;
  isLoading?: boolean;
}

const COLORS = [
  "#fd7f6f",
  "#7eb0d5",
  "#b2e061",
  "#bd7ebe",
  "#ffb55a",
  "#ffee65",
  "#beb9db",
  "#fdcce5",
  "#8bd3c7",
];

export function Pie({ values, isLoading, class: className }: IPie) {
  const processed = useMemo(() => {
    if (!values) return [];
    const sum = values.reduce((p, c) => p + c.value, 0);
    let start = 0;
    const processed: {
      color: string;
      range: string;
      label: string;
      value: number;
    }[] = [];
    values.forEach((el, i) => {
      if (el.value) {
        const end =
          i !== values.length - 1
            ? Math.round((el.value / sum) * 100 + start)
            : 100;
        processed.push({
          color: i < COLORS.length ? COLORS[i] : getRandomColor(),
          range: `${start}% ${end}%`,
          label: el.label,
          value: el.value,
        });
        start = end;
      }
    });
    return processed;
  }, [values]);
  return (
    <div class={cn(styles.container, className)}>
      {!processed.length || isLoading ? (
        <div class={styles.loader} />
      ) : (
        <>
          <Legend values={processed} class={styles.legend} />
          <div
            class={styles.chart}
            style={{
              "--chart": `conic-gradient(${processed
                .map((el) => `${el.color} ${el.range}`)
                .join(", ")})`,
            }}
          />
        </>
      )}
    </div>
  );
}
