import { ColumnDef } from "@tanstack/react-table";

export const columns: ColumnDef<any>[] = [
  {
    accessorKey: "id",
    header: "ID",
    cell: (info: any) => info.getValue(),
  },
  {
    accessorKey: "name",
    header: "Name",
    cell: (info: any) => info.getValue(),
  },
  {
    accessorKey: "age",
    header: "Age",
    cell: (info: any) => info.getValue(),
  },
  {
    accessorKey: "isActive",
    header: "Active",
    cell: (info: any) => (info.getValue() ? "✔️" : "❌"),
  },
  {
    accessorKey: "joined",
    header: "Joined Date",
    cell: (info: any) => new Date(info.getValue()).toLocaleDateString(),
  },
  {
    accessorKey: "balance",
    header: "Balance ($)",
    cell: (info: any) => `$${info.getValue().toFixed(2)}`,
  },
  {
    accessorKey: "email",
    header: "Email",
    cell: (info: any) => info.getValue(),
  },
  {
    accessorKey: "score",
    header: "Score",
    cell: (info: any) => info.getValue().toFixed(2),
  },
];
