import { IOrder } from "src/client/shared/types/IOrder";

export async function addOrder(order: IOrder) {
  const res = await fetch(`${import.meta.env.VITE_API_HOST}/order`, {
    method: "POST",
    mode: "cors",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(order),
  });
  const data = (await res.json()) as { id: number };
  if (res.ok) {
    return data.id;
  }
  throw data;
}
