import * as React from "react";
import { useForm, Controller } from "react-hook-form";
import {
  useTextField,
  useButton,
  AriaTextFieldProps,
  AriaButtonProps,
} from "react-aria";

// Define the AddressValues type
export type AddressValues = {
  label: string;
  address1: string;
  address2?: string;
  city: string;
  state: string;
  country: string;
  postalCode: string;
};

// Dummy country list and US states for dropdowns
const countries = [
  { id: "US", name: "United States" },
  { id: "CA", name: "Canada" },
  { id: "GB", name: "United Kingdom" },
];

const usStates = [
  { id: "AL", name: "Alabama" },
  { id: "AK", name: "Alaska" },
  { id: "AZ", name: "Arizona" },
  { id: "AR", name: "Arkansas" },
  { id: "CA", name: "California" },
  { id: "CO", name: "Colorado" },
  { id: "CT", name: "Connecticut" },
  { id: "DE", name: "Delaware" },
  { id: "FL", name: "Florida" },
  { id: "GA", name: "Georgia" },
  { id: "HI", name: "Hawaii" },
  { id: "ID", name: "Idaho" },
  { id: "IL", name: "Illinois" },
  { id: "IN", name: "Indiana" },
  { id: "IA", name: "Iowa" },
  { id: "KS", name: "Kansas" },
  { id: "KY", name: "Kentucky" },
  { id: "LA", name: "Louisiana" },
  { id: "ME", name: "Maine" },
  { id: "MD", name: "Maryland" },
  { id: "MA", name: "Massachusetts" },
  { id: "MI", name: "Michigan" },
  { id: "MN", name: "Minnesota" },
  { id: "MS", name: "Mississippi" },
  { id: "MO", name: "Missouri" },
  { id: "MT", name: "Montana" },
  { id: "NE", name: "Nebraska" },
  { id: "NV", name: "Nevada" },
  { id: "NH", name: "New Hampshire" },
  { id: "NJ", name: "New Jersey" },
  { id: "NM", name: "New Mexico" },
  { id: "NY", name: "New York" },
  { id: "NC", name: "North Carolina" },
  { id: "ND", name: "North Dakota" },
  { id: "OH", name: "Ohio" },
  { id: "OK", name: "Oklahoma" },
  { id: "OR", name: "Oregon" },
  { id: "PA", name: "Pennsylvania" },
  { id: "RI", name: "Rhode Island" },
  { id: "SC", name: "South Carolina" },
  { id: "SD", name: "South Dakota" },
  { id: "TN", name: "Tennessee" },
  { id: "TX", name: "Texas" },
  { id: "UT", name: "Utah" },
  { id: "VT", name: "Vermont" },
  { id: "VA", name: "Virginia" },
  { id: "WA", name: "Washington" },
  { id: "WV", name: "West Virginia" },
  { id: "WI", name: "Wisconsin" },
  { id: "WY", name: "Wyoming" },
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

// Custom TextField component using React Aria
function TextField(props: AriaTextFieldProps & { error?: string }) {
  const { label, error } = props;
  const ref = React.useRef(null);
  const { labelProps, inputProps, descriptionProps, errorMessageProps } =
    useTextField(props, ref);

  return (
    <div className="form-group mb-4">
      <label {...labelProps}>{label}</label>
      <input
        {...inputProps}
        ref={ref}
        className="form-control w-full p-2 border rounded"
      />
      {error && (
        <div
          {...errorMessageProps}
          className="error-message text-red-500 mt-1 text-sm"
        >
          {error}
        </div>
      )}
    </div>
  );
}

// Enhanced Select component using React Aria
function Select({
  label,
  options,
  error,
  selectedKey,
  onChange,
}: {
  label: string;
  options: Array<{ id: string; name: string }>;
  error?: string;
  selectedKey?: string;
  onChange?: (value: string) => void;
}) {
  const ref = React.useRef(null);

  // Create a proper selection change handler
  const onSelectionChange = (key: React.Key) => {
    if (onChange) {
      onChange(key.toString());
    }
  };

  return (
    <div className="form-group mb-4">
      <label className="block mb-1">{label}</label>
      <div className="relative w-full">
        <select
          ref={ref}
          value={selectedKey || ""}
          onChange={(e) => onSelectionChange(e.target.value)}
          className="w-full p-2 border rounded bg-white"
        >
          <option value="" disabled>
            Select an option
          </option>
          {options.map((option) => (
            <option key={option.id} value={option.id}>
              {option.name}
            </option>
          ))}
        </select>
      </div>
      {error && (
        <div className="error-message text-red-500 mt-1 text-sm">{error}</div>
      )}
    </div>
  );
}

// Submit Button component using React Aria
function SubmitButton(props: AriaButtonProps & { isSubmitting?: boolean }) {
  const ref = React.useRef(null);
  const { buttonProps } = useButton(props, ref);
  const { children, isSubmitting } = props;

  return (
    <button
      {...buttonProps}
      ref={ref}
      type="submit"
      className="px-4 py-2 bg-blue-500 text-white rounded disabled:bg-blue-300"
      disabled={isSubmitting || props.isDisabled}
    >
      {isSubmitting ? "Submitting..." : children}
    </button>
  );
}

export default function AddressFormAria({
  onSubmit,
  initialAddress,
}: {
  onSubmit: (data: { address: AddressValues }) => void;
  initialAddress?: Partial<AddressValues>;
}) {
  // Create a key for the form based on initialAddress to force re-initialization
  const formKey = React.useMemo(
    () => (initialAddress ? JSON.stringify(initialAddress) : "empty"),
    [initialAddress]
  );

  // Merge default values with any provided initial address
  const mergedValues = React.useMemo(
    () => ({
      ...defaultAddress,
      ...initialAddress,
    }),
    [initialAddress]
  );

  // Use form with key to force re-initialization when initialAddress changes
  const {
    control,
    handleSubmit,
    watch,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<AddressValues>({
    defaultValues: mergedValues,
  });

  // Reset form when initialAddress changes
  React.useEffect(() => {
    reset(mergedValues);
  }, [initialAddress, reset, mergedValues]);

  // Watch the country value to conditionally render state field
  const country = watch("country");

  const onFormSubmit = (data: AddressValues) => {
    onSubmit({ address: data });
  };

  return (
    <form key={formKey} onSubmit={handleSubmit(onFormSubmit)}>
      {/* Label Field */}
      <Controller
        name="label"
        control={control}
        rules={{ required: "Label is required" }}
        render={({ field, fieldState }) => (
          <TextField
            label="Label"
            error={fieldState.error?.message}
            {...field}
          />
        )}
      />

      {/* Address 1 Field */}
      <Controller
        name="address1"
        control={control}
        rules={{ required: "Address is required", maxLength: 100 }}
        render={({ field, fieldState }) => (
          <TextField
            label="Address 1"
            error={fieldState.error?.message}
            {...field}
          />
        )}
      />

      {/* Address 2 Field */}
      <Controller
        name="address2"
        control={control}
        rules={{ maxLength: 100 }}
        render={({ field, fieldState }) => (
          <TextField
            label="Address 2"
            error={fieldState.error?.message}
            {...field}
          />
        )}
      />

      {/* City Field */}
      <Controller
        name="city"
        control={control}
        rules={{ required: "City is required", maxLength: 50 }}
        render={({ field, fieldState }) => (
          <TextField
            label="City"
            error={fieldState.error?.message}
            {...field}
          />
        )}
      />

      {/* Country Field */}
      <Controller
        name="country"
        control={control}
        rules={{ required: "Country is required" }}
        render={({ field, fieldState }) => (
          <Select
            label="Country"
            options={countries}
            selectedKey={field.value}
            onChange={field.onChange}
            error={fieldState.error?.message}
          />
        )}
      />

      {/* State Field */}
      <Controller
        name="state"
        control={control}
        rules={{ required: "State is required" }}
        render={({ field, fieldState }) =>
          country === "US" ? (
            <Select
              label="State"
              options={usStates}
              selectedKey={field.value}
              onChange={field.onChange}
              error={fieldState.error?.message}
            />
          ) : (
            <TextField
              label="State/Province"
              error={fieldState.error?.message}
              {...field}
            />
          )
        }
      />

      {/* Postal Code Field */}
      <Controller
        name="postalCode"
        control={control}
        rules={{
          required: "Postal code is required",
          pattern: {
            value:
              country === "US" ? /^\d{5}(-\d{4})?$/ : /^[A-Za-z0-9\s-]{1,10}$/,
            message:
              country === "US" ? "Invalid US ZIP code" : "Invalid postal code",
          },
        }}
        render={({ field, fieldState }) => (
          <TextField
            label="Postal Code"
            error={fieldState.error?.message}
            {...field}
          />
        )}
      />

      {/* Submit Button */}
      <div className="mt-6">
        <SubmitButton isSubmitting={isSubmitting}>Submit</SubmitButton>
      </div>
    </form>
  );
}
