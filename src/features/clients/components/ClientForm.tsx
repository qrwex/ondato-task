import {Form, Formik} from 'formik';
import {FC} from 'react';
import {Box, Button, Grid} from '@material-ui/core';
import {useAppSelector} from '../../../app/hooks';
import {Client, selectAll} from '../clientsSlice';
import FormTextField from './FormTextField';
import {object, string} from 'yup';

export interface ClientFormProps {
  id?: string | null;
  onSubmit: (values: Client) => void;
}

const validationSchema = object()
    .shape({
      firstName: string().trim().required('Enter first name'),
      lastName: string().trim().required('Enter last name'),
      phoneNumber: string().trim().required('Enter phone number'),
      address: string().trim().required('Enter address'),
    });

const initialValues = {
  firstName: '',
  lastName: '',
  phoneNumber: '',
  address: '',
};

export const ClientForm: FC<ClientFormProps> = ({id, onSubmit}) => {
  const clients = useAppSelector(selectAll);

  return (
    <Formik<Client>
      initialValues={(id && clients[id]) || initialValues}
      validationSchema={validationSchema}
      onSubmit={onSubmit}
    >
      <Form>
        <Box padding={1}>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <FormTextField fullWidth label="First name" name="firstName"/>
            </Grid>
            <Grid item xs={12}>
              <FormTextField fullWidth label="Last name" name="lastName"/>
            </Grid>
            <Grid item xs={12}>
              <FormTextField fullWidth label="Phone number" name="phoneNumber"/>
            </Grid>
            <Grid item xs={12}>
              <FormTextField fullWidth label="Address" name="address"/>
            </Grid>
            <Grid item xs={12}>
              <Box display="flex" justifyContent="flex-end">
                <Button type="submit" color="primary" variant="outlined">
                  Save
                </Button>
              </Box>
            </Grid>
          </Grid>
        </Box>
      </Form>
    </Formik>
  );
};
