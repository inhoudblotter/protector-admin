export function cleanPhone(phone: string) {
  return phone.replaceAll(/[\s()]+/g, "");
}
