import { TextField } from "@material-ui/core";
import { FieldAttributes, useField } from "formik";
import React, { FC } from "react";
import { TextFieldProps } from "@material-ui/core/TextField/TextField";

export type FormTextFieldProps = FieldAttributes<TextFieldProps>;

export const FormTextField: FC<FormTextFieldProps> = (props) => {
  const [field, meta] = useField(props);
  return (
    <TextField
      margin="normal"
      fullWidth
      {...field}
      {...props}
      error={meta.touched && !!meta.error}
    />
  );
};
