import { h } from "preact";
import { useDropdown } from "src/client/shared/hooks/useDropdown";
import styles from "./StorageForm.module.css";
import { Arrow } from "src/client/shared/ui/icons";
import { Fields } from "./Fields";
import { IStorageState } from "../types/IStorageState";

interface IStorageForm extends h.JSX.HTMLAttributes<HTMLDivElement> {
  state: IStorageState;
  setState: (v: IStorageState) => void;
}

export function StorageForm({ state, setState }: IStorageForm) {
  const { dropdownRef, triggerRef, contentRef, isOpen, onContentMount } =
    useDropdown<HTMLDivElement, HTMLButtonElement, HTMLDivElement>(styles.open);
  return (
    <div class={styles.dropdown} ref={dropdownRef}>
      <button class={styles.trigger} ref={triggerRef} type={"button"}>
        <span class={styles.title}>Хранение</span>
        <Arrow class={styles.dropdownIcon} />
      </button>
      {isOpen && (
        <Fields
          class={styles.fields}
          state={state}
          setState={setState}
          outerRef={contentRef}
          onMount={onContentMount}
        />
      )}
    </div>
  );
}
