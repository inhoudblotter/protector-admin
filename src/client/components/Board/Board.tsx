import { h } from "preact";
import { useContext, useEffect, useState } from "preact/hooks";
import { Indicator } from "./ui/Indicator";
import { IStats } from "src/client/shared/types/IStats";
import { Pie } from "./ui/Pie";
import { BarChart } from "./ui/BarChart/BarChart";
import styles from "./Board.module.css";
import { RangeSelect } from "./RangeSelect";
import { getStats } from "src/client/api/stats/getStats";
import { isError } from "src/client/shared/types/typeGuards/isError";
import { AlertContext } from "src/client/shared/model/alertContext";
import { useRouter } from "preact-router";
import { parseQuery } from "src/client/shared/utils/parseQuery";
import { SettingsContext } from "src/client/shared/model/settingsContext";
import { SERVICES } from "src/client/shared/config/services";
import { isKeyOfServices } from "src/client/shared/types/IServicesSettings";

interface IBoard extends h.JSX.HTMLAttributes<HTMLElement> {}

export function Board({ ...props }: IBoard) {
  const { setAction: setAlertAction } = useContext(AlertContext);
  const { settings, load: loadSettings } = useContext(SettingsContext);
  const [stats, setStats] = useState<Partial<IStats>>({});
  const [routerArgs] = useRouter();
  useEffect(() => {
    let { from, to } = parseQuery(routerArgs.url);
    if (!from || !to) {
      if (settings) {
        const date = new Date();
        date.setHours(
          settings.work_time.from.hours,
          settings.work_time.from.minutes,
          0,
          0
        );
        from = date.toISOString();
        date.setHours(
          settings.work_time.to.hours,
          settings.work_time.to.minutes,
          0,
          0
        );
        to = date.toISOString();
      } else return loadSettings();
    }
    getStats(from, to)
      .then((data) => {
        setStats(data);
      })
      .catch((error) => {
        setStats({});
        if (isError(error) || error instanceof Error) {
          setAlertAction({
            type: "add",
            payload: { type: "error", message: error.message },
          });
        } else throw error;
      });
  }, [routerArgs.url, settings]);
  return (
    <main class={styles.container} {...props}>
      <RangeSelect />
      <div class={styles.group}>
        <Indicator label="Кол. заказов" value={stats.numberOfCompletedOrders} />
        <Indicator label="Касса" value={stats.profit} unit="RUB" />
      </div>
      <div class={styles.group}>
        <Pie
          values={stats.groupDistribution?.map((el) => ({
            label: isKeyOfServices(el.label)
              ? SERVICES[el.label].name
              : "Услуга",
            value: el.value,
          }))}
        />
        <BarChart values={stats.workLoad} />
      </div>
    </main>
  );
}
