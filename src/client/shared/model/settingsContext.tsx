import { createContext } from "preact";
import { IProvider } from "./types/IProvider";
import { useCallback, useContext, useState } from "preact/hooks";
import { ISettings } from "../types/ISettings";
import { getSettings } from "src/client/api/settings/getSettings";
import { isError } from "../types/typeGuards/isError";
import { updateSettings } from "src/client/api/settings/updateSettings";
import { AlertContext } from "./alertContext";

type IStatus = "loading" | "updating" | "notLoaded" | "loaded" | "updated";

interface ISettingsContext {
  settings: ISettings | undefined;
  status: IStatus;
  load: () => void;
  update: (s: ISettings) => void;
}

export const SettingsContext = createContext<ISettingsContext>({
  settings: undefined,
  status: "notLoaded",
  load: () => {},
  update: () => {},
});

export function SettingsProvider({ children }: IProvider) {
  const [settings, setSettings] = useState<ISettings>();
  const [status, setStatus] = useState<IStatus>("notLoaded");
  const { setAction } = useContext(AlertContext);

  const load = useCallback(() => {
    setStatus("loading");
    getSettings()
      .then((data) => {
        setSettings(data);
        setStatus("loaded");
      })
      .catch((error) => {
        if (isError(error) || error instanceof Error) {
          setAction({
            type: "add",
            payload: { type: "error", message: error.message },
          });
        } else {
          setStatus("notLoaded");
          throw error;
        }
      });
  }, [setSettings, setAction]);

  const update = useCallback(
    (newValues: ISettings) => {
      const s = status;
      setStatus("updating");
      updateSettings(newValues)
        .then(() => {
          setSettings(newValues);
          setAction({
            type: "add",
            payload: { type: "default", message: "Настройки обновлены" },
          });
          setStatus("loaded");
        })
        .catch((error) => {
          if (isError(error) || error instanceof Error) {
            setAction({
              type: "add",
              payload: { type: "error", message: error.message },
            });
          }
          setStatus(s);
          throw error;
        });
    },
    [status, setAction, setStatus, setSettings]
  );
  return (
    <SettingsContext.Provider value={{ settings, status, load, update }}>
      {children}
    </SettingsContext.Provider>
  );
}
