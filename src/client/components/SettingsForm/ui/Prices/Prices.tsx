import { h } from "preact";
import styles from "./Prices.module.css";
import { IPrice } from "src/client/shared/types/IPrices";
import { RADEUS } from "src/client/shared/config/radeus";
import { Field } from "./Field";
import { cleanNumber } from "src/client/shared/utils/cleanNumber";
import { IPriceRange } from "src/client/shared/types/IPricesRange";
import { FieldMinMax } from "./FieldMinMax";
import { cn } from "src/client/shared/utils/cn";

interface IPrices extends h.JSX.HTMLAttributes<HTMLUListElement> {
  type: "default" | "min-max";
  title?: string;
}

interface IPricesDefault extends IPrices {
  type: "default";
  prices: IPrice;
  setPrices: (v: IPrice) => void;
}

interface IPricesMinMax extends IPrices {
  type: "min-max";
  prices: IPriceRange;
  setPrices: (v: IPriceRange) => void;
}

export function Prices({
  type,
  title,
  prices,
  setPrices,
}: IPricesDefault | IPricesMinMax) {
  return (
    <div class={styles.container}>
      {title && <span class={styles.title}>{title}</span>}
      <ul class={cn(styles.items, styles[type])}>
        {RADEUS.map((r) => {
          if (type === "default") {
            return (
              <Field
                key={r}
                radius={r}
                price={prices[r].toString()}
                setPrice={(v, r) => {
                  setPrices({ ...prices, [r]: cleanNumber(v) });
                }}
              />
            );
          } else if (type === "min-max") {
            return (
              <FieldMinMax
                key={r}
                radius={r}
                prices={prices[r]}
                setPrices={(v, r) => {
                  setPrices({ ...prices, [r]: v });
                }}
              />
            );
          }
        })}
      </ul>
    </div>
  );
}
