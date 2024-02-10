import { RefObject } from "preact";
import { cn } from "src/client/shared/utils/cn";
import { Cross } from "src/client/shared/ui/icons/Cross";
import { useEffect } from "preact/hooks";
import styles from "./Alert.module.css";

interface IAlert {
  closeFunc: () => void;
  outerRef: RefObject<HTMLDivElement>;
  lifeTime: number;
  type: "default" | "error" | "success";
  openClass: string;
  message: string;
}

export function Alert({
  closeFunc,
  lifeTime,
  outerRef,
  openClass,
  type,
  message,
}: IAlert) {
  useEffect(() => {
    let timeout: NodeJS.Timeout | null = null;
    if (outerRef.current) {
      outerRef.current.classList.add(openClass);
      timeout = setTimeout(closeFunc, lifeTime);
    }
    return () => {
      if (timeout) clearTimeout(timeout);
    };
  }, [closeFunc, lifeTime, openClass, outerRef]);
  return (
    <div class={cn(styles.container, styles[type])} ref={outerRef}>
      <span class={styles.message}>{message}</span>
      <button
        class={styles.closeBtn}
        aria-label={"Закрыть сообщение"}
        onClick={closeFunc}
      >
        <Cross class={styles.closeBtnIcon} />
      </button>
    </div>
  );
}
