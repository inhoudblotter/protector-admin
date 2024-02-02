import { h } from "preact";
import styles from "./Wheels.module.css";
import { Field } from "../ui/Field/Field";

interface IWheels extends h.JSX.HTMLAttributes<HTMLFieldSetElement> {
  quantity: string;
  radius: string;
  setQuantity: (v: string) => void;
  setRadius: (v: string) => void;
}

export function Wheels({ quantity, setQuantity, radius, setRadius }: IWheels) {
  return (
    <fieldset class={styles.container}>
      <Field
        label="Кол. колёс"
        type={"number"}
        value={quantity}
        min={1}
        max={6}
        onChange={(e) => setQuantity(e.currentTarget.value)}
      />
      <Field
        label="Радиус"
        type={"number"}
        value={radius}
        onChange={(e) => setRadius(e.currentTarget.value)}
        min={12}
        max={24}
      />
    </fieldset>
  );
}
