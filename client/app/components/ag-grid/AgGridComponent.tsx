import React, { useState, useEffect, useCallback } from "react";
import { AgGridReact } from "ag-grid-react";
import { columnDefs as columns } from "./columnDefs";
import { AllCommunityModule, ModuleRegistry } from "ag-grid-community";
import rowData from "../gridData.json";

// Register all Community features
ModuleRegistry.registerModules([AllCommunityModule]);

export default function AgGridComponent() {
  const [columnDefs, setColumnDefs] = useState(columns);

  useEffect(() => {
    setColumnDefs(columnDefs);
  }, [rowData]);

  return (
    <div className="ag-theme-alpine h-200">
      <AgGridReact rowData={rowData} columnDefs={columns as any} />
    </div>
  );
}
