import { h } from "preact";
import styles from "./ServicesList.module.css";
import { SERVICES } from "src/client/shared/config/services";
import { Item } from "./Item";
import { ChangeEvent, useCallback } from "preact/compat";

interface IServicesList extends h.JSX.HTMLAttributes<HTMLUListElement> {
  value: string[];
  setValue: (v: string[]) => void;
}

export function ServicesList({ value, setValue }: IServicesList) {
  const handleSelect = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      if (e.currentTarget.checked) {
        if (!value.includes(e.currentTarget.value))
          setValue([...value, e.currentTarget.value]);
      } else {
        setValue([...value].filter((el) => el !== e.currentTarget.value));
      }
    },
    [value]
  );
  return (
    <ul class={styles.container}>
      {Object.entries(SERVICES).map((v, i) => (
        <Item
          key={i}
          title={v[1].name}
          value={v[0]}
          handleSelect={handleSelect}
          isChecked={!!value.find((el) => el === v[0])}
          values={value}
        />
      ))}
    </ul>
  );
}
