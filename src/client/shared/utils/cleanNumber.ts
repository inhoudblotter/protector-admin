export function cleanNumber(str: string) {
  return Number(str.replaceAll(/[\s,]/, ""));
}
