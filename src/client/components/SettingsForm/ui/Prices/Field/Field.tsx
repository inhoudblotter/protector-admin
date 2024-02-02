import { h } from "preact";
import styles from "./Field.module.css";
import { Input } from "src/client/shared/ui/Input";

interface IField extends h.JSX.HTMLAttributes<HTMLLIElement> {
  radius: number;
  price: string;
  setPrice: (v: string, r: number) => void;
}

export function Field({ radius, price, setPrice }: IField) {
  return (
    <li class={styles.container}>
      <span class={styles.label}>{`R${radius}`}</span>
      <Input
        class={styles.input}
        value={price}
        onChange={(e) => {
          setPrice(e.currentTarget.value, radius);
        }}
      />
    </li>
  );
}
