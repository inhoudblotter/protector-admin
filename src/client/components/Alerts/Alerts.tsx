import { h } from "preact";
import { useCallback, useContext, useEffect, useRef } from "preact/hooks";
import { AlertContext } from "src/client/shared/model/alertContext";
import { Alert } from "./Alert";
import styles from "./Alerts.module.css";
interface IAlerts extends h.JSX.HTMLAttributes<HTMLDivElement> {
  lifeTime?: number;
}

export function Alerts({ lifeTime = 3000 }: IAlerts) {
  const { alerts, action, setAlerts, setAction } = useContext(AlertContext);
  const alertRef = useRef<HTMLDivElement>(null);
  const closeAlert = useCallback(
    (onClose?: () => void) => {
      const el = alertRef.current;
      if (el) {
        el.classList.remove(styles.open);
        el.addEventListener(
          "transitionend",
          () => {
            setAlerts([...alerts.filter((_, i) => i !== 0)]);
            if (onClose) onClose();
          },
          { once: true }
        );
      }
    },
    [alertRef, setAlerts, alerts]
  );

  useEffect(() => {
    if (action) {
      if (action.type === "add") {
        if (alerts.length) {
          closeAlert(() =>
            setAlerts([...alerts.filter((_, i) => i !== 0), action.payload])
          );
        } else setAlerts([action.payload]);
      } else if (action.type === "clean") {
        closeAlert(() => setAlerts([]));
      }
      setAction(undefined);
    }
  }, [action, alerts, setAlerts, closeAlert]);
  return (
    <div class={styles.container}>
      {!!alerts.length && (
        <Alert
          closeFunc={closeAlert}
          lifeTime={lifeTime}
          outerRef={alertRef}
          openClass={styles.open}
          {...alerts[0]}
        />
      )}
    </div>
  );
}
