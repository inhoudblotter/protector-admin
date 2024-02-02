import { h } from "preact";
import styles from "./FieldMinMax.module.css";
import { Input } from "src/client/shared/ui/Input";

interface IFieldMinMax extends h.JSX.HTMLAttributes<HTMLLIElement> {
  radius: number;
  prices: { min: number; max: number };
  setPrices: (v: { min: number; max: number }, r: number) => void;
}

export function FieldMinMax({ radius, prices, setPrices }: IFieldMinMax) {
  return (
    <li class={styles.container}>
      <span class={styles.label}>{`R${radius}`}</span>
      <Input
        class={styles.input}
        value={prices.min}
        onChange={(e) => {
          setPrices({ ...prices, min: Number(e.currentTarget.value) }, radius);
        }}
        placeholder={"от"}
      />
      <Input
        class={styles.input}
        value={prices.max}
        onChange={(e) => {
          setPrices({ ...prices, max: Number(e.currentTarget.value) }, radius);
        }}
        placeholder={"до"}
      />
    </li>
  );
}
