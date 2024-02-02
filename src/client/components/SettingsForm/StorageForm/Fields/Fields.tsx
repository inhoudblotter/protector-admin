import { h } from "preact";
import { useEffect } from "preact/hooks";
import { RefObject } from "preact/compat";
import { Input } from "src/client/shared/ui/Input";
import styles from "./Fields.module.css";
import { IStorageState } from "../../types/IStorageState";
import { Prices } from "../../ui/Prices";
import { cn } from "src/client/shared/utils/cn";

interface IFields extends h.JSX.HTMLAttributes<HTMLDivElement> {
  state: IStorageState;
  setState: (v: IStorageState) => void;
  outerRef: RefObject<HTMLDivElement>;
  onMount: () => void;
}

export function Fields({
  outerRef,
  onMount,
  state,
  setState,
  class: className,
}: IFields) {
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
      <div class={styles.field}>
        <span class={styles.label}>Макс. кол. колёс</span>
        <Input
          class={styles.Input}
          type="number"
          value={state.maxWheels}
          onChange={(e) => {
            setState({ ...state, maxWheels: Number(e.currentTarget.value) });
          }}
        />
      </div>
      <span class={styles.pricesTitle}>Цены</span>
      <Prices
        type="default"
        prices={state.prices}
        setPrices={(v) => {
          setState({ ...state, prices: v });
        }}
      />
    </div>
  );
}
