import { h } from "preact";
import { SERVICES } from "src/client/shared/config/services";
import styles from "./ServicesPicker.module.css";
import { Item } from "./Item";

interface IServicesPicker extends h.JSX.HTMLAttributes<HTMLUListElement> {
  selectedItems: string[];
  setSelectedItems: (v: string[]) => void;
}

export function ServicesPicker({
  selectedItems,
  setSelectedItems,
}: IServicesPicker) {
  return (
    <ul class={styles.container}>
      {Object.entries(SERVICES).map(([k, v]) => (
        <Item
          name={v.name}
          value={k}
          selectedItems={selectedItems}
          setSelectedItems={setSelectedItems}
        />
      ))}
    </ul>
  );
}
