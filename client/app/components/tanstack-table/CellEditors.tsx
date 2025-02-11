import React from "react";

// 🔹 Text Input Editor
export function TextInputCell({ getValue, row, column, table }) {
  const initialValue = getValue();
  const [value, setValue] = React.useState(initialValue);

  const onBlur = () => {
    table.options.meta?.updateData(row.index, column.id, value);
  };

  return (
    <input
      type="text"
      className="border p-1 w-full"
      value={value}
      onChange={(e) => setValue(e.target.value)}
      onBlur={onBlur}
    />
  );
}

// 🔹 Number Input Editor
export function NumberInputCell({ getValue, row, column, table }) {
  const initialValue = getValue();
  const [value, setValue] = React.useState(initialValue);

  const onBlur = () => {
    table.options.meta?.updateData(row.index, column.id, Number(value));
  };

  return (
    <input
      type="number"
      className="border p-1 w-full"
      value={value}
      onChange={(e) => setValue(e.target.value)}
      onBlur={onBlur}
    />
  );
}

// 🔹 Boolean Checkbox Editor
export function BooleanCheckboxCell({ getValue, row, column, table }) {
  const initialValue = getValue();
  const [checked, setChecked] = React.useState(initialValue);

  const onChange = () => {
    const newValue = !checked;
    setChecked(newValue);
    table.options.meta?.updateData(row.index, column.id, newValue);
  };

  return (
    <div className="flex justify-center">
      <span onClick={onChange} className="cursor-pointer">
        {checked ? "✔️" : ""}
      </span>
    </div>
  );
}

// 🔹 Date Picker Editor
export function DatePickerCell({ getValue, row, column, table }) {
  const initialValue = getValue();
  const [value, setValue] = React.useState(initialValue);

  const onChange = (e) => {
    setValue(e.target.value);
    table.options.meta?.updateData(row.index, column.id, e.target.value);
  };

  return (
    <input
      type="date"
      className="border p-1 w-full"
      value={value}
      onChange={onChange}
    />
  );
}

// 🔹 Select Dropdown Editor
export function SelectDropdownCell({ getValue, row, column, table }) {
  const initialValue = getValue();
  const [value, setValue] = React.useState(initialValue);

  const onChange = (e) => {
    setValue(e.target.value);
    table.options.meta?.updateData(row.index, column.id, e.target.value);
  };

  return (
    <select className="border p-1 w-full" value={value} onChange={onChange}>
      <option value="Option 1">Option 1</option>
      <option value="Option 2">Option 2</option>
      <option value="Option 3">Option 3</option>
    </select>
  );
}
