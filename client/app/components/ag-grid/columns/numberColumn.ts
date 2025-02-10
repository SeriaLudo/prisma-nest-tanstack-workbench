export function getNumberColumn(field: string) {
  return {
    headerName: field.charAt(0).toUpperCase() + field.slice(1),
    field,
    filter: "agNumberColumnFilter",
    editable: true,
    valueFormatter: (params: any) => params.value.toLocaleString(),
  };
}
