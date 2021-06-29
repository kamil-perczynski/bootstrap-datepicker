import React, { useMemo } from "react";
import {
  getDay,
  startOfMonth,
  addDays,
  getDate,
  endOfMonth,
  isAfter,
  isBefore,
  getMonth,
  getDaysInMonth,
} from "date-fns";
import styles from "./DaysOfMonthCalendar.module.css";
import { TranslatingFunction } from "../../translations";

interface Props {
  year: number;
  month: number;
  tr: TranslatingFunction;
  value: number;
  onChange(unit: "dayOfMonth", value: number): void;
}

export const DaysOfMonthCalendar: React.FC<Props> = (props) => {
  const { month, year, tr, value, onChange } = props;
  const { allDays } = useMemo(() => toDaysInMonth(year, month), [year, month]);

  return (
    <div className={styles.monthCalendarGrid}>
      {[0, 1, 2, 3, 4, 5, 6].map((dayOfWeek) => (
        <div key={`dayOfWeek:${dayOfWeek}`}>
          {tr({ type: "dayOfWeek", value: dayOfWeek })}
        </div>
      ))}
      {allDays.map((day, i) => (
        <div key={`day:${i}`}>
          <button
            tabIndex={-1}
            disabled={isDateButtonDisabled(day, [year, month])}
            onClick={() => onChange("dayOfMonth", getDate(day))}
            className={[
              "btn",
              styles.dayOfMonthButton,
              value === getDate(day) && getMonth(day) === month
                ? "btn-primary"
                : styles.dayOfMonthGhostButton,
            ].join(" ")}
          >
            {getDate(day)}
          </button>
        </div>
      ))}
    </div>
  );
};

function toDaysInMonth(year: number, month: number) {
  const startOfTheMonth = startOfMonth(new Date(year, month));
  const daysInMonth = getDaysInMonth(startOfTheMonth);
  const dayOffset =
    getDay(startOfTheMonth) - 1 === -1 ? 6 : getDay(startOfTheMonth) - 1;

  const allDays: Date[] = [];
  for (let i = 0; i < 42; i++) {
    allDays.push(addDays(startOfTheMonth, i - dayOffset));
  }

  return { allDays, daysInMonth };
}
function isDateButtonDisabled(date: Date, [year, month]: [number, number]) {
  const monthStart = startOfMonth(new Date(year, month));
  const monthEnd = endOfMonth(new Date(year, month));

  return isAfter(date, monthEnd) || isBefore(date, monthStart);
}

export function toDayOfWeek(locale: string, index: number) {
  const weekday = [
    new Date("2020-01-06"),
    new Date("2020-01-07"),
    new Date("2020-01-08"),
    new Date("2020-01-09"),
    new Date("2020-01-10"),
    new Date("2020-01-11"),
    new Date("2020-01-12"),
  ];

  return new Intl.DateTimeFormat(locale, { weekday: "short" }).format(
    weekday[index]
  );
}
