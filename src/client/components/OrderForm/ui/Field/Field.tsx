import { h } from "preact";
import { cn } from "src/client/shared/utils/cn";
import { useId } from "preact/hooks";
import { Input } from "src/client/shared/ui/Input";
import styles from "./Field.module.css";
interface IField extends h.JSX.HTMLAttributes<HTMLInputElement> {
  label: string;
}

export function Field({ label, class: className, ...props }: IField) {
  const id = useId();
  return (
    <div class={cn(styles.container, className)}>
      <label class={styles.label} htmlFor={id}>
        {label}
      </label>
      <Input class={styles.input} {...props} id={id} />
    </div>
  );
}
