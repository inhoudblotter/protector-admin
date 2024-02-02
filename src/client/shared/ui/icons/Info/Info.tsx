import { cn } from "src/client/shared/utils/cn";
import styles from "./Info.module.css";
import { h } from "preact";

interface IInfo extends h.JSX.HTMLAttributes<HTMLDivElement> {}

export function Info({ class: className, ...props }: IInfo) {
  return (
    <div class={cn(styles.icon, className)} {...props}>
      i
    </div>
  );
}
