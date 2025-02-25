import AddressForm, {
  AddressValues,
} from "@/components/address-form/AddressForm";
import { createFileRoute } from "@tanstack/react-router";
import React from "react";

export const Route = createFileRoute("/address")({
  component: RouteComponent,
});

function RouteComponent() {
  function handleSubmit(data: { address: AddressValues }) {
    console.log(data);
  }
  return <AddressForm onSubmit={handleSubmit} />;
}
