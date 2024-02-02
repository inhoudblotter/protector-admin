import { cn } from "src/client/shared/utils/cn";
import { IIcon } from "../IIcon";
import styles from "./Check.module.css";

export function Check({ class: className, ...props }: IIcon) {
  return (
    <svg
      class={cn(styles.icon, className)}
      width="24px"
      height="24px"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M4 12.6111L8.92308 17.5L20 6.5"
        stroke="#333"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </svg>
  );
}
