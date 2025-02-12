import React, { useState, useEffect } from "react";
import {
  useReactTable,
  getCoreRowModel,
  flexRender,
  getGroupedRowModel,
  getExpandedRowModel,
} from "@tanstack/react-table";
import { columns } from "./tableColumns";
import rowData from "../gridData.json";
import clsx from "clsx";
import { getJoinedCategory } from "@/lib/utils";

interface RowData {
  id: number;
  name: string;
  joined: string;
  category?: string;
}

export default function TanStackTable() {
  const [grouping, setGrouping] = useState(["category"]);
  const [data, setData] = useState<RowData[]>([]);
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getGroupedRowModel: getGroupedRowModel(),
    getExpandedRowModel: getExpandedRowModel(),
    state: {
      grouping,
    },
    onGroupingChange: setGrouping,
  });

  const [highlightedRow, setHighlightedRow] = React.useState<number | null>(
    null
  );

  useEffect(() => {
    const categorizedData = rowData.map((user) => ({
      ...user,
      category: getJoinedCategory(user.joined),
    }));
    setData(categorizedData);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setHighlightedRow(Math.floor(Math.random() * rowData.length));
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const rowHighlighter = clsx({
    "bg-yellow-200": highlightedRow !== null,
  });

  const handleGroupingChange = () => {
    // we are only grouping by joined, so let's use this to group/ungroup by category
    const newGrouping = grouping.includes("category")
      ? []
      : ["category", ...grouping];
    setGrouping(newGrouping);
  };

  return (
    <div className="p-4 overflow-x-scroll">
      <button onClick={handleGroupingChange}>
        {!!grouping.length ? "Ungroup" : "Group"}
      </button>
      <table className="border-collapse border border-gray-300 ">
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
            <>
              <tr
                key={row.id}
                className={clsx(
                  row.getIsGrouped() ? "bg-gray-200 font-bold" : "bg-white",
                  "hover:bg-blue-100 bg-orange-400"
                )}
              >
                {row.getVisibleCells().map((cell) => (
                  <td key={cell.id} className="border border-gray-300 p-2">
                    {cell.getIsGrouped() ? (
                      <button
                        onClick={row.getToggleExpandedHandler()}
                        className="text-blue-500"
                      >
                        {row.getIsExpanded() ? "▼" : "▶"}{" "}
                        {String(cell.getValue())}
                      </button>
                    ) : (
                      flexRender(cell.column.columnDef.cell, cell.getContext())
                    )}
                  </td>
                ))}
              </tr>
              {row.getIsExpanded() && row.subRows.length > 0 && (
                <tr>
                  <td colSpan={columns.length}></td>
                </tr>
              )}
            </>
          ))}
        </tbody>
      </table>
    </div>
  );
}
