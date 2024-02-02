import styles from "./Sorting.module.css";
import { IIcon } from "../IIcon";
import { cn } from "src/client/shared/utils/cn";

export function Sorting({
  class: className,
  direction = "desc",
  ...props
}: IIcon & { direction?: "asc" | "desc" }) {
  return (
    <svg
      className={cn(styles.icon, className, styles[direction])}
      width="25px"
      height="25px"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M13 12H21M13 8H21M13 16H21M6 7V17M6 7L3 10M6 7L9 10"
        stroke="#333"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
