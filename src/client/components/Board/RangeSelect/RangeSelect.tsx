import { useContext, useEffect, useState } from "preact/hooks";
import styles from "./RangeSelect.module.css";
import { Field } from "./Field";
import { cn } from "src/client/shared/utils/cn";
import { route } from "preact-router";
import { h } from "preact";
import { roundDate } from "src/client/shared/utils/roundDate";
import { SettingsContext } from "src/client/shared/model/settingsContext";

export function RangeSelect({
  ...props
}: h.JSX.HTMLAttributes<HTMLDivElement>) {
  const { settings, load: loadSettings } = useContext(SettingsContext);
  const [type, setType] = useState<"day" | "range">("day");
  const [range, setRange] = useState<{ from: string; to: string }>({
    from: roundDate(new Date()).toISOString(),
    to: roundDate(new Date()).toISOString(),
  });

  useEffect(() => {
    if (!settings) {
      loadSettings();
    } else {
      const from = new Date(range.from);
      from.setHours(
        settings.work_time.from.hours,
        settings.work_time.from.minutes,
        0,
        0
      );
      const to = new Date(range.to);
      to.setHours(
        settings.work_time.to.hours,
        settings.work_time.to.minutes,
        0,
        0
      );
      const query = new URLSearchParams();
      query.set("from", from.toISOString());
      query.set("to", to.toISOString());
      route(`/stats?${query}`);
    }
  }, [settings, loadSettings, range]);
  return (
    <div class={styles.container} {...props}>
      <div class={styles.fields}>
        {type === "range" ? (
          <>
            <Field
              label="от"
              value={range.from}
              setValue={(v) => {
                setRange({ ...range, from: v.toString() });
              }}
            />
            <Field
              label="до"
              value={range.to}
              setValue={(v) => {
                setRange({ ...range, to: v.toString() });
              }}
            />
          </>
        ) : (
          <Field
            value={range.from}
            setValue={(v) => setRange({ from: v.toString(), to: v.toString() })}
          />
        )}
      </div>
      <div class={styles.types}>
        <button
          class={cn(styles.type, type === "day" && styles.active)}
          onClick={() => {
            setType("day");
            setRange({ from: range.from, to: range.from });
          }}
        >
          День
        </button>
        <button
          class={cn(styles.type, type === "range" && styles.active)}
          onClick={() => {
            const date = new Date(range.from);
            date.setDate(date.getDate() - 7);
            setRange({ to: range.from, from: date.toISOString() });
            setType("range");
          }}
        >
          Отрезок
        </button>
      </div>
    </div>
  );
}
