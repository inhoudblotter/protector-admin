import { createContext } from "preact";
import { IProvider } from "./types/IProvider";
import { useState } from "preact/hooks";

interface IAlert {
  message: string;
  type: "default" | "error" | "success";
}

interface IAdd {
  type: "add";
  payload: IAlert;
}

interface IClean {
  type: "clean";
}

interface IAlertContext {
  alerts: IAlert[];
  setAlerts: (v: IAlert[]) => void;
  action: IAdd | IClean | undefined;
  setAction: (v: IAdd | IClean | undefined) => void;
}

export const AlertContext = createContext<IAlertContext>({
  alerts: [],
  setAlerts: () => undefined,
  action: undefined,
  setAction: () => undefined,
});

export function AlertProvider({ children }: IProvider) {
  const [alerts, setAlerts] = useState<IAlert[]>([]);
  const [action, setAction] = useState<IAdd | IClean>();
  return (
    <AlertContext.Provider value={{ alerts, setAlerts, action, setAction }}>
      {children}
    </AlertContext.Provider>
  );
}
