import * as React from "react";
import { useForm } from "@tanstack/react-form";
import type { AnyFieldApi } from "@tanstack/react-form";

// A simple component to display field errors or validation status.
function FieldInfo({ field }: { field: AnyFieldApi }) {
  return (
    <>
      {field.state.meta.isTouched && field.state.meta.errors.length ? (
        <em>{field.state.meta.errors.join(", ")}</em>
      ) : null}
      {field.state.meta.isValidating ? "Validating..." : null}
    </>
  );
}

// Define the AddressValues type directly without Zod schema
export type AddressValues = {
  label: string;
  address1: string;
  address2?: string;
  city: string;
  state: string;
  country: string;
  postalCode: string;
};

// Dummy country list and US states for dropdowns.
const countries = [
  { code: "US", name: "United States" },
  { code: "CA", name: "Canada" },
  { code: "GB", name: "United Kingdom" },
];

const usStates = [
  { code: "AL", name: "Alabama" },
  { code: "AK", name: "Alaska" },
  { code: "AZ", name: "Arizona" },
  { code: "AR", name: "Arkansas" },
  { code: "CA", name: "California" },
  { code: "NY", name: "New York" },
  // Add additional states as needed.
];

// Default values for a new address
const defaultAddress: AddressValues = {
  label: "Office",
  address1: "",
  address2: "",
  city: "",
  state: "",
  country: "US",
  postalCode: "",
};

export default function AddressForm({
  onSubmit,
  initialAddress,
}: {
  onSubmit: (data: { address: AddressValues }) => void;
  initialAddress?: Partial<AddressValues>;
}) {
  // Merge default values with any provided initial address
  const initialFormState: AddressValues = {
    ...defaultAddress,
    ...initialAddress,
  };

  // Get form state to access values directly
  const [formState, setFormState] =
    React.useState<AddressValues>(initialFormState);

  const form = useForm({
    defaultValues: initialFormState,
    onSubmit: async ({ value }) => {
      // Emit the standardized JSON output.
      onSubmit({ address: value });
    },
  });

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        e.stopPropagation();
        form.handleSubmit();
      }}
    >
      {/* Label Field */}
      <div>
        <form.Field name="label">
          {(field) => (
            <>
              <label htmlFor={field.name}>Label:</label>
              <input
                id={field.name}
                name={field.name}
                value={field.state.value}
                onBlur={field.handleBlur}
                onChange={(e) => {
                  field.handleChange(e.target.value);
                  setFormState((prev) => ({ ...prev, label: e.target.value }));
                }}
              />
              <FieldInfo field={field} />
            </>
          )}
        </form.Field>
      </div>

      {/* Address 1 Field */}
      <div>
        <form.Field name="address1">
          {(field) => (
            <>
              <label htmlFor={field.name}>Address 1:</label>
              <input
                id={field.name}
                name={field.name}
                value={field.state.value}
                onBlur={field.handleBlur}
                onChange={(e) => {
                  field.handleChange(e.target.value);
                  setFormState((prev) => ({
                    ...prev,
                    address1: e.target.value,
                  }));
                }}
                maxLength={100}
              />
              <FieldInfo field={field} />
            </>
          )}
        </form.Field>
      </div>

      {/* Address 2 Field */}
      <div>
        <form.Field name="address2">
          {(field) => (
            <>
              <label htmlFor={field.name}>Address 2:</label>
              <input
                id={field.name}
                name={field.name}
                value={field.state.value || ""}
                onBlur={field.handleBlur}
                onChange={(e) => {
                  field.handleChange(e.target.value);
                  setFormState((prev) => ({
                    ...prev,
                    address2: e.target.value,
                  }));
                }}
                maxLength={100}
              />
              <FieldInfo field={field} />
            </>
          )}
        </form.Field>
      </div>

      {/* City Field */}
      <div>
        <form.Field name="city">
          {(field) => (
            <>
              <label htmlFor={field.name}>City:</label>
              <input
                id={field.name}
                name={field.name}
                value={field.state.value}
                onBlur={field.handleBlur}
                onChange={(e) => {
                  field.handleChange(e.target.value);
                  setFormState((prev) => ({ ...prev, city: e.target.value }));
                }}
                maxLength={50}
              />
              <FieldInfo field={field} />
            </>
          )}
        </form.Field>
      </div>

      {/* Country Field */}
      <div>
        <form.Field name="country">
          {(field) => (
            <>
              <label htmlFor={field.name}>Country:</label>
              <select
                id={field.name}
                name={field.name}
                value={field.state.value}
                onBlur={field.handleBlur}
                onChange={(e) => {
                  field.handleChange(e.target.value);
                  setFormState((prev) => ({
                    ...prev,
                    country: e.target.value,
                  }));
                }}
              >
                {countries.map((c) => (
                  <option key={c.code} value={c.code}>
                    {c.name}
                  </option>
                ))}
              </select>
              <FieldInfo field={field} />
            </>
          )}
        </form.Field>
      </div>

      {/* State Field */}
      <div>
        <form.Field name="state">
          {(field) => (
            <>
              <label htmlFor={field.name}>State:</label>
              {formState.country === "US" ? (
                <select
                  id={field.name}
                  name={field.name}
                  value={field.state.value}
                  onBlur={field.handleBlur}
                  onChange={(e) => {
                    field.handleChange(e.target.value);
                    setFormState((prev) => ({
                      ...prev,
                      state: e.target.value,
                    }));
                  }}
                >
                  <option value="">Select a state</option>
                  {usStates.map((s) => (
                    <option key={s.code} value={s.code}>
                      {s.name}
                    </option>
                  ))}
                </select>
              ) : (
                <input
                  id={field.name}
                  name={field.name}
                  value={field.state.value}
                  onBlur={field.handleBlur}
                  onChange={(e) => {
                    field.handleChange(e.target.value);
                    setFormState((prev) => ({
                      ...prev,
                      state: e.target.value,
                    }));
                  }}
                />
              )}
              <FieldInfo field={field} />
            </>
          )}
        </form.Field>
      </div>

      {/* Postal Code Field */}
      <div>
        <form.Field name="postalCode">
          {(field) => (
            <>
              <label htmlFor={field.name}>Postal Code:</label>
              <input
                id={field.name}
                name={field.name}
                value={field.state.value}
                onBlur={field.handleBlur}
                onChange={(e) => {
                  field.handleChange(e.target.value);
                  setFormState((prev) => ({
                    ...prev,
                    postalCode: e.target.value,
                  }));
                }}
              />
              <FieldInfo field={field} />
            </>
          )}
        </form.Field>
      </div>

      {/* Submit Button */}
      <div>
        <form.Subscribe
          selector={(state) => [state.canSubmit, state.isSubmitting]}
        >
          {([canSubmit, isSubmitting]) => (
            <button type="submit" disabled={!canSubmit}>
              {isSubmitting ? "Submitting..." : "Submit"}
            </button>
          )}
        </form.Subscribe>
      </div>
    </form>
  );
}
