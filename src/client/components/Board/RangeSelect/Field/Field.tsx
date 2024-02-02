import { cn } from "src/client/shared/utils/cn";
import styles from "./Field.module.css";
import { h } from "preact";
import { StateUpdater, useCallback, useState } from "preact/hooks";
import { DatePicker } from "./DatePicker";

interface IField extends h.JSX.HTMLAttributes<HTMLDivElement> {
  label?: string;
  value: string;
  setValue: StateUpdater<string>;
}

export function Field({ value, label, setValue }: IField) {
  const [isOpen, setOpen] = useState(false);
  const handleClick = useCallback(() => {
    setOpen(true);
  }, [setOpen]);
  return (
    <div class={cn(styles.container)}>
      {label && <span class={styles.label}>{label}</span>}
      <button
        class={styles.value}
        onClick={handleClick}
        aria-label={"Выбрать дату"}
      >
        {new Date(value).toLocaleDateString("ru-RU")}
      </button>
      {isOpen && (
        <DatePicker
          date={value}
          setDate={setValue}
          onClose={() => setOpen(false)}
        />
      )}
    </div>
  );
}
