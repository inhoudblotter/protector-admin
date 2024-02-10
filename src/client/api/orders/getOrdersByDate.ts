import { IOrderResponse } from "src/client/shared/types/IOrderResponse";

export async function getOrdersByDate(date: string): Promise<IOrderResponse[]> {
  const res = await fetch(
    `${import.meta.env.VITE_API_HOST}/orders?date=${date}`,
    {
      mode: "cors",
      credentials: "include",
    }
  );
  const data = await res.json();
  if (res.ok) {
    return data.data;
  }
  throw data;
}
