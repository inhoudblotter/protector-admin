import { h } from "preact";
import { useRouter } from "preact-router";
import { useState, useMemo } from "preact/hooks";
import { parseQuery } from "src/client/shared/utils/parseQuery";
import { Sorting } from "src/client/shared/ui/icons/Sorting";
import { cn } from "src/client/shared/utils/cn";
import styles from "./Item.module.css";

interface IItem extends h.JSX.HTMLAttributes<HTMLLIElement> {
  name: string;
  value: string;
  closeFunction: () => void;
}

export function Item({ name, value, closeFunction }: IItem) {
  const [args, route] = useRouter();
  const params = useMemo(() => parseQuery(args.url), [args.url]);
  const [isActive, setActive] = useState(params.sortBy === value);
  const [direction, setDirection] = useState<"asc" | "desc">(
    params.sortBy === value && params.sortDirection
      ? (params.sortDirection as "asc" | "desc")
      : "desc"
  );
  function handleClick() {
    let d = direction;
    if (isActive) {
      d = direction === "asc" ? "desc" : "asc";
      setDirection(d);
    }
    const query = new URLSearchParams();
    Object.entries(params).forEach(([k, v]) => {
      if (k !== "sortBy" && k !== "sortDirection") query.set(k, v);
    });
    query.set("sortBy", value);
    query.set("sortDirection", d);
    setActive(true);
    route(`${args.path}?${query}`);
    closeFunction();
  }
  return (
    <li class={cn(styles.container, isActive && styles.active)}>
      <button onClick={handleClick} class={styles.btn}>
        <span class={styles.label}>{name}</span>
        <Sorting class={styles.icon} direction={direction} />
      </button>
    </li>
  );
}
