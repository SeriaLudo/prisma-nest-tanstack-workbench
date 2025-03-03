/**
 * @module AddressForm
 * @description A comprehensive address form component with country-specific validation
 * and formatting, built with React Aria Components for accessibility.
 */

import * as React from "react";
import { useForm, Controller } from "react-hook-form";
import {
  Button,
  FieldError,
  Form,
  Input,
  Label,
  TextField,
  Select,
  SelectValue,
  Popover,
  ListBox,
  ListBoxItem,
} from "react-aria-components";
import validator from "validator";

// Import the full library capabilities
import { Country, State } from "country-state-city";

/**
 * @typedef {Object} AddressValues
 * @property {string} label - Descriptive label for the address (e.g., "Home", "Office")
 * @property {string} address1 - Primary address line
 * @property {string} [address2] - Secondary address line (optional)
 * @property {string} city - City name
 * @property {string} [state] - State or province (required for some countries)
 * @property {string} country - Country code in ISO 3166-1 alpha-2 format
 * @property {string} postalCode - Postal or ZIP code
 * @property {string} [latitude] - Geographic latitude (optional)
 * @property {string} [longitude] - Geographic longitude (optional)
 */
export type AddressValues = {
  label: string;
  address1: string;
  address2?: string;
  city: string;
  state?: string;
  country: string;
  postalCode: string;
  latitude?: string;
  longitude?: string;
};

/**
 * @typedef {Object} AddressFormat
 * @property {boolean} requiresState - Whether state/province is required for this country
 * @property {string} postalCodeLabel - Display label for postal code field
 * @property {string} postalCodeFormat - Expected format of postal code
 * @property {string} cityStateFormat - Display format for city, state and postal code
 */

/**
 * Address format definitions by country
 * @type {Object.<string, AddressFormat>}
 */
const ADDRESS_FORMATS = {
  US: {
    requiresState: true,
    postalCodeLabel: "ZIP Code",
    postalCodeFormat: "#####",
    cityStateFormat: "CITY, STATE ZIP",
  },
  GB: {
    requiresState: false,
    postalCodeLabel: "Postcode",
    postalCodeFormat: "Variable",
    cityStateFormat: "CITY\nPOSTCODE",
  },
  // Add more countries as needed
  DEFAULT: {
    requiresState: false,
    postalCodeLabel: "Postal Code",
    postalCodeFormat: "Variable",
    cityStateFormat: "CITY, POSTAL_CODE",
  },
};

/**
 * Default values for a new address
 * @type {AddressValues}
 */
const defaultAddress: AddressValues = {
  label: "Office",
  address1: "",
  address2: "",
  city: "",
  state: "",
  country: "US",
  postalCode: "",
};

/**
 * Validates address data with country-specific rules
 *
 * @async
 * @function validateAddress
 * @param {AddressValues} addressData - Address data to validate
 * @returns {Promise<Record<string, string>>} Validation errors by field name
 */
