# @kamil-perczynski/bootstrap-date-picker

> Made with create-react-library

[![NPM](https://img.shields.io/npm/v/@kamil-perczynski/bootstrap-date-picker.svg)](https://www.npmjs.com/package/@kamil-perczynski/bootstrap-date-picker) [![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)

## Install

```bash
npm install --save @kamil-perczynski/bootstrap-date-picker
```

## Usage

```tsx
import React, { useState } from "react";
import { format } from "date-fns";
import { DatePicker, useDatePickerContainer } from "@kamil-perczynski/bootstrap-date-picker";
import "@kamil-perczynski/bootstrap-date-picker/dist/index.css";

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
```

## License

MIT © [kamil-perczynski](https://github.com/kamil-perczynski)
