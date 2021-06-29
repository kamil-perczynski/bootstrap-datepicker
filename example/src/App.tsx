import React, { useState } from "react";
import { format } from "date-fns";
import { DatePicker, useDatePickerContainer } from "bootstrap-datepicker";
import { CustomDatePicker } from "./CustomDatePicker/CustomDatePicker";
import "bootstrap-datepicker/dist/index.css";

const App = () => {
  const [months, setMonths] = useState("2012-12");

  return (
    <div className="container">
      <br />
      <form onSubmit={(e) => e.preventDefault()}>
        <div className="row">
          <div className="col-md-4">
            <DatePickerFormGroup type="localdate" />
          </div>
          <div className="col-md-4">
            <DatePickerFormGroup type="localdatetime" />
          </div>
          <div className="col-md-4 d-none">
            <CustomDatePicker
              locale="pl-PL"
              type="localdate"
              value={months}
              onChange={setMonths}
            />
          </div>
        </div>
      </form>
    </div>
  );
};

const DatePickerFormGroup: React.FC<any> = () => {
  const [isOpen, setOpen] = useState(false);
  const [value, setValue] = useState("2021-05-03T12:00");

  const focuser = useDatePickerContainer(() => setOpen(false));

  return (
    <div
      onClick={focuser.onClick}
      onBlur={focuser.onBlur}
      ref={focuser.containerRef}
      className="form-group"
    >
      <label htmlFor="date-1">Pick a date:</label>
      <input
        value={format(new Date(value), "dd.MM.yyyy HH:mm")}
        onFocus={() => setOpen(true)}
        id="date-1"
        readOnly
        className="form-control bg-white"
      />
      <DatePicker
        type="localdatetime"
        open={isOpen}
        onClose={() => setOpen(false)}
        value={value}
        onChange={setValue}
        locale="hr-HR"
      />
    </div>
  );
};

export default App;
