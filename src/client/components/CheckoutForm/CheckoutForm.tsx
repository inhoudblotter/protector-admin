import { h } from "preact";
import { useCallback, useContext, useEffect, useState } from "preact/hooks";
import { SettingsContext } from "src/client/shared/model/settingsContext";
import { IOrder } from "src/client/shared/types/IOrder";
import { Input } from "src/client/shared/ui/Input";
import { Loader } from "src/client/shared/ui/Loader";
import { Modal } from "src/client/shared/ui/Modal";
import styles from "./CheckoutForm.module.css";
import { Button } from "src/client/shared/ui/Button";
import { calculatePrice } from "src/client/shared/utils/calculatePrice";
import { AlertContext } from "src/client/shared/model/alertContext";
import { setPrice } from "src/client/api/order/setPrice";
import { isError } from "src/client/shared/types/typeGuards/isError";

interface ICheckoutForm extends h.JSX.HTMLAttributes<HTMLDivElement> {
  order_id: number;
  order: IOrder;
  onClose: () => void;
  onDone: () => void;
}

export function CheckoutForm({
  order_id,
  order,
  onDone,
  onClose,
}: ICheckoutForm) {
  const { setAction } = useContext(AlertContext);
  const {
    settings,
    load: loadSettings,
    status: settingsStatus,
  } = useContext(SettingsContext);
  const [value, setValue] = useState("");
  const [isLoading, setLoading] = useState(false);
  useEffect(() => {
    if (!settings) {
      loadSettings();
    } else {
      setValue(calculatePrice(settings, order).toString());
    }
  }, [settings, loadSettings, order]);
  const handleSubmit = useCallback(async () => {
    setLoading(true);
    await setPrice(order_id, Number(value))
      .then(() => {
        onClose();
        onDone();
      })
      .catch((error) => {
        if (isError(error) || error instanceof Error) {
          setAction({
            type: "add",
            payload: { type: "error", message: error.message },
          });
        } else console.error(error);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [value, order_id, setLoading, onClose, onDone, setAction]);
  return (
    <Modal onClose={onClose} contentClass={styles.container}>
      {["loading", "notLoaded"].includes(settingsStatus) ? (
        <Loader class={styles.loader} />
      ) : (
        <>
          <span class={styles.title}>Итоговая стоимость</span>
          <Input
            class={styles.input}
            value={value}
            onChange={(e) => setValue(e.currentTarget.value)}
          />
          <Button onClick={handleSubmit} isLoading={isLoading}>
            Завершить
          </Button>
        </>
      )}
    </Modal>
  );
}
