export function createContext(state: { [key: string]: any }) {
  if (!Object.keys(state).length) return "";
  let result = "<script>";
  for (const [k, v] of Object.entries(state)) {
    result += `window.__${k}__=${JSON.stringify(v)};`;
  }
  result += "</script>";
  return result;
}
