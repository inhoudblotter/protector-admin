import { ISettings } from "src/client/shared/types/ISettings";
import { IError } from "src/server/types/IError";

export async function updateSettings(settings: ISettings) {
  const res = await fetch(import.meta.env.VITE_API_HOST + "/settings", {
    method: "PATCH",
    mode: "cors",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(settings),
  });
  if (res.status !== 201) {
    const data = (await res.json()) as IError;
    throw data;
  }
}
