export function isObject(obj: unknown): obj is Object {
  if (!obj || typeof obj !== "object") return false;
  return true;
}
