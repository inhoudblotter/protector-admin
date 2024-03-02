import { IOrder } from "src/client/shared/types/IOrder";
import { IError } from "src/client/shared/types/IError";
import { isError } from "src/client/shared/types/typeGuards/isError";

export async function updateOrder(order: IOrder & { id: number }) {
  const res = await fetch(
    `${import.meta.env.VITE_API_HOST}/order/${order.id}`,
    {
      method: "PATCH",
      mode: "cors",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(order),
    }
  );
  const data = (await res.json()) as { id: number } | IError;
  if (res.ok && !isError(data)) return data;
  throw data;
}
