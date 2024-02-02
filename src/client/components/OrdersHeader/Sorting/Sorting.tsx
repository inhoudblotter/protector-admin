import { h } from "preact";
import { useDropdown } from "src/client/shared/hooks/useDropdown";
import { Sorting as Icon } from "src/client/shared/ui/icons/Sorting";
import styles from "./Sorting.module.css";
import { Items } from "./Items";
import { useSearchParams } from "src/client/shared/hooks/useSearchParams";

interface ISorting extends h.JSX.HTMLAttributes<HTMLDivElement> {
  items: { name: string; value: string }[];
}

export function Sorting({ items }: ISorting) {
  const { contentRef, close, dropdownRef, triggerRef, isOpen, onContentMount } =
    useDropdown<HTMLDivElement, HTMLButtonElement, HTMLUListElement>(
      styles.open
    );
  const params = useSearchParams();
  return (
    <div class={styles.container} ref={dropdownRef}>
      <button class={styles.btn} ref={triggerRef}>
        <Icon
          class={styles.icon}
          direction={
            params.sortDirection === "asc" || params.sortDirection === "desc"
              ? params.sortDirection
              : "desc"
          }
        />
      </button>
      {isOpen && (
        <Items
          items={items}
          outerRef={contentRef}
          onMount={onContentMount}
          closeFunction={close}
        />
      )}
    </div>
  );
}
