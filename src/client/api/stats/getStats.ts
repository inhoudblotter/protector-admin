import { IError } from "src/client/shared/types/IError";
import { IStats } from "src/client/shared/types/IStats";
import { isError } from "src/client/shared/types/typeGuards/isError";

export async function getStats(from: string, to: string) {
  const res = await fetch(
    import.meta.env.VITE_API_HOST + `/orders/stats?from=${from}&to=${to}`,
    {
      mode: "cors",
      credentials: "include",
    }
  );
  const data = (await res.json()) as IError | IStats;
  if (!isError(data)) {
    return data;
  } else throw data;
}
