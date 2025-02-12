import React, { useState } from "react";

// 🔹 Generic Inline Editor Wrapper
function EditableCell({ getValue, row, column, table, children }) {
  const [isEditing, setIsEditing] = useState(false);
  const value = getValue();

  const handleBlur = (newValue) => {
    table.options.meta?.updateData(row.index, column.id, newValue);
    setIsEditing(false);
  };

  return isEditing ? (
    children(handleBlur)
  ) : (
    <div onClick={() => setIsEditing(true)} className="cursor-pointer p-1">
      {value}
    </div>
  );
}

// 🔹 Text Input Editor
export function TextInputCell(props) {
  return (
    <EditableCell {...props}>
      {(handleBlur) => (
        <input
          type="text"
          className="border p-1 w-full"
          autoFocus
          defaultValue={props.getValue()}
          onBlur={(e) => handleBlur(e.target.value)}
        />
      )}
    </EditableCell>
  );
}

// 🔹 Number Input Editor
export function NumberInputCell(props) {
  return (
    <EditableCell {...props}>
      {(handleBlur) => (
        <input
          type="number"
          className="border p-1 w-full"
          autoFocus
          defaultValue={props.getValue()}
          onBlur={(e) => handleBlur(Number(e.target.value))}
        />
      )}
    </EditableCell>
  );
}

// 🔹 Boolean Checkbox Editor (Instant Toggle)
export function BooleanCheckboxCell({ getValue, row, column, table }) {
  const value = getValue();

  const onClick = () => {
    table.options.meta?.updateData(row.index, column.id, !value);
  };

  return (
    <div
      className="flex justify-center items-center cursor-pointer"
      onClick={onClick}
      role="checkbox"
      aria-checked={value}
      style={{ height: "100%", flexGrow: 1 }}
    >
      <span>{value ? "✔️" : ""}</span>
    </div>
  );
}

// 🔹 Date Picker Editor
export function DatePickerCell(props) {
  return (
    <EditableCell {...props}>
      {(handleBlur) => (
        <input
          type="date"
          className="border p-1"
          autoFocus
          defaultValue={props.getValue()}
          onBlur={(e) => handleBlur(e.target.value)}
        />
      )}
    </EditableCell>
  );
}

// 🔹 Select Dropdown Editor
export function SelectDropdownCell(props) {
  return (
    <EditableCell {...props}>
      {(handleBlur) => (
        <select
          className="border p-1 w-full"
          autoFocus
          defaultValue={props.getValue()}
          onBlur={(e) => handleBlur(e.target.value)}
        >
          <option value="Option 1">Option 1</option>
          <option value="Option 2">Option 2</option>
          <option value="Option 3">Option 3</option>
        </select>
      )}
    </EditableCell>
  );
}
