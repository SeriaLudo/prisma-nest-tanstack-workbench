export function getStringColumn(field: string) {
  return {
    headerName: field.charAt(0).toUpperCase() + field.slice(1),
    field,
    filter: "agTextColumnFilter",
    editable: true,
  };
}
