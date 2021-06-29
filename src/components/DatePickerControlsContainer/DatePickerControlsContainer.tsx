import React from "react";
import styles from "./DatePickerControlsContainer.module.css";

interface Props {
  type: "localdate" | "localdatetime";
}

export const DatePickerControlsContainer: React.FC<Props> = (props) => {
  const { type, children } = props;
  const containerClasses = [
    styles.container,
    type === "localdatetime"
      ? styles.localdatetimeContainer
      : styles.localdateContainer,
  ];
  return <div className={containerClasses.join(" ")}>{children}</div>;
};
