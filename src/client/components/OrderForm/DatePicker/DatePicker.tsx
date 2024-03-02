import { h } from "preact";
import styles from "./DatePicker.module.css";
import { Header } from "./Header";
import { useState, useEffect } from "preact/hooks";
import { Calendar } from "./Calendar";
import { TimeList } from "./TimeList";

interface IDatePicker extends h.JSX.HTMLAttributes<HTMLDivElement> {
  services: string[];
  wheels: number;
  setValue: (time: string) => void;
  skip?: number;
}

export function DatePicker({
  services,
  wheels,
  class: className,
  setValue,
  skip,
}: IDatePicker) {
  const now = new Date();
  const [month, setMonth] = useState<string>(now.toISOString());
  const [date, setDate] = useState<string | null>(null);
  const [time, setTime] = useState<string | null>(null);
  useEffect(() => {
    if (time !== null) setValue(time);
  }, [time, setValue]);
  return (
    <div class={[styles.container, className].join(" ")}>
      <Header
        type={!date ? "month" : "day"}
        value={!date ? month : date}
        setValue={!date ? setMonth : setDate}
        cleanDate={() => setDate(null)}
      />
      {date === null ? (
        <Calendar
          month={month}
          setDate={setDate}
          services={services}
          wheels={wheels}
          skip={skip}
        />
      ) : (
        <TimeList
          date={date}
          setTime={setTime}
          services={services}
          wheels={wheels}
          skip={skip}
        />
      )}
    </div>
  );
}
