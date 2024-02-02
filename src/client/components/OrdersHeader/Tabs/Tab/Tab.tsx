import { h } from "preact";
import { Link } from "preact-router";
import styles from "./Tab.module.css";
import { cn } from "src/client/shared/utils/cn";
interface ITab extends h.JSX.HTMLAttributes<HTMLDivElement> {
  name: string;
  isActive: boolean;
}

export function Tab({ name, href, isActive }: ITab) {
  return (
    <Link class={cn(styles.tab, isActive && styles.active)} href={href}>
      {name}
    </Link>
  );
}
