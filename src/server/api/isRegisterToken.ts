import "dotenv/config";
import { IError } from "../types/IError";

export async function isRegisterToken(token: string) {
  const res = await fetch(
    `${process.env.VITE_API_HOST}/auth/register/${token}`,
    {
      mode: "cors",
    }
  );
  if (!res.ok) {
    const data = (await res.json()) as IError;
    throw data;
  }
  return true;
}
