import { h } from "preact";
export function cn(
  ...classes: (
    | string
    | h.JSX.SignalLike<string | undefined>
    | false
    | undefined
    | null
  )[]
) {
  return classes.filter((el) => !!el).join(" ");
}
