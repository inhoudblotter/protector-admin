import { cn } from "src/client/shared/utils/cn";
import { IIcon } from "../IIcon";
import styles from "./FIlters.module.css";

export function Filters({ class: className, ...props }: IIcon) {
  return (
    <svg
      className={cn(styles.icon, className)}
      width="25px"
      height="25px"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M18 2H6C4.34315 2 3 3.34315 3 5V6.54417C3 7.43969 3.40007 8.28839 4.09085 8.85829L7.36369 11.5584C8.05448 12.1283 8.45455 12.977 8.45455 13.8725V20.124C8.45455 21.7487 10.2893 22.6955 11.6135 21.754L14.7044 19.5563C15.232 19.1812 15.5455 18.5738 15.5455 17.9263V13.8725C15.5455 12.977 15.9455 12.1283 16.6363 11.5584L19.9091 8.85829C20.5999 8.28839 21 7.43969 21 6.54417V5C21 3.34315 19.6569 2 18 2Z"
        stroke="#333"
        strokeWidth="2"
      />
    </svg>
  );
}
