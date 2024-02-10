import { h } from "preact";
import { useCallback, ChangeEvent } from "preact/compat";
import styles from "./CarType.module.css";

export interface ICarType extends h.JSX.HTMLAttributes<HTMLDivElement> {
  carType: string | null;
  setValue: (v: string) => void;
}

export function CarType({ class: className, carType, setValue }: ICarType) {
  const onChange = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      if (e.currentTarget.checked) setValue(e.currentTarget.value);
    },
    [setValue]
  );
  return (
    <div class={[styles.container, className].join(" ")}>
      <label class={styles.radio}>
        <input
          class={styles.input}
          type="radio"
          name="car-type"
          value={"passengerCar"}
          checked={carType === "passengerCar"}
          onChange={onChange}
        />
        <span class={styles.label}>Легковой</span>
      </label>
      <label class={styles.radio}>
        <input
          class={styles.input}
          type="radio"
          name="car-type"
          value={"suv"}
          checked={carType === "suv"}
          onChange={onChange}
        />
        <span class={styles.label}>Кроссовер / Внедорожник</span>
      </label>
    </div>
  );
}
