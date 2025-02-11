import { ColumnDef } from "@tanstack/react-table";
import {
  TextInputCell,
  NumberInputCell,
  BooleanCheckboxCell,
  DatePickerCell,
  SelectDropdownCell,
} from "./CellEditors";

export const columns: ColumnDef<any>[] = [
  {
    accessorKey: "id",
    header: "ID",
    cell: (info) => info.getValue(),
  },
  {
    accessorKey: "name",
    header: "Name",
    cell: TextInputCell,
  },
  {
    accessorKey: "age",
    header: "Age",
    cell: NumberInputCell,
  },
  {
    accessorKey: "isActive",
    header: "Active",
    cell: BooleanCheckboxCell,
  },
  {
    accessorKey: "joined",
    header: "Joined Date",
    cell: DatePickerCell,
  },
  {
    accessorKey: "role",
    header: "Role",
    cell: SelectDropdownCell,
  },
];
