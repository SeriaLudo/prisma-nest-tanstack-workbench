import { getStringColumn } from "./columns/stringColumn";
import { getNumberColumn } from "./columns/numberColumn";
import { getBooleanColumn } from "./columns/booleanColumn";
import { getDateColumn } from "./columns/dateColumn";
import { getActionsColumn } from "./columns/actionsColumn";

export function getColumnDefs(rowData: any[]) {
  if (!rowData || rowData.length === 0) return [];

  const sampleRow = rowData[0];
  return Object.keys(sampleRow)
    .map((key) => {
      const value = sampleRow[key];

      if (typeof value === "string") return getStringColumn(key);
      if (typeof value === "number") return getNumberColumn(key);
      if (typeof value === "boolean") return getBooleanColumn(key);
      if (value instanceof Date || !isNaN(Date.parse(value)))
        return getDateColumn(key);

      return { headerName: key, field: key }; // Default column
    })
    .concat(getActionsColumn());
}
