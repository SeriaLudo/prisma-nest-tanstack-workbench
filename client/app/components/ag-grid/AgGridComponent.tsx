import React, { useState, useEffect, useCallback } from "react";
import { AgGridReact } from "ag-grid-react";
import { getColumnDefs } from "./columnDefs";
import { AllCommunityModule, ModuleRegistry } from "ag-grid-community";

// Register all Community features
ModuleRegistry.registerModules([AllCommunityModule]);

export default function AgGridComponent({ rowData }: { rowData: any[] }) {
  const [columnDefs, setColumnDefs] = useState([]);

  useEffect(() => {
    setColumnDefs(getColumnDefs(rowData) as any);
  }, [rowData]);

  return (
    <div
      className="ag-theme-alpine"
      style={{ height: 500, width: "100%", backgroundColor: "red" }}
    >
      <AgGridReact rowData={rowData} columnDefs={columnDefs} />
    </div>
  );
}
