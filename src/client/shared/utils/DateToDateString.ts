import { formatTime } from "./formatTime";

export function DateToDateString(date: Date) {
  return `${date.getFullYear()}-${formatTime(date.getMonth() + 1)}-${formatTime(
    date.getDate()
  )}`;
}
