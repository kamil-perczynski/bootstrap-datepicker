import {
  getHours,
  getMinutes,
  getMonth,
  setYear,
  getDate,
  getYear,
  setMonth,
  setDate,
  setHours,
  setMinutes,
} from "date-fns";

import React, { createRef, useCallback, useEffect, useMemo } from "react";
import {
  ChronoUnitStack,
  hoursStack,
  minutesStack,
  monthsStack,
  yearsStack,
} from "../ChronoUnitStack/ChronoUnitStack";
import { DatePickerControlsContainer } from "../DatePickerControlsContainer/DatePickerControlsContainer";
import { DaysOfMonthCalendar } from "..//DaysOfMonthCalendar/DaysOfMonthCalendar";
import { defaultTranslations, TranslatingFunction } from "../../translations";
import styles from "./DatePicker.module.css";

export interface DatePickerProps {
  type?: "localdate" | "localdatetime";
  open?: boolean;
  value?: string;
  locale?: string;
  onChange(value: string): void;
  tr?: TranslatingFunction;
  onClose?(): void;
}
export const DatePicker: React.FC<DatePickerProps> = (props) => {
  const { open, type = "localdatetime" } = props;

  const {
    tr,
    years,
    months,
    hours,
    minutes,
    currentYear,
    currentMonth,
    currentDay,
    currentHour,
    currentMinute,
    handleChronoUnitChange,
    handleKeyDown,
  } = useDatePickerInternals(props);

  if (open === false) {
    return null;
  }

  return (
    <div
      tabIndex={-1}
      onKeyDown={handleKeyDown}
      className={["card", styles.root].join(" ")}
    >
      <div className="card-body">
        <DatePickerControlsContainer type={type}>
          <h6>{tr({ type: "chronoUnitHeader", value: "year" })}</h6>
          <h6>{tr({ type: "chronoUnitHeader", value: "month" })}</h6>
          <h6>{tr({ type: "chronoUnitHeader", value: "dayOfMonth" })}</h6>
          {type === "localdatetime" && (
            <React.Fragment>
              <h6>{tr({ type: "chronoUnitHeader", value: "hour" })}</h6>
              <h6>{tr({ type: "chronoUnitHeader", value: "minute" })}</h6>
            </React.Fragment>
          )}

          <ChronoUnitStack
            value={currentYear}
            onChange={handleChronoUnitChange}
            items={years}
            unit="year"
          />
          <ChronoUnitStack
            value={currentMonth}
            onChange={handleChronoUnitChange}
            items={months}
            unit="month"
          />
          <DaysOfMonthCalendar
            value={currentDay}
            onChange={handleChronoUnitChange}
            tr={tr}
            year={currentYear}
            month={currentMonth}
          />
          {type === "localdatetime" && (
            <React.Fragment>
              <ChronoUnitStack
                value={currentHour}
                onChange={handleChronoUnitChange}
                items={hours}
                unit="hour"
              />
              <ChronoUnitStack
                value={currentMinute}
                onChange={handleChronoUnitChange}
                items={minutes}
                unit="minute"
              />
            </React.Fragment>
          )}
        </DatePickerControlsContainer>
      </div>
    </div>
  );
};

export function useDatePickerInternals(props: DatePickerProps) {
  const { value, open, onClose, onChange } = props;
  const tr = useMemo(() => {
    if (props.tr) return props.tr;
    if (props.locale) {
      return defaultTranslations(props.locale);
    }

    throw new Error("Both locale and tr properties are missing");
  }, [props.locale, props.tr]);

  const years = useMemo(yearsStack, []);
  const months = useMemo(() => monthsStack(tr), []);
  const hours = useMemo(hoursStack, []);
  const minutes = useMemo(minutesStack, []);

  const currentDate = useMemo(
    () => (!!value ? new Date(value) : new Date()),
    [value]
  );

  const { currentYear, currentMonth, currentDay, currentHour, currentMinute } =
    useMemo(() => {
      const currentYear = getYear(currentDate);
      const currentMonth = getMonth(currentDate);
      const currentDay = getDate(currentDate);
      const currentHour = getHours(currentDate);
      const currentMinute = getMinutes(currentDate);
      return {
        currentYear,
        currentMonth,
        currentDay,
        currentHour,
        currentMinute,
      };
    }, [currentDate]);

  const handleChronoUnitChange = useCallback(
    (unit: string, unitValue: number) => {
      if (!onChange) {
        return;
      }
      const updatedDate = (() => {
        switch (unit) {
          case "year": {
            return setYear(currentDate, unitValue);
          }
          case "month": {
            return setMonth(currentDate, unitValue);
          }
          case "dayOfMonth": {
            return setDate(currentDate, unitValue);
          }
          case "hour": {
            return setHours(currentDate, unitValue);
          }
          case "minute": {
            return setMinutes(currentDate, unitValue);
          }
          default:
            throw new Error();
        }
      })();
      onChange(updatedDate.toString());
    },
    [onChange, currentDate]
  );

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent<HTMLDivElement>) => {
      if (e.key === "Escape") {
        onClose && onClose();
      }
    },
    []
  );

  useEffect(() => {
    if (open === true && !!onClose) {
      const listener = () => {
        onClose();
        window.removeEventListener("click", listener);
      };
      window.addEventListener("click", listener);
    }
  }, [onClose, open]);

  return {
    tr,
    years,
    months,
    hours,
    minutes,
    currentYear,
    currentMonth,
    currentDay,
    currentHour,
    currentMinute,
    handleChronoUnitChange,
    handleKeyDown,
  };
}

export function useDatePickerContainer(onClose: () => void) {
  const ref = createRef<HTMLDivElement>();
  return useMemo(() => {
    function handleOnBlur() {
      const nodeWithin =
        ref.current!.parentNode!.querySelector(":focus-within");
      const anyNode = document.body.querySelector(":focus-within");

      if (!!nodeWithin) {
        return;
      }
      if (!!anyNode && !!anyNode.localName) {
        onClose();
      }
    }
    return {
      containerRef: ref,
      onBlur: handleOnBlur,
      onClick: (e: React.SyntheticEvent) => e.stopPropagation(),
    };
  }, [ref]);
}
