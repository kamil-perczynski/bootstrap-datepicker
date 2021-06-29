import React from "react";
import {
  ChronoUnitStack,
  DatePickerProps,
  useDatePickerInternals,
} from "@kamil-perczynski/bootstrap-date-picker";
import styles from "./CustomDatePicker.module.css";
interface Props extends DatePickerProps {}

export const CustomDatePicker: React.FC<Props> = (props) => {
  const {} = props;

  const {
    tr,
    years,
    months,
    currentYear,
    currentMonth,
    handleChronoUnitChange,
    handleKeyDown,
  } = useDatePickerInternals(props);

  return (
    <div
      tabIndex={-1}
      onKeyDown={handleKeyDown}
      style={{ position: "absolute" }}
      className={["card"].join(" ")}
    >
      <div className="card-body">
        <div className={styles.container}>
          <h6>{tr({ type: "chronoUnitHeader", value: "year" })}</h6>
          <h6>{tr({ type: "chronoUnitHeader", value: "month" })}</h6>

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
        </div>
      </div>
    </div>
  );
};
