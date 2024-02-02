import { h } from "preact";
import { Loader } from "../Loader";
import { cn } from "../../utils/cn";
import styles from "./Button.module.css";

interface IButton extends h.JSX.HTMLAttributes<HTMLButtonElement> {
  isLoading?: boolean;
}

export function Button({
  class: className,
  children,
  isLoading,
  disabled,
  ...props
}: IButton) {
  return (
    <button
      class={cn(styles.btn, className, isLoading && styles.loading)}
      disabled={disabled || isLoading}
      {...props}
    >
      {children}
      {isLoading && <Loader class={styles.loader} />}
    </button>
  );
}
