import { h } from "preact";
import { Item } from "./Item";
import styles from "./Items.module.css";
import { IOrderResponse } from "src/client/shared/types/IOrderResponse";

interface IItems extends h.JSX.HTMLAttributes<HTMLUListElement> {
  appointments: IOrderResponse[];
  refreshItems: () => void;
}

export function Items({ appointments, refreshItems }: IItems) {
  return (
    <ul class={styles.items}>
      {appointments.map((appointment) => (
        <Item
          key={appointment.id}
          appointment={appointment}
          class={styles.item}
          refreshItems={refreshItems}
        />
      ))}
    </ul>
  );
}
