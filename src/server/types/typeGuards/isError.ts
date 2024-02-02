import { IError } from "../IError";

export function isError(error: unknown): error is IError {
  if (error && typeof error === "object" && !Array.isArray(error)) {
    const { code, message } = error as IError;
    if (typeof code === "number" && typeof message === "string") return true;
  }
  return false;
}
