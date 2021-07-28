import {
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from "@material-ui/core";
import EditIcon from "@material-ui/icons/Edit";
import { selectAll } from "../clientsSlice";
import DeleteIcon from "@material-ui/icons/Delete";
import { useAppSelector } from "../../../app/hooks";
import { FC } from "react";

interface ClientsTableProps {
  onDelete: (id: string) => void;
  onModify: (id: string) => void;
}

export const ClientsTable: FC<ClientsTableProps> = ({ onDelete, onModify }) => {
  const all = useAppSelector(selectAll);

  return (
    <Table>
      <TableHead>
        <TableRow>
          <TableCell>#</TableCell>
          <TableCell>First name</TableCell>
          <TableCell>Last name</TableCell>
          <TableCell>Phone number</TableCell>
          <TableCell>Address</TableCell>
          <TableCell align="right">Actions</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {Object.entries(all).map(
          ([id, { firstName, lastName, phoneNumber, address }], index) => (
            <TableRow key={id}>
              <TableCell>{index + 1}</TableCell>
              <TableCell>{firstName}</TableCell>
              <TableCell>{lastName}</TableCell>
              <TableCell>{phoneNumber}</TableCell>
              <TableCell>{address}</TableCell>
              <TableCell align="right">
                <IconButton aria-label="edit" onClick={() => onModify(id)}>
                  <EditIcon />
                </IconButton>
                <IconButton aria-label="delete" onClick={() => onDelete(id)}>
                  <DeleteIcon />
                </IconButton>
              </TableCell>
            </TableRow>
          )
        )}
      </TableBody>
    </Table>
  );
};
