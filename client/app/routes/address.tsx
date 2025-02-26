import AddressForm, {
  AddressValues,
} from "@/components/address-form/AddressFormTanstack";
import { createFileRoute } from "@tanstack/react-router";
import React, { useState } from "react";

export const Route = createFileRoute("/address")({
  component: RouteComponent,
});

function RouteComponent() {
  // Example of an existing address that could be loaded from an API
  const existingAddress: AddressValues = {
    label: "Home",
    address1: "123 Main St",
    address2: "Apt 4B",
    city: "New York",
    state: "NY",
    country: "US",
    postalCode: "10001",
  };

  // State to toggle between new address and existing address
  const [useExistingAddress, setUseExistingAddress] = useState(false);

  function handleSubmit(data: { address: AddressValues }) {
    console.log(data);
    // Here you could send the data to your backend
  }

  return (
    <div>
      <div style={{ marginBottom: "20px" }}>
        <label>
          <input
            type="checkbox"
            checked={useExistingAddress}
            onChange={() => setUseExistingAddress(!useExistingAddress)}
          />{" "}
          Load existing address
        </label>
      </div>

      <AddressForm
        onSubmit={handleSubmit}
        initialAddress={useExistingAddress ? existingAddress : undefined}
      />
    </div>
  );
}
