import React from "react";
import {
  useReactTable,
  getCoreRowModel,
  flexRender,
} from "@tanstack/react-table";
import { columns } from "./tableColumns";
import rowData from "../gridData.json"; // ✅ Import JSON directly
import clsx from "clsx";

export default function TanStackTable() {
  const table = useReactTable({
    data: rowData,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  const [highlightedRow, setHighlightedRow] = React.useState<number | null>(
    null
  );

  React.useEffect(() => {
    const interval = setInterval(() => {
      setHighlightedRow(Math.floor(Math.random() * rowData.length));
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const rowHighlighter = clsx({
    "bg-yellow-200": highlightedRow !== null,
  });

  return (
    <div className="p-4">
      <table className="border-collapse border border-gray-300 w-full">
        <thead className="bg-blue-200">
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <th
                  key={header.id}
                  className="border border-gray-300 p-2 hover:bg-blue-300"
                >
                  {flexRender(
                    header.column.columnDef.header,
                    header.getContext()
                  )}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody>
          {table.getRowModel().rows.map((row) => (
            <tr key={row.id} className="hover:bg-blue-100 bg-pink-400">
              {row.getVisibleCells().map((cell) => (
                <td key={cell.id} className="border border-gray-300 p-2">
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
