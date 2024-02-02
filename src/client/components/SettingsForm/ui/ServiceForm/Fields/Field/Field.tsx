import { h } from "preact";
import { Input } from "src/client/shared/ui/Input";
import styles from "./Field.module.css";
import { cn } from "src/client/shared/utils/cn";

interface IFiled extends h.JSX.HTMLAttributes<HTMLInputElement> {
  label: string;
}

export function Field({ label, class: className, ...props }: IFiled) {
  return (
    <label class={cn(styles.container, className)}>
      <span class={styles.label}>{label}</span>
      <Input class={styles.input} {...props} />
    </label>
  );
}
