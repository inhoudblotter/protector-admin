import { IOrder } from "src/client/shared/types/IOrder";
import { isError } from "src/client/shared/types/typeGuards/isError";
import { IError } from "src/server/types/IError";
export async function getOrder(id: number) {
  const res = await fetch(import.meta.env.VITE_API_HOST + `/order/${id}`, {
    mode: "cors",
    credentials: "include",
  });
  const data = (await res.json()) as IOrder | IError;
  if (!isError(data)) {
    return data;
  } else throw data;
}
