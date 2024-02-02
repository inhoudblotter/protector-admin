import { AlertProvider } from "./alertContext";
import { SettingsProvider } from "./settingsContext";
import { IProvider } from "./types/IProvider";

export function GlobalProvider({ children }: IProvider) {
  return (
    <AlertProvider>
      <SettingsProvider>{children}</SettingsProvider>
    </AlertProvider>
  );
}
