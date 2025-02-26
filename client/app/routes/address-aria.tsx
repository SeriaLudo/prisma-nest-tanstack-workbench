import AddressFormAria, {
  AddressValues,
} from "@/components/address-form/AddressFormReactAria";
import { createFileRoute } from "@tanstack/react-router";
import React, { useState, useEffect } from "react";

export const Route = createFileRoute("/address-aria")({
  component: AddressRoute,
});

function AddressRoute() {
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

  // State to store the current address (controlled by checkbox)
  const [currentAddress, setCurrentAddress] = useState<
    Partial<AddressValues> | undefined
  >(undefined);

  // State to store submission results
  const [submissionResult, setSubmissionResult] =
    useState<AddressValues | null>(null);

  // Update current address when checkbox changes
  useEffect(() => {
    setCurrentAddress(useExistingAddress ? existingAddress : undefined);
  }, [useExistingAddress]);

  function handleSubmit(data: { address: AddressValues }) {
    console.log("Form submitted:", data);
    // Display the submitted data
    setSubmissionResult(data.address);

    // Here you would typically send the data to your backend
    // Example:
    // api.saveAddress(data.address).then(response => {
    //   // Handle successful save
    // });
  }

  return (
    <div className="max-w-2xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">Address Management</h1>

      <div className="mb-6 p-4 bg-gray-100 rounded">
        <label className="flex items-center cursor-pointer">
          <input
            type="checkbox"
            checked={useExistingAddress}
            onChange={() => setUseExistingAddress(!useExistingAddress)}
            className="mr-2"
          />
          <span>Load existing address</span>
        </label>
      </div>

      <div className="mb-6">
        <h2 className="text-xl font-semibold mb-4">
          {useExistingAddress ? "Edit Address" : "Add New Address"}
        </h2>
        <AddressFormAria
          onSubmit={handleSubmit}
          initialAddress={currentAddress}
        />
      </div>

      {submissionResult && (
        <div className="mt-8 p-4 border border-green-300 bg-green-50 rounded">
          <h3 className="font-semibold text-green-800 mb-2">
            Address Submitted Successfully:
          </h3>
          <pre className="whitespace-pre-wrap bg-white p-4 rounded text-sm">
            {JSON.stringify(submissionResult, null, 2)}
          </pre>
        </div>
      )}
    </div>
  );
}
