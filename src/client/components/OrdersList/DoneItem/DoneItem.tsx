import { h } from "preact";
import { SERVICES } from "src/client/shared/config/services";
import { cn } from "src/client/shared/utils/cn";
import { IOrderResponse } from "src/client/shared/types/IOrderResponse";
import { cleanPhone } from "src/client/shared/utils/cleanPhone";
import styles from "./DoneItem.module.css";

interface IDoneItem extends h.JSX.HTMLAttributes<HTMLLIElement> {
  order: IOrderResponse;
}

export function DoneItem({ class: className, order }: IDoneItem) {
  return (
    <li class={cn(styles.container, className)}>
      <span class={styles.id}>{order.id}</span>
      <div class={styles.client}>
        <span class={styles.name}>{order.client.name}</span>
        <a class={styles.phone} href={`tel:${cleanPhone(order.client.phone)}`}>
          {order.client.phone}
        </a>
      </div>
      <ul class={styles.services}>
        {order.services.map((s) => (
          <li key={s} class={styles.service}>
            {SERVICES[s as keyof typeof SERVICES].name}
          </li>
        ))}
      </ul>
    </li>
  );
}
