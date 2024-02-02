import { useRouter } from "preact-router";
import { parseQuery } from "../utils/parseQuery";

export function useSearchParams() {
  const [agrs] = useRouter();
  return parseQuery(agrs.url);
}
