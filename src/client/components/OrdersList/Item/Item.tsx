import { h } from "preact";
import styles from "./Item.module.css";
import { cn } from "src/client/shared/utils/cn";
import { Link } from "preact-router";
import { cleanPhone } from "src/client/shared/utils/cleanPhone";
import { SERVICES } from "src/client/shared/config/services";
import { Done } from "src/client/shared/ui/icons/Done";
import { Trash } from "src/client/shared/ui/icons/Trash";
import { Edit } from "src/client/shared/ui/icons/Edit";
import { IOrderResponse } from "src/client/shared/types/IOrderResponse";
import { useOrderActions } from "src/client/shared/hooks/useOrderActions";
import { useState } from "preact/hooks";
import { CheckoutForm } from "../../CheckoutForm/CheckoutForm";
interface IItem extends h.JSX.HTMLAttributes<HTMLLIElement> {
  order: IOrderResponse;
  refreshItems: () => void;
}

export function Item({ order, class: className, refreshItems }: IItem) {
  const { handleCheck, handleDelete, isDone, isDeleted, ref } =
    useOrderActions<HTMLLIElement>(order.id, refreshItems);
  const [isCheckoutOpen, setCheckoutOpen] = useState(false);
  return (
    <>
      <li
        class={cn(
          styles.container,
          className,
          isDone && styles.done,
          isDeleted && styles.deleted
        )}
        ref={ref}
      >
        <Link class={styles.link} href={`/orders/${order.id}`} />
        <span class={styles.id}>{order.id}</span>
        <div class={styles.client}>
          <span class={styles.name}>{order.client.name}</span>
          <a
            class={styles.phone}
            href={`tel:${cleanPhone(order.client.phone)}`}
          >
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
        <div class={styles.actions}>
          <button
            class={cn(styles.action)}
            onClick={() => setCheckoutOpen(true)}
          >
            <Done class={styles.actionIcon} />
          </button>
          <button class={cn(styles.action)} onClick={handleDelete}>
            <Trash class={styles.actionIcon} />
          </button>
          <Link class={cn(styles.action)} href={`/orders/${order.id}`}>
            <Edit class={styles.actionIcon} />
          </Link>
        </div>
      </li>
      {isCheckoutOpen && (
        <CheckoutForm
          order_id={order.id}
          order={order}
          onDone={handleCheck}
          onClose={() => setCheckoutOpen(false)}
        />
      )}
    </>
  );
}
