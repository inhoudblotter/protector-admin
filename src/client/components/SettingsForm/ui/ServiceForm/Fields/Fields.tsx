import { h } from "preact";
import { useEffect } from "preact/hooks";
import { RefObject } from "preact/compat";
import { Field } from "./Field";
import { cn } from "src/client/shared/utils/cn";
import styles from "./Fields.module.css";
import { IPrices } from "src/client/shared/types/IPrices";
import { Prices } from "../../Prices";
import { IPricesRange } from "src/client/shared/types/IPricesRange";

interface IFields extends h.JSX.HTMLAttributes<HTMLDivElement> {
  pricesType: "default" | "min-max";
  leadTime: number;
  setLeadTime: (v: number) => void;
  maxCars: number;
  setMaxCars: (v: number) => void;
  outerRef: RefObject<HTMLDivElement>;
  onMount: () => void;
}

interface IFieldsDefault extends IFields {
  pricesType: "default";
  prices: IPrices;
  setPrices: (v: IPrices) => void;
}

interface IFieldsMinMax extends IFields {
  pricesType: "min-max";
  prices: IPricesRange;
  setPrices: (v: IPricesRange) => void;
}

export function Fields({
  class: className,
  pricesType,
  leadTime,
  setLeadTime,
  maxCars,
  setMaxCars,
  prices,
  setPrices,
  onMount,
  outerRef,
}: IFieldsDefault | IFieldsMinMax) {
  useEffect(() => {
    if (outerRef.current) {
      outerRef.current.style.setProperty(
        "--height",
        `${outerRef.current.scrollHeight}px`
      );
      outerRef.current.addEventListener(
        "transitionend",
        () => {
          outerRef.current?.scrollIntoView({
            block: "start",
            behavior: "smooth",
          });
        },
        { once: true }
      );
      return onMount();
    }
  }, [onMount, outerRef]);
  return (
    <div class={cn(styles.container, className)} ref={outerRef}>
      <Field
        label={"Время выполнения"}
        placeholder={"Минуты"}
        type={"number"}
        value={leadTime}
        onChange={(e) => {
          setLeadTime(Number(e.currentTarget.value));
        }}
      />
      <Field
        label={"Макс. кол. машин"}
        type={"number"}
        value={maxCars}
        onChange={(e) => {
          setMaxCars(Number(e.currentTarget.value));
        }}
      />
      <span class={styles.pricesTitle}>Цены</span>
      {pricesType === "min-max" ? (
        <>
          <Prices
            type={"min-max"}
            title="Легковые"
            prices={prices.passengerCar}
            setPrices={(v) => {
              setPrices({
                ...prices,
                passengerCar: v,
              });
            }}
          />
          <Prices
            type="min-max"
            title="Кроссоверы"
            prices={prices.crossover}
            setPrices={(v) => {
              setPrices({
                ...prices,
                crossover: v,
              });
            }}
          />
          <Prices
            type="min-max"
            title="Внедорожники"
            prices={prices.suv}
            setPrices={(v) => {
              setPrices({
                ...prices,
                suv: v,
              });
            }}
          />
        </>
      ) : (
        <>
          <Prices
            type="default"
            title="Легковые"
            prices={prices.passengerCar}
            setPrices={(v) => {
              setPrices({
                ...prices,
                passengerCar: v,
              });
            }}
          />
          <Prices
            type="default"
            title="Кроссоверы"
            prices={prices.suv}
            setPrices={(v) => {
              setPrices({
                ...prices,
                crossover: v,
              });
            }}
          />
          <Prices
            type="default"
            title="Внедорожники"
            prices={prices.suv}
            setPrices={(v) => {
              setPrices({
                ...prices,
                suv: v,
              });
            }}
          />
        </>
      )}
    </div>
  );
}
