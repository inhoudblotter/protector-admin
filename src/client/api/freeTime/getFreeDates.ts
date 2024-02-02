import { IDates } from "src/client/shared/types/IDates";
import { IError } from "src/client/shared/types/IError";
import { isError } from "src/client/shared/types/typeGuards/isError";

export async function getFreeDates(
  date: string,
  order: {
    services: string[];
    wheels: number;
  }
) {
  const res = await fetch(
    import.meta.env.VITE_API_HOST +
      `/free-time/month/${date}?services=${order.services.join(",")}&wheels=${
        order.wheels
      }`,
    {
      mode: "cors",
      credentials: "include",
    }
  );
  const data = (await res.json()) as IDates | IError;
  if (!isError(data)) {
    return data;
  } else throw data;
}
