import { createFileRoute } from "@tanstack/react-router";
import AgGridComponent from "@/components/ag-grid/AgGridComponent";
import TanStackTable from "@/components/tanstack-table/TanstackTable";

export const Route = createFileRoute("/tanstack")({
  component: RouteComponent,
});

function RouteComponent() {
  return <TanStackTable />;
}