export async function validateAddress(addressData: AddressValues) {
  const errors: Record<string, string> = {};

  // Get the address format for the selected country
  const countryFormat =
    ADDRESS_FORMATS[addressData.country] || ADDRESS_FORMATS.DEFAULT;

  // Basic validation
  if (!addressData.label) {
    errors.label = "Label is required";
  } else if (!/^[a-zA-Z0-9 \u00C0-\u00FF .,'&/-]+$/.test(addressData.label)) {
    errors.label = "Label contains invalid characters";
  }

  if (!addressData.address1) {
    errors.address1 = "Address is required";
  }

  if (!addressData.city) {
    errors.city = "City is required";
  }

  // State validation based on country format
  if (countryFormat.requiresState && !addressData.state) {
    errors.state = "State/Province is required for this country";
  }

  // Country validation
  if (!addressData.country) {
    errors.country = "Country is required";
  } else if (!validator.isISO31661Alpha2(addressData.country)) {
    errors.country = "Must be a valid country code";
  }

  // Postal code validation
  if (!addressData.postalCode) {
    errors.postalCode = "Postal code is required";
  } else {
    try {
      const postalCodeLocale =
        addressData.country as validator.PostalCodeLocale;
      if (!validator.isPostalCode(addressData.postalCode, postalCodeLocale)) {
        errors.postalCode = `Invalid ${countryFormat.postalCodeLabel} format`;
      }
    } catch (error) {
      // Some countries may not have postal code validation in validator
      console.error("Error validating postal code:", error);
    }
  }

  // Coordinate validation if provided
  if (
    addressData.latitude &&
    !validator.isLatLong(`${addressData.latitude},0`)
  ) {
    errors.latitude = "Invalid latitude value (must be between -90 and 90)";
  }

  if (
    addressData.longitude &&
    !validator.isLatLong(`0,${addressData.longitude}`)
  ) {
    errors.longitude = "Invalid longitude value (must be between -180 and 180)";
  }

  return errors;
}

/**
 * Main address form component with React Aria Components for accessibility
 *
 * @component
 * @param {Object} props - Component props
 * @param {Function} props.onSubmit - Callback when form is submitted and validation passes
 * @param {Partial<AddressValues>} [props.initialAddress] - Initial address values (optional)
 * @returns {JSX.Element} Complete address form with country-specific validation
 *
 * @example
 * // Basic usage with a submission handler
 * <AddressFormRAC
 *   onSubmit={({ address }) => saveAddress(address)}
 * />
 *
 * @example
 * // Pre-populate form with existing address
 * <AddressFormRAC
 *   initialAddress={{
 *     label: "Home",
 *     country: "GB",
 *     address1: "10 Downing Street",
 *     city: "London",
 *     postalCode: "SW1A 2AA"
 *   }}
 *   onSubmit={({ address }) => updateAddress(address)}
 * />
 */
export default function AddressFormRAC({
  onSubmit,
  initialAddress,
}: {
  onSubmit: (data: { address: AddressValues }) => void;
  initialAddress?: Partial<AddressValues>;
}) {
  // State for validation errors
  const [validationErrors, setValidationErrors] = React.useState<
    Record<string, string>
  >({});

  // State to store the address format for the selected country
  const [addressFormat, setAddressFormat] = React.useState(ADDRESS_FORMATS.US);

  /**
   * Converts Country library data to component format
   *
   * @returns {Array<SelectOption>} Formatted country options
   */
  const getFormattedCountries = React.useCallback(() => {
    return Country.getAllCountries().map((country) => ({
      id: country.isoCode,
      name: country.name,
    }));
  }, []);

  /**
   * Gets states for a country in the format needed by the component
   *
   * @param {string} countryCode - ISO country code
   * @returns {Array<SelectOption>} Formatted state options
   */
  const getStatesForCountry = React.useCallback((countryCode: string) => {
    return State.getStatesOfCountry(countryCode).map((state) => ({
      id: state.isoCode,
      name: state.name,
    }));
  }, []);

  // Create a memoized list of countries
  const countries = React.useMemo(
    () => getFormattedCountries(),
    [getFormattedCountries]
  );

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
    formState: { isSubmitting },
  } = useForm<AddressValues>({
    defaultValues: mergedValues,
  });

  // Reset form when initialAddress changes
  React.useEffect(() => {
    reset(mergedValues);
  }, [initialAddress, reset, mergedValues]);

  // Watch the country value to conditionally render state field
  const country = watch("country");

  // Update address format when country changes
  React.useEffect(() => {
    setAddressFormat(ADDRESS_FORMATS[country] || ADDRESS_FORMATS.DEFAULT);
  }, [country]);

  // Get states based on selected country
  const states = React.useMemo(() => {
    if (!country) return [];
    try {
      return getStatesForCountry(country);
    } catch (error) {
      console.error("Error fetching states:", error);
      return [];
    }
  }, [country, getStatesForCountry]);

  /**
   * Handles form submission after validation
   *
   * @param {AddressValues} data - Form data to validate and submit
   */
  const onFormSubmit = async (data: AddressValues) => {
    // Clear previous validation errors
    setValidationErrors({});

    // Validate the address
    const errors = await validateAddress(data);

    // If there are validation errors, display them
    if (Object.keys(errors).length > 0) {
      setValidationErrors(errors);
      return;
    }

    // Submit the form if validation passes
    onSubmit({ address: data });
  };

  return (
    <Form
      key={formKey}
      onSubmit={handleSubmit(onFormSubmit)}
      className="space-y-4"
    >
      {/* Label Field */}
      <Controller
        control={control}
        name="label"
        rules={{ required: "Label is required" }}
        render={({
          field: { name, value, onChange, onBlur, ref },
          fieldState: { invalid, error },
        }) => (
          <TextField
            name={name}
            value={value}
            onChange={onChange}
            onBlur={onBlur}
            isRequired
            validationBehavior="aria"
            isInvalid={invalid || !!validationErrors.label}
          >
            <Label>Label (e.g., Home, Office)</Label>
            <Input ref={ref} className="w-full p-2 border rounded" />
            <FieldError>{error?.message || validationErrors.label}</FieldError>
          </TextField>
        )}
      />

      {/* Address Line 1 Field */}
      <Controller
        control={control}
        name="address1"
        rules={{ required: "Address is required" }}
        render={({
          field: { name, value, onChange, onBlur, ref },
          fieldState: { invalid, error },
        }) => (
          <TextField
            name={name}
            value={value}
            onChange={onChange}
            onBlur={onBlur}
            isRequired
            validationBehavior="aria"
            isInvalid={invalid || !!validationErrors.address1}
          >
            <Label>Street Address</Label>
            <Input ref={ref} className="w-full p-2 border rounded" />
            <FieldError>
              {error?.message || validationErrors.address1}
            </FieldError>
          </TextField>
        )}
      />

      {/* Address Line 2 Field */}
      <Controller
        control={control}
        name="address2"
        render={({ field: { name, value, onChange, onBlur, ref } }) => (
          <TextField
            name={name}
            value={value || ""}
            onChange={onChange}
            onBlur={onBlur}
            validationBehavior="aria"
          >
            <Label>Address Line 2 (optional)</Label>
            <Input ref={ref} className="w-full p-2 border rounded" />
          </TextField>
        )}
      />

      {/* City Field */}
      <Controller
        control={control}
        name="city"
        rules={{ required: "City is required" }}
        render={({
          field: { name, value, onChange, onBlur, ref },
          fieldState: { invalid, error },
        }) => (
          <TextField
            name={name}
            value={value}
            onChange={onChange}
            onBlur={onBlur}
            isRequired
            validationBehavior="aria"
            isInvalid={invalid || !!validationErrors.city}
          >
            <Label>City</Label>
            <Input ref={ref} className="w-full p-2 border rounded" />
            <FieldError>{error?.message || validationErrors.city}</FieldError>
          </TextField>
        )}
      />

      {/* Country Field */}
      <Controller
        control={control}
        name="country"
        rules={{ required: "Country is required" }}
        render={({
          field: { name, value, onChange },
          fieldState: { invalid, error },
        }) => (
          <Select
            name={name}
            selectedKey={value}
            onSelectionChange={onChange}
            isRequired
            validationBehavior="aria"
            isInvalid={invalid || !!validationErrors.country}
            className="w-full"
          >
            <Label>Country</Label>
            <Button className="w-full p-2 flex justify-between items-center border rounded bg-white">
              <SelectValue className="text-left" />
              <span aria-hidden="true">▼</span>
            </Button>
            <Popover>
              <ListBox className="max-h-60 overflow-auto p-1 border rounded bg-white">
                {countries.map((country) => (
                  <ListBoxItem
                    key={country.id}
                    id={country.id}
                    textValue={country.name}
                    className="p-2 cursor-pointer hover:bg-gray-100 rounded"
                  >
                    {country.name}
                  </ListBoxItem>
                ))}
              </ListBox>
            </Popover>
            <FieldError>
              {error?.message || validationErrors.country}
            </FieldError>
          </Select>
        )}
      />

      {/* State Field - Only show if country requires state */}
      {addressFormat.requiresState && (
        <Controller
          control={control}
          name="state"
          rules={{
            required: addressFormat.requiresState
              ? "State/Province is required"
              : false,
          }}
          render={({
            field: { name, value, onChange },
            fieldState: { invalid, error },
          }) => (
            <Select
              name={name}
              selectedKey={value}
              onSelectionChange={onChange}
              isRequired={addressFormat.requiresState}
              validationBehavior="aria"
              isInvalid={invalid || !!validationErrors.state}
              className="w-full"
            >
              <Label>State/Province</Label>
              <Button className="w-full p-2 flex justify-between items-center border rounded bg-white">
                <SelectValue className="text-left" />
                <span aria-hidden="true">▼</span>
              </Button>
              <Popover>
                <ListBox className="max-h-60 overflow-auto p-1 border rounded bg-white">
                  {states.map((state) => (
                    <ListBoxItem
                      key={state.id}
                      id={state.id}
                      textValue={state.name}
                      className="p-2 cursor-pointer hover:bg-gray-100 rounded"
                    >
                      {state.name}
                    </ListBoxItem>
                  ))}
                </ListBox>
              </Popover>
              <FieldError>
                {error?.message || validationErrors.state}
              </FieldError>
            </Select>
          )}
        />
      )}

      {/* Postal Code Field */}
      <Controller
        control={control}
        name="postalCode"
        rules={{ required: `${addressFormat.postalCodeLabel} is required` }}
        render={({
          field: { name, value, onChange, onBlur, ref },
          fieldState: { invalid, error },
        }) => (
          <TextField
            name={name}
            value={value}
            onChange={onChange}
            onBlur={onBlur}
            isRequired
            validationBehavior="aria"
            isInvalid={invalid || !!validationErrors.postalCode}
          >
            <Label>{addressFormat.postalCodeLabel}</Label>
            <Input ref={ref} className="w-full p-2 border rounded" />
            <FieldError>
              {error?.message || validationErrors.postalCode}
            </FieldError>
          </TextField>
        )}
      />

      {/* Optional Coordinates Fields */}
      <div className="flex gap-4">
        <Controller
          control={control}
          name="latitude"
          render={({
            field: { name, value, onChange, onBlur, ref },
            fieldState: { invalid, error },
          }) => (
            <TextField
              name={name}
              value={value || ""}
              onChange={onChange}
              onBlur={onBlur}
              validationBehavior="aria"
              isInvalid={!!validationErrors.latitude}
              className="flex-1"
            >
              <Label>Latitude (optional)</Label>
              <Input ref={ref} className="w-full p-2 border rounded" />
              <FieldError>{validationErrors.latitude}</FieldError>
            </TextField>
          )}
        />

        <Controller
          control={control}
          name="longitude"
          render={({
            field: { name, value, onChange, onBlur, ref },
            fieldState: { invalid, error },
          }) => (
            <TextField
              name={name}
              value={value || ""}
              onChange={onChange}
              onBlur={onBlur}
              validationBehavior="aria"
              isInvalid={!!validationErrors.longitude}
              className="flex-1"
            >
              <Label>Longitude (optional)</Label>
              <Input ref={ref} className="w-full p-2 border rounded" />
              <FieldError>{validationErrors.longitude}</FieldError>
            </TextField>
          )}
        />
      </div>

      {/* Submit Button */}
      <Button
        type="submit"
        isDisabled={isSubmitting}
        className="px-4 py-2 bg-blue-500 text-white rounded disabled:bg-blue-300"
      >
        {isSubmitting ? "Submitting..." : "Save Address"}
      </Button>
    </Form>
  );
}
