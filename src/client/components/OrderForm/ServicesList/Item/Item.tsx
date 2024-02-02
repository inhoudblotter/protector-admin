import { h } from "preact";
import { ChangeEvent } from "preact/compat";
import { Check } from "src/client/shared/ui/icons/Check";
import { cn } from "src/client/shared/utils/cn";
import styles from "./Item.module.css";
interface IItem extends h.JSX.HTMLAttributes<HTMLLIElement> {
  title: string;
  value: string;
  handleSelect: (e: ChangeEvent<HTMLInputElement>) => void;
  values: string[];
  isChecked: boolean;
}

export function Item({ title, value, handleSelect, isChecked }: IItem) {
  return (
    <li class={cn(styles.container, isChecked && styles.checked)}>
      <label class={styles.wrapper}>
        <input
          class={styles.input}
          type="checkbox"
          value={value}
          onChange={handleSelect}
          checked={isChecked}
        />
        <span class={styles.label}>{title}</span>
        <Check class={styles.icon} />
      </label>
    </li>
  );
}
