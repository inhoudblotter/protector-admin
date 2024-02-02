import { h } from "preact";
import { useState } from "preact/hooks";
import styles from "./Item.module.css";
import { cn } from "src/client/shared/utils/cn";
import { Check } from "src/client/shared/ui/icons/Check";

interface IItem extends h.JSX.HTMLAttributes<HTMLLIElement> {
  name: string;
  value: string;
  selectedItems: string[];
  setSelectedItems: (v: string[]) => void;
}

export function Item({ name, value, selectedItems, setSelectedItems }: IItem) {
  const [isActive, setActive] = useState(
    selectedItems.includes(value) ? true : false
  );
  function handleClick() {
    if (!isActive) {
      setSelectedItems([...selectedItems, value]);
      setActive(true);
    } else {
      setSelectedItems([...selectedItems.filter((el) => el !== value)]);
      setActive(false);
    }
  }
  return (
    <li class={cn(styles.container, isActive && styles.active)}>
      <button class={styles.btn} onClick={handleClick}>
        <span class={styles.label}>{name}</span>
        <Check class={styles.icon} />
      </button>
    </li>
  );
}
