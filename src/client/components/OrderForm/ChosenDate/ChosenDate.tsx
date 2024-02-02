import { h } from "preact";
import { Button } from "src/client/shared/ui/Button";

interface IChosenDate extends h.JSX.HTMLAttributes<HTMLDivElement> {
  date: string;
  cleanDate: () => void;
}

export function ChosenDate({ date, cleanDate }: IChosenDate) {
  return (
    <Button onClick={cleanDate}>
      {new Date(date).toLocaleDateString("ru-RU", {
        minute: "2-digit",
        hour: "2-digit",
        weekday: "short",
        day: "2-digit",
        month: "short",
      })}
    </Button>
  );
}
