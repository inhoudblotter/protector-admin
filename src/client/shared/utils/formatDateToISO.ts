import { formatTime } from "./formatTime";

export function formatDateToISO(date: Date) {
  return `${date.getFullYear()}-${formatTime(date.getMonth() + 1)}-${formatTime(
    date.getDate()
  )} ${formatTime(date.getHours())}:${formatTime(
    date.getMinutes()
  )}:${formatTime(date.getSeconds())}+5`;
}
