import { useCallback, useContext, useState } from "preact/hooks";
import { Cross } from "src/client/shared/ui/icons/Cross";
import styles from "./TokenGenerator.module.css";
import { Button } from "src/client/shared/ui/Button";
import { AlertContext } from "src/client/shared/model/alertContext";
import { getToken } from "src/client/api/auth/getToken";
import { isError } from "src/server/types/typeGuards/isError";

export function TokenGenerator() {
  const { setAction: setAlertAction } = useContext(AlertContext);
  const [token, setToken] = useState<string | null>(null);
  const [isLoading, setLoading] = useState(false);
  const get = useCallback(() => {
    setLoading(true);
    getToken()
      .then((newToken) => setToken(newToken))
      .catch((error) => {
        if (isError(error) || error instanceof Error) {
          setAlertAction({
            type: "add",
            payload: { type: "error", message: error.message },
          });
        } else throw error;
      })
      .finally(() => setLoading(false));
  }, [setLoading]);
  const copy = useCallback(() => {
    if (token) {
      navigator.clipboard.writeText(token);
      setAlertAction({
        type: "add",
        payload: { type: "default", message: "Токен скопирован" },
      });
    }
  }, [token]);
  const clear = useCallback(() => {
    setToken(null);
  }, [setToken]);
  return (
    <>
      {token ? (
        <div class={styles.container}>
          <Button class={styles.token} onClick={copy}>
            {token}
          </Button>
          <Button class={styles.deleteBtn} onClick={clear}>
            <Cross class={styles.deleteIcon} />
          </Button>
        </div>
      ) : (
        <Button class={styles.getBtn} isLoading={isLoading} onClick={get}>
          Получить токен
        </Button>
      )}
    </>
  );
}
