export function getActionsColumn() {
  return {
    headerName: "Actions",
    field: "actions",
    cellRenderer: (params: any) => {
      return `<button onClick="alert('Edit ${params.data.id}')">✏️ Edit</button>
              <button onClick="alert('Delete ${params.data.id}')">🗑️ Delete</button>`;
    },
  };
}
