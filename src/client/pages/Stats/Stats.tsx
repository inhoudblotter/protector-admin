import { Board } from "src/client/components/Board";
import { isPeriod } from "src/client/components/Board/types/IPeriod";
import { Nav } from "src/client/components/Nav";
import { useSearchParams } from "src/client/shared/hooks/useSearchParams";

export function Stats() {
  const { period, date } = useSearchParams();
  return (
    <>
      <Nav />
      <Board period={isPeriod(period) ? period : "day"} date={date} />
    </>
  );
}
