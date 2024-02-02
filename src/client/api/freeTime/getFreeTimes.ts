import { IError } from "src/client/shared/types/IError";
import { ITimes } from "src/client/shared/types/ITimess";
import { isError } from "src/client/shared/types/typeGuards/isError";

export async function getFreeTimes(
  date: string,
  order: {
    services: string[];
    wheels: number;
  }
) {
  const res = await fetch(
    import.meta.env.VITE_API_HOST +
      `/free-time/day/${date}?services=${order.services.join(",")}&wheels=${
        order.wheels
      }`,
    {
      mode: "cors",
      credentials: "include",
    }
  );
  const data = (await res.json()) as ITimes | IError;
  if (!isError(data)) {
    return data;
  } else throw data;
}
