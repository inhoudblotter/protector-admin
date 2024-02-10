import { Arrow } from "src/client/shared/ui/icons";
import styles from "./Header.module.css";
import { StateUpdater, useCallback, useMemo } from "preact/hooks";
import { h } from "preact";

interface IHeader extends h.JSX.HTMLAttributes<HTMLDivElement> {
  month: string;
  setMonth: StateUpdater<string>;
}

export function Header({ month, setMonth }: IHeader) {
  const value = useMemo(() => {
    return new Date(month).toLocaleDateString("ru-RU", {
      month: "short",
      year: "numeric",
    });
  }, [month]);
  const handlePrev = useCallback(() => {
    const date = new Date(month);
    date.setMonth(date.getMonth() - 1);
    setMonth(date.toISOString());
  }, [month, setMonth]);
  const handleNext = useCallback(() => {
    const date = new Date(month);
    date.setMonth(date.getMonth() + 1);
    setMonth(date.toISOString());
  }, [month, setMonth]);
  return (
    <div class={styles.container}>
      <button class={styles.prevBtn} onClick={handlePrev}>
        <Arrow class={styles.prevIcon} />
      </button>
      <span class={styles.value}>{value}</span>
      <button class={styles.nextBtn} onClick={handleNext}>
        <Arrow class={styles.nextIcon} />
      </button>
    </div>
  );
}
