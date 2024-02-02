import { IOrderResponse } from "src/client/shared/types/IOrderResponse";

export async function getOrders(
  params: URLSearchParams,
  isOld: boolean = false
): Promise<{ data: IOrderResponse[]; totalCount: number; offset: number }> {
  const res = await fetch(
    import.meta.env.VITE_API_HOST + `/orders${isOld ? "/old" : ""}?` + params,
    {
      mode: "cors",
      credentials: "include",
    }
  );
  const data = await res.json();
  if (res.ok) {
    return data;
  } else throw data;
}
