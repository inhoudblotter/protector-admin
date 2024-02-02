import { h } from "preact";
import { useEffect, useMemo } from "preact/hooks";
import { useDropdown } from "src/client/shared/hooks/useDropdown";
import styles from "./ServiceForm.module.css";
import { Arrow } from "src/client/shared/ui/icons";
import { Fields } from "./Fields";
import { IServiceState } from "../../types/IServiceState";
import { IServiceStateMinMax } from "../../types/IServiceStateMinMax";

interface IServiceForm extends h.JSX.HTMLAttributes<HTMLDivElement> {
  title: string;
  needLeadTime?: boolean;
  needMaxCars?: boolean;
}

interface IServiceFormDefault extends IServiceForm {
  pricesType: "default";
  state: IServiceState;
  setState: (v: IServiceState) => void;
}

interface IServiceFormMinMax extends IServiceForm {
  pricesType: "min-max";
  state: IServiceStateMinMax;
  setState: (v: IServiceStateMinMax) => void;
}

export function ServiceFrom({
  title,
  state,
  setState,
  pricesType,
}: IServiceFormDefault | IServiceFormMinMax) {
  const { dropdownRef, triggerRef, contentRef, isOpen, onContentMount } =
    useDropdown<HTMLDivElement, HTMLButtonElement, HTMLDivElement>(styles.open);
  const fields = useMemo(() => {
    if (pricesType === "min-max") {
      return (
        <Fields
          pricesType="min-max"
          class={styles.fields}
          leadTime={state.leadTime}
          setLeadTime={(v) => setState({ ...state, leadTime: v })}
          maxCars={state.maxCars}
          setMaxCars={(v) => {
            setState({ ...state, maxCars: v });
          }}
          prices={state.prices}
          setPrices={(v) => {
            setState({ ...state, prices: v });
          }}
          onMount={onContentMount}
          outerRef={contentRef}
        />
      );
    } else {
      return (
        <Fields
          pricesType="default"
          class={styles.fields}
          leadTime={state.leadTime}
          setLeadTime={(v) => setState({ ...state, leadTime: v })}
          maxCars={state.maxCars}
          setMaxCars={(v) => {
            setState({ ...state, maxCars: v });
          }}
          prices={state.prices}
          setPrices={(v) => {
            setState({ ...state, prices: v });
          }}
          onMount={onContentMount}
          outerRef={contentRef}
        />
      );
    }
  }, [pricesType]);
  return (
    <div class={styles.dropdown} ref={dropdownRef}>
      <button class={styles.trigger} ref={triggerRef} type={"button"}>
        <span class={styles.title}>{title}</span>
        <Arrow class={styles.dropdownIcon} />
      </button>
      {isOpen && fields}
    </div>
  );
}
