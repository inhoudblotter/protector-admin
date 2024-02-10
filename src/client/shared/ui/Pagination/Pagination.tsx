import { h, RefObject } from "preact";
import { useCallback, useMemo } from "preact/hooks";
import styles from "./Pagination.module.css";
import { cn } from "../../utils/cn";
import { useRouter } from "preact-router";
import { parseQuery } from "../../utils/parseQuery";

interface IPagination extends h.JSX.HTMLAttributes<HTMLDivElement> {
  totalCount: number;
  currentPage: number;
  limit: number;
  itemsRef: RefObject<HTMLElement>;
  pad?: number;
}

export function Pagination({
  class: className,
  totalCount,
  limit,
  currentPage,
  itemsRef,
  pad = 3,
}: IPagination) {
  const [routerArgs, route] = useRouter();
  const params = parseQuery(routerArgs.url);
  const path = routerArgs.path;

  const totalPages = Math.ceil(totalCount / limit);
  const btns = useMemo(() => {
    const btns = [];
    let start = currentPage - pad;
    if (currentPage + pad > totalPages - 1)
      start -= currentPage + pad + 1 - totalPages;
    if (start < 1) start = 1;
    let end = currentPage + 1 + pad;
    if (currentPage - pad <= 0) end += Math.abs(currentPage - 1 - pad);
    if (end > totalPages) end = totalPages;
    for (let i = start; i <= end; ++i) btns.push(i);
    return btns;
  }, [totalPages, currentPage, pad]);

  const setPage = useCallback(
    (page: number) => {
      const query = new URLSearchParams();
      Object.entries(params).forEach(([k, v]) => query.set(k, v));
      const _offset = limit * (page - 1);
      query.set("offset", _offset.toString());
      route(`${path}?${query}`);
      if (itemsRef.current) {
        itemsRef.current.scrollIntoView({
          inline: "start",
          behavior: "smooth",
        });
      }
    },
    [itemsRef, limit, params, path, route]
  );

  return (
    <div class={cn(styles.container, className)}>
      {btns.map((i) => (
        <button
          class={cn(styles.btn, i === currentPage && styles.active)}
          key={i}
          onClick={() => setPage(i)}
        >
          {i}
        </button>
      ))}
    </div>
  );
}
