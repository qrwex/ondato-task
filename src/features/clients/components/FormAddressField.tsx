import React, { FC } from "react";
import Autocomplete from "@material-ui/lab/Autocomplete";
import throttle from "lodash/throttle";
import { useFormikContext } from "formik";
import { FormTextField, FormTextFieldProps } from "./FormTextField";
import { Client } from "../clientSlice";

type AutocompletePrediction = google.maps.places.AutocompletePrediction;
type AutocompleteService = google.maps.places.AutocompleteService;

const autocompleteService: { current: AutocompleteService | null } = {
  current: null,
};

type FormAddressFieldProps = Pick<FormTextFieldProps, "name" | "label">;

export const FormAddressField: FC<FormAddressFieldProps> = ({
  name,
  label,
}) => {
  const {
    values: { [name as keyof Client]: value },
    setFieldValue,
  } = useFormikContext<Client>();
  const [options, setOptions] = React.useState<string[]>([]);

  const fetch = React.useMemo(
    () =>
      throttle<AutocompleteService["getPlacePredictions"]>(
        (request, callback) => {
          autocompleteService.current?.getPlacePredictions(request, callback);
        },
        200
      ),
    []
  );

  React.useEffect(() => {
    if (!autocompleteService.current && window.google) {
      autocompleteService.current =
        new window.google.maps.places.AutocompleteService();
    }

    if (!autocompleteService.current) return undefined;

    if (!value) setOptions([]);

    fetch({ input: value }, (results?: AutocompletePrediction[]) => {
      setOptions([...(results?.map(({ description }) => description) ?? [])]);
    });
  }, [value, fetch]);

  return (
    <Autocomplete
      options={options}
      freeSolo
      value={value}
      onChange={(event: React.ChangeEvent<{}>, newValue: string | null) => {
        setFieldValue(name, newValue);
      }}
      onInputChange={(
        event: React.ChangeEvent<{}>,
        newValue: string | null
      ) => {
        setFieldValue(name, newValue);
      }}
      renderInput={(fieldProps) => (
        <FormTextField
          {...(fieldProps as FormTextFieldProps)}
          label={label}
          name={name}
        />
      )}
    />
  );
};
