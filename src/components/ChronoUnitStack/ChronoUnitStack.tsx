import React, { createRef, useCallback, useEffect } from "react";
import { getYear } from "date-fns";
import styles from "./ChronoUnitStack.module.css";
import { TranslatingFunction } from "../../translations";

export interface ChronoUnitStackProps {
  value?: number;
  unit: string;
  items: ChronoUnitStackItem[];
  onChange?(unit: string, value: number): void;
}

export interface ChronoUnitStackItem {
  label: string;
  value: number;
}

export const ChronoUnitStack: React.FC<ChronoUnitStackProps> = (props) => {
  const { items, unit, value, onChange } = props;

  const rootRef = createRef<HTMLDivElement>();

  useEffect(() => {
    if (value !== undefined) {
      const node = rootRef.current!.querySelector(`#${unit}-${value}`);

      node?.scrollIntoView();
      rootRef.current!.scrollBy({
        top: -rootRef.current!.clientHeight * 0.33,
      });
    }
  }, []);

  const handleValueChange = useCallback((item: ChronoUnitStackItem) => {
    onChange && onChange(unit, item.value);
  }, []);

  return (
    <div ref={rootRef} className={styles.root}>
      {items.map((item) => (
        <div key={`${unit}:${item.value}`}>
          <button
            id={`${unit}-${item.value}`}
            onClick={() => handleValueChange(item)}
            className={toItemButtonclasses(item, value).join(" ")}
          >
            {item.label}
          </button>
        </div>
      ))}
    </div>
  );
};

function toItemButtonclasses(
  item: ChronoUnitStackItem,
  value: number | undefined
) {
  return ["btn", "btn-block"].concat(
    item.value == value ? "btn-primary" : "btn-outline-primary"
  );
}

export function yearsStack(): ChronoUnitStackItem[] {
  const currentYear = getYear(new Date());
  const arr: ChronoUnitStackItem[] = [];
  for (let index = -50; index < 10; index++) {
    const year = currentYear + index;
    arr.push({
      value: year,
      label: year.toString(),
    });
  }
  return arr;
}

export function monthsStack(tr: TranslatingFunction): ChronoUnitStackItem[] {
  const arr: ChronoUnitStackItem[] = [];
  for (let index = 0; index < 12; index++) {
    arr.push({
      value: index,
      label: tr({ type: "month", value: index }),
    });
  }
  return arr;
}

export function hoursStack(): ChronoUnitStackItem[] {
  const arr: ChronoUnitStackItem[] = [];
  for (let index = 0; index < 24; index++) {
    arr.push({
      label: index.toString().padStart(2, "0"),
      value: index,
    });
  }
  return arr;
}
export function minutesStack(): ChronoUnitStackItem[] {
  const arr: ChronoUnitStackItem[] = [];
  for (let index = 0; index < 60; index++) {
    arr.push({
      label: index.toString().padStart(2, "0"),
      value: index,
    });
  }
  return arr;
}

export function translateMonth(locale: string, index: number) {
  return new Intl.DateTimeFormat(locale, { month: "long" }).format(
    new Date(2020, index, 1)
  );
}
