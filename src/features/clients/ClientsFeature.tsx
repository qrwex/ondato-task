import { useAppDispatch } from "../../app/hooks";
import { del } from "./clientSlice";
import { Box, Button, Container, Typography } from "@material-ui/core";
import { useState } from "react";
import { ClientFormDialog } from "./components/ClientFormDialog";
import { ClientsTable } from "./components/ClientsTable";

export function ClientsFeature() {
  const dispatch = useAppDispatch();

  const [id, setId] = useState<string | null>(null);
  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleDelete = (id: string) => dispatch(del(id));

  const handleModify = (id: string) => {
    setId(id);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setId(null);
  };

  return (
    <Container maxWidth="md">
      <Typography variant="h3">Clients</Typography>
      <Box mt={2} mb={2} justifyContent="flex-end" display="flex">
        <Button variant="outlined" color="primary" onClick={handleOpen}>
          Add new
        </Button>
      </Box>
      <ClientsTable onDelete={handleDelete} onModify={handleModify} />
      <ClientFormDialog open={open} onClose={handleClose} id={id} />
    </Container>
  );
}
