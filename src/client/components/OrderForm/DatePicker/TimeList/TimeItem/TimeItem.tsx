import { h } from "preact";
import { useDropdown } from "src/client/shared/hooks/useDropdown";
import styles from "./TimeItem.module.css";
import { Items } from "./Items";
import { useMemo } from "preact/hooks";

interface ITimeItem extends h.JSX.HTMLAttributes<HTMLLIElement> {
  times: string[];
  setTime: (v: string) => void;
}

export function TimeItem({ times, setTime }: ITimeItem) {
  const { contentRef, triggerRef, dropdownRef, isOpen, onContentMount } =
    useDropdown<HTMLLIElement, HTMLButtonElement, HTMLUListElement>(
      styles.open
    );
  const label = useMemo(() => {
    return new Date(times[0]).toLocaleString("ru-RU", {
      hour: "2-digit",
      minute: "2-digit",
    });
  }, [times]);
  return (
    <li class={styles.container} ref={dropdownRef}>
      <button class={styles.trigger} ref={triggerRef} type={"button"}>
        {label}
      </button>
      {isOpen && (
        <Items
          times={times}
          setTime={setTime}
          onMount={onContentMount}
          outerRef={contentRef}
        />
      )}
    </li>
  );
}
