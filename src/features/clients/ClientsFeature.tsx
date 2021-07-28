import {useAppDispatch} from '../../app/hooks';
import {add, Client, del, update} from './clientsSlice';
import {
  Box,
  Button,
  Container,
  Dialog,
  DialogContent,
  DialogTitle,
  Typography,
} from '@material-ui/core';
import {useState} from 'react';
import {ClientForm} from './components/ClientForm';
import {ClientsTable} from './components/ClientsTable';

export function ClientsFeature() {
  const dispatch = useAppDispatch();

  const [id, setId] = useState<string | null>(null);
  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleModify = (id: string) => {
    setId(id);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setId(null);
  };

  const handleSubmit = (client: Client) => {
    dispatch(
      id ?
        update({id, client}) :
        add(client),
    );
    handleClose();
  };

  return (
    <Container maxWidth="md">
      <Typography variant="h3">
        Clients
      </Typography>
      <Box mt={2} mb={2} justifyContent="flex-end" display="flex">
        <Button variant="contained" color="primary" onClick={handleOpen}>
          Add new
        </Button>
      </Box>
      <ClientsTable onDelete={(id) => dispatch(del(id))} onModify={handleModify}/>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>
          {id ? 'Edit' : 'Add'}
        </DialogTitle>
        <DialogContent>
          <ClientForm onSubmit={handleSubmit} id={id}/>
        </DialogContent>
      </Dialog>
    </Container>
  );
}
