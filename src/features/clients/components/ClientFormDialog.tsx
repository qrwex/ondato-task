import { Form, Formik } from "formik";
import { FC } from "react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@material-ui/core";
import { useAppDispatch, useAppSelector } from "../../../app/hooks";
import { add, Client, selectAll, update } from "../clientSlice";
import FormTextField from "./FormTextField";
import { object, string } from "yup";

export interface ClientFormProps {
  id?: string | null;
  open: boolean;
  onClose: () => void;
}

const validationSchema = object().shape({
  firstName: string().trim().required("Enter first name"),
  lastName: string().trim().required("Enter last name"),
  phoneNumber: string().trim().required("Enter phone number"),
  address: string().trim().required("Enter address"),
});

const initialValues = {
  firstName: "",
  lastName: "",
  phoneNumber: "",
  address: "",
};

export const ClientFormDialog: FC<ClientFormProps> = ({
  id,
  onClose,
  open,
}) => {
  const clients = useAppSelector(selectAll);
  const dispatch = useAppDispatch();

  const handleSubmit = (client: Client) => {
    dispatch(id ? update({ id, client }) : add(client));
    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>{id ? "Edit" : "Add"}</DialogTitle>
      <DialogContent>
        <Formik<Client>
          initialValues={(id && clients[id]) || initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          <Form>
            <FormTextField fullWidth label="First name" name="firstName" />
            <FormTextField fullWidth label="Last name" name="lastName" />
            <FormTextField fullWidth label="Phone number" name="phoneNumber" />
            <FormTextField fullWidth label="Address" name="address" />
          </Form>
        </Formik>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="primary">
          Cancel
        </Button>
        <Button type="submit" color="primary">
          Save
        </Button>
      </DialogActions>
    </Dialog>
  );
};
