import {TextField} from '@material-ui/core';
import {FieldAttributes, useField} from 'formik';
import React from 'react';
import {TextFieldProps} from '@material-ui/core/TextField/TextField';

const FormTextField = (props: FieldAttributes<TextFieldProps>) => {
  const [field, meta] = useField(props);
  return (
    <TextField {...field} {...props} error={meta.touched && !!meta.error} />
  );
};

export default FormTextField;
