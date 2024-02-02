import { ISettings } from "src/client/shared/types/ISettings";
import { isError } from "src/client/shared/types/typeGuards/isError";
import { IError } from "src/server/types/IError";

export async function getSettings() {
  const res = await fetch(import.meta.env.VITE_API_HOST + "/settings", {
    mode: "cors",
    credentials: "include",
  });
  const data = (await res.json()) as IError | ISettings;
  if (!isError(data)) {
    return data;
  } else throw data;
}
