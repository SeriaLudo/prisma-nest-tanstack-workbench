export function getBooleanColumn(field: string) {
  return {
    headerName: field.charAt(0).toUpperCase() + field.slice(1),
    field,
    cellRenderer: (params: any) => (params.value ? "✔️" : "❌"),
    editable: true,
    cellEditor: "agCheckboxCellEditor",
  };
}
