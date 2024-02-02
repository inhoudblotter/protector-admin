import { h } from "preact";
import { SERVICES } from "src/client/shared/config/services";
import { cleanPhone } from "src/client/shared/utils/cleanPhone";
import { cn } from "src/client/shared/utils/cn";
import { Link } from "preact-router/match";
import { Done } from "src/client/shared/ui/icons/Done";
import { Trash } from "src/client/shared/ui/icons/Trash";
import { Edit } from "src/client/shared/ui/icons/Edit";
import { IOrderResponse } from "src/client/shared/types/IOrderResponse";
import styles from "./Item.module.css";
import { useOrderActions } from "src/client/shared/hooks/useOrderActions";
import { useState } from "preact/hooks";
import { CheckoutForm } from "src/client/components/CheckoutForm/CheckoutForm";

interface IItem extends h.JSX.HTMLAttributes<HTMLLIElement> {
  appointment: IOrderResponse;
  refreshItems: () => void;
}

export function Item({ appointment, class: className, refreshItems }: IItem) {
  const { handleCheck, handleDelete, isDeleted, isDone, ref } =
    useOrderActions<HTMLLIElement>(appointment.id, refreshItems);
  const [isCheckoutOpen, setCheckoutOpen] = useState(false);
  return (
    <>
      <li
        class={cn(
          styles.container,
          className,
          isDeleted && styles.deleted,
          isDone && styles.done
        )}
        ref={ref}
      >
        <Link class={styles.link} href={"/orders/" + appointment.id}></Link>
        {appointment.date && (
          <span class={styles.date}>
            {new Date(appointment.date).toLocaleTimeString("ru-RU", {
              hour: "2-digit",
              minute: "2-digit",
            })}
          </span>
        )}
        <div class={styles.client}>
          <span class={styles.name}>{appointment.client.name}</span>
          <a
            class={styles.phone}
            href={`tel:${cleanPhone(appointment.client.phone)}`}
          >
            {appointment.client.phone}
          </a>
        </div>
        <ul class={styles.services}>
          {appointment.services.map((s) => (
            <li class={styles.service}>
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
          <Link class={cn(styles.action)} href={`/orders/${appointment.id}`}>
            <Edit class={styles.actionIcon} />
          </Link>
        </div>
      </li>
      {isCheckoutOpen && (
        <CheckoutForm
          order_id={appointment.id}
          order={appointment}
          onDone={handleCheck}
          onClose={() => setCheckoutOpen(false)}
        />
      )}
    </>
  );
}
