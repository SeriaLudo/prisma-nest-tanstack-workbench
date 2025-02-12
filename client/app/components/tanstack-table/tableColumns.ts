import { ColumnDef } from "@tanstack/react-table";
import {
  TextInputCell,
  NumberInputCell,
  BooleanCheckboxCell,
  DatePickerCell,
  SelectDropdownCell,
} from "./CellEditors";
import {
  TextFormatter,
  NumberFormatter,
  DateFormatter,
  SelectFormatter,
} from "./CellFormatters";

export const columns: ColumnDef<any>[] = [
  {
    accessorKey: "id",
    header: "ID",
    cell: TextFormatter,
    size: 20,
  },
  {
    accessorKey: "name",
    header: "Name",
    cell: TextInputCell,
    size: 100,
  },
  {
    accessorKey: "age",
    header: "Age",
    cell: NumberInputCell,
    size: 20,
  },
  {
    accessorKey: "isActive",
    header: "Active",
    cell: BooleanCheckboxCell, // Boolean only needs a click to toggle
    size: 20,
  },
  {
    accessorKey: "score",
    header: "Score",
    cell: NumberInputCell,
    size: 20,
  },
  {
    accessorKey: "address",
    header: "Address",
    cell: TextInputCell,
    size: 200,
  },
  {
    accessorKey: "city",
    header: "City",
    cell: TextInputCell,
    size: 100,
  },
  {
    accessorKey: "state",
    header: "State",
    cell: TextInputCell,
    size: 50,
  },
  {
    accessorKey: "zipCode",
    header: "Zip Code",
    cell: TextInputCell,
    size: 50,
  },

  {
    accessorKey: "balance",
    header: "Balance ($)",
    cell: NumberInputCell,
    size: 20,
  },
  {
    accessorKey: "joined",
    header: "Joined Date",
    cell: DatePickerCell,
    size: 100,
  },
  {
    accessorKey: "role",
    header: "Role",
    cell: SelectDropdownCell,
    size: 100,
  },
];
