import { IError } from "src/client/shared/types/IError";
import { isError } from "src/client/shared/types/typeGuards/isError";

export async function deleteOrder(id: number) {
  const res = await fetch(import.meta.env.VITE_API_HOST + `/order/${id}`, {
    method: "DELETE",
    mode: "cors",
    credentials: "include",
  });
  const data = (await res.json()) as { id: number } | IError;
  if (!isError(data) && data.id === id) {
    return true;
  } else throw data;
}
