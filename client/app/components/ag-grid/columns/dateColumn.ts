export function getDateColumn(field: string) {
  return {
    headerName: field.charAt(0).toUpperCase() + field.slice(1),
    field,
    filter: "agDateColumnFilter",
    editable: true,
    valueFormatter: (params: any) =>
      params.value ? new Date(params.value).toLocaleDateString() : "",
  };
}
