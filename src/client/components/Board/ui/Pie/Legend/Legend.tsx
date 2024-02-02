import { h } from "preact";
import styles from "./Legend.module.css";
import { cn } from "src/client/shared/utils/cn";
import { Info } from "src/client/shared/ui/icons/Info";
import { useDropdown } from "src/client/shared/hooks/useDropdown";
import { Items } from "./Items";

interface ILegend extends h.JSX.HTMLAttributes<HTMLDivElement> {
  values: { color: string; label: string; value: number }[];
}

export function Legend({ class: className, values, ...props }: ILegend) {
  const { dropdownRef, triggerRef, contentRef, onContentMount, isOpen } =
    useDropdown<HTMLDivElement, HTMLButtonElement, HTMLUListElement>(
      styles.open
    );
  return (
    <div class={cn(styles.container, className)} {...props} ref={dropdownRef}>
      <button
        class={styles.trigger}
        aria-label={"Открыть описание"}
        ref={triggerRef}
      >
        <Info tabIndex={0} />
      </button>
      {isOpen && (
        <Items
          values={values}
          onMount={onContentMount}
          outerRef={contentRef}
          class={styles.content}
        />
      )}
    </div>
  );
}
