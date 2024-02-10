import { Sorting } from "./Sorting";
import { Filters } from "./Filters";
import styles from "./OrdersHeader.module.css";
import { Tabs } from "./Tabs";

export function OrdersHeader() {
  return (
    <div class={styles.container}>
      <Tabs class={styles.tabs} />
      <Filters />
      <Sorting
        items={[
          { name: "По дате создания", value: "orderCreated" },
          { name: "По дате записи", value: "orderDate" },
        ]}
      />
    </div>
  );
}
