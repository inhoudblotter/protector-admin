import { h } from "preact";
import { useEffect, useRef } from "preact/hooks";
import { Close } from "../icons";
import styles from "./Toast.module.css";

interface IToast extends h.JSX.HTMLAttributes<HTMLDivElement> {
  type?: "default" | "error";
  message: string;
  lifeTime?: number;
  onClose: () => void;
}

export function Toast({
  message,
  class: className,
  onClose,
  type = "default",
  lifeTime = 3000,
}: IToast) {
  const ref = useRef<HTMLDivElement>(null);
  function close() {
    const el = ref.current;
    if (el) {
      el.classList.remove(styles.show);
      el.addEventListener("transitionend", onClose, { once: true });
    }
  }
  useEffect(() => {
    const el = ref.current;
    if (el) {
      el.classList.add(styles.show);
      setTimeout(close, lifeTime);
    }
  }, [ref, close, lifeTime]);
  return (
    <div
      class={[styles.container, className, styles[type]].join(" ")}
      ref={ref}
    >
      <span class={styles.message}>{message}</span>
      <button class={styles.closeBtn} type={"button"}>
        <Close class={styles.closeIcon} />
      </button>
    </div>
  );
}
