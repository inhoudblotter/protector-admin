import { h } from "preact";
import { useModal } from "../../hooks/useModal";
import styles from "./Modal.module.css";
import { Close } from "../icons";
import { useEffect } from "preact/hooks";
import { cn } from "../../utils/cn";

export interface IModal extends h.JSX.HTMLAttributes<HTMLDivElement> {
  onClose: () => void;
  contentClass?: string;
  setClose?: boolean;
}

export function Modal({
  onClose,
  children,
  setClose,
  class: className,
  contentClass,
}: IModal) {
  const { containerRef, backgroundRef, close } = useModal<
    HTMLDivElement,
    HTMLDivElement
  >({ openStyle: styles.open, onClose });

  useEffect(() => {
    if (setClose) close();
  }, [setClose, close]);

  return (
    <div class={styles.background} ref={backgroundRef}>
      <div class={[styles.container, className].join(" ")} ref={containerRef}>
        <button
          class={styles.closeBtn}
          aria-label={"Закрыть"}
          onClick={close}
          type={"button"}
        >
          <Close class={styles.closeIcon} />
        </button>
        <div class={cn(styles.content, contentClass)}>{children}</div>
      </div>
    </div>
  );
}
