import { JSXInternal } from "node_modules/preact/src/jsx";

export function onChangeFormatTime(
  e: JSXInternal.TargetedEvent<HTMLInputElement, Event>
) {
  const str = e.currentTarget.value.replaceAll(/:/, "");
  if (str.length > 3) return `${str.slice(0, 2)}:${str.slice(2)}`;
  return str;
}
