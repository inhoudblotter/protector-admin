import { h } from "preact";
import styles from "./BarChart.module.css";
import { cn } from "src/client/shared/utils/cn";
import {
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "preact/hooks";
import { Tabs } from "./Tabs";
import { IPeriod, isPeriod } from "../../types/IPeriod";
import { SettingsContext } from "src/client/shared/model/settingsContext";

interface IBarChart extends h.JSX.HTMLAttributes<HTMLDivElement> {
  values?: {
    daily: { hour: number; value: number }[];
    weekly?: { day: number; value: number }[];
    annual?: { month: number; value: number }[];
  };
  isLoading?: boolean;
}

const DAYS = ["Пн", "Вт", "Ср", "Чт", "Пт", "Сб", "Вс"];
const MONTHS = [
  "Янв",
  "Фев",
  "Мар",
  "Апр",
  "Май",
  "Июн",
  "Июл",
  "Авг",
  "Сен",
  "Окт",
  "Ноя",
  "Дек",
];

export function BarChart({
  values,
  isLoading,
  class: className,
  ...props
}: IBarChart) {
  const { settings, load: loadSettings, status } = useContext(SettingsContext);
  const position = useRef(0);
  const cursorPosition = useRef<null | number>(null);
  const columnsRef = useRef<HTMLDivElement>(null);
  const xaxisRef = useRef<HTMLDivElement>(null);
  const [tab, setTab] = useState<IPeriod>("daily");

  const [min, max, xaxis, yaxis] = useMemo(() => {
    let min = 0;
    let max = 0;
    let xaxis: string[] = [];
    let yaxis: (number | null)[] = [];

    if (values) {
      if (tab === "daily") {
        if (settings) {
          const dataset = values[tab];
          [
            ...new Array(
              settings.work_time.to.hours - settings.work_time.from.hours
            ),
          ].forEach((_, i) => {
            const hour = i + settings.work_time.from.hours;
            xaxis.push(hour.toString().padStart(2, "0") + ":00");
            yaxis.push(
              dataset.find((el) => el.hour + 5 === hour)?.value || null
            );
          });
        } else loadSettings();
      } else if (tab === "weekly") {
        const dataset = values[tab];
        if (dataset) {
          yaxis = DAYS.map(
            (_, i) => dataset.find((el) => el.day === i + 1)?.value || null
          );
        } else {
          yaxis = DAYS.map(() => null);
        }
        xaxis = DAYS;
      } else if (tab === "annual") {
        const dataset = values[tab];
        if (dataset) {
          yaxis = MONTHS.map(
            (_, i) => dataset.find((el) => el.month === i + 1)?.value || null
          );
        } else {
          yaxis = MONTHS.map(() => null);
        }
        xaxis = MONTHS;
      }
      const dataset = values[tab];
      if (dataset) {
        dataset.forEach((el) => {
          if (el.value < min) min = el.value;
          if (el.value > max) max = el.value;
        });
      }
    }
    return [min, max, xaxis, yaxis];
  }, [tab, values, settings]);

  const handleTouch = useCallback(
    (clientX: number) => {
      let prevCursorPosition = cursorPosition.current || clientX;
      cursorPosition.current = clientX;
      const newPosition = position.current + prevCursorPosition - clientX;
      const elements = [columnsRef.current, xaxisRef.current];
      if (!elements[0] || !elements[1]) return;
      if (
        newPosition > 0 &&
        newPosition < elements[0].scrollWidth - elements[0].clientWidth
      ) {
        elements[0].scrollTo({ left: newPosition });
        elements[1].scrollTo({ left: newPosition });
        position.current = newPosition;
      }
    },
    [cursorPosition, position, columnsRef, xaxisRef]
  );

  const handleMouseMove = useCallback(
    (e: MouseEvent) => {
      handleTouch(e.clientX);
    },
    [handleTouch]
  );

  const handleMouseUp = useCallback(() => {
    cursorPosition.current = null;
    window.removeEventListener("mousemove", handleMouseMove);
  }, [cursorPosition, handleMouseMove]);

  const handleTouchEnd = useCallback(() => {
    cursorPosition.current = null;
  }, [cursorPosition]);

  const handleResize = useCallback(() => {
    if (columnsRef.current && xaxisRef.current) {
      columnsRef.current.scrollTo({ left: 0, behavior: "smooth" });
      xaxisRef.current.scrollTo({ left: 0, behavior: "smooth" });
      position.current = 0;
    }
  }, [position, columnsRef, xaxisRef]);

  useEffect(() => {
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div class={cn(styles.container, className)} {...props}>
      {!values || !yaxis.length || isLoading || status === "loading" ? (
        <div class={styles.loader}>
          {[...new Array(3)].map((_, i) => (
            <div key={i} class={styles.loaderColumn}></div>
          ))}
        </div>
      ) : (
        <>
          <Tabs
            tabs={Object.keys(values).filter((el) => isPeriod(el)) as IPeriod[]}
            currentTab={tab}
            setTab={setTab}
          />
          <div class={styles.chart}>
            <div
              class={styles.columns}
              ref={columnsRef}
              onTouchMove={(e) => handleTouch(e.touches[0].clientX)}
              onTouchEnd={handleTouchEnd}
              onMouseDown={() => {
                window.addEventListener("mousemove", handleMouseMove);
                window.addEventListener("mouseup", handleMouseUp, {
                  once: true,
                });
              }}
            >
              {yaxis.map((el, i) => (
                <div
                  class={styles.column}
                  style={{
                    "--height": `${el ? Math.floor(el / max) * 100 : 0}%`,
                  }}
                  key={i}
                >
                  {el}
                </div>
              ))}
            </div>
            <div class={styles.yaxis}>
              <div class={styles.quantity}>{max}</div>
              <div class={styles.quantity}>{min}</div>
            </div>
            <div
              class={styles.xaxis}
              ref={xaxisRef}
              onTouchMove={(e) => handleTouch(e.touches[0].clientX)}
              onTouchEnd={handleTouchEnd}
              onMouseDown={() => {
                window.addEventListener("mousemove", handleMouseMove);
                window.addEventListener("mouseup", handleMouseUp, {
                  once: true,
                });
              }}
            >
              {xaxis.map((el, i) => (
                <div class={styles.period} key={i}>
                  {el}
                </div>
              ))}
            </div>
          </div>
        </>
      )}
    </div>
  );
}
