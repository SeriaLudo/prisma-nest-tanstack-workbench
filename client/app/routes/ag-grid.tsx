import { createFileRoute } from "@tanstack/react-router";
import AgGridComponent from "@/components/ag-grid/AgGridComponent";

export const Route = createFileRoute("/ag-grid")({
  component: RouteComponent,
});

function RouteComponent() {
  return <AgGridComponent rowData={[]} />;
}
