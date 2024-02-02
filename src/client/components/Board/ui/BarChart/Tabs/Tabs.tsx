import { h } from "preact";
import { StateUpdater } from "preact/hooks";
import { cn } from "src/client/shared/utils/cn";
import styles from "./Tabs.module.css";
import { IPeriod, isPeriod } from "../../../types/IPeriod";

interface ITabs extends h.JSX.HTMLAttributes<HTMLDivElement> {
  tabs: IPeriod[];
  setTab: StateUpdater<IPeriod>;
  currentTab: string;
}

const PERIODS = {
  daily: "Ч",
  weekly: "Д",
  annual: "М",
};

export function Tabs({ tabs, setTab, currentTab }: ITabs) {
  return (
    <div class={styles.container}>
      {tabs.length > 1 &&
        tabs.map((tab, i) => (
          <button
            class={cn(styles.tab, tab === currentTab && styles.active)}
            key={i}
            onClick={() => setTab(isPeriod(tab) ? tab : "daily")}
          >
            {PERIODS[tab as keyof typeof PERIODS]}
          </button>
        ))}
    </div>
  );
}
