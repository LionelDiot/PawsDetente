import React, { useState } from "react";
import {
  Box,
  TableCell,
  Button,
  Modal,
  Typography,
  IconButton,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

const Order = ({ order }) => {
  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      <Box key={order.id} my={2} display="flex" justifyContent="space-around">
        <TableCell>{order.id}</TableCell>
        <TableCell>{(order.total / 100).toFixed(2)} €</TableCell>
        <TableCell>
          {new Date(order.created_at).toLocaleString([], {
            dateStyle: "short",
            timeStyle: "short",
          })}
        </TableCell>
        <TableCell>
          <Button
            variant="outlined"
            color="primary"
            size="small"
            onClick={handleOpen}
          >
            Voir plus
          </Button>
        </TableCell>
      </Box>

      <Modal open={open} onClose={handleClose}>
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            bgcolor: "background.paper",
            boxShadow: 24,
            p: 4,
            borderRadius: "8px",
          }}
        >
          <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
            <IconButton
              onClick={handleClose}
              sx={{ position: "absolute", top: 0, right: 0 }}
            >
              <CloseIcon />
            </IconButton>
          </Box>
          <Typography variant="h6" component="h2" gutterBottom>
            Détails de la commande
          </Typography>
          <Typography variant="subtitle1" gutterBottom>
            ID de la commande: {order.id}
          </Typography>
          <Typography variant="subtitle1" gutterBottom>
            Montant total: {(order.total / 100).toFixed(2)} €
          </Typography>
          <Typography variant="subtitle1" gutterBottom>
            Date de création:{" "}
            {new Date(order.created_at).toLocaleString([], {
              dateStyle: "short",
              timeStyle: "short",
            })}
          </Typography>

          <Typography variant="h6" component="h2" gutterBottom>
            Détails de la commande: {order.items}
          </Typography>
          
          <Button variant="outlined" color="primary" onClick={handleClose}>
            Fermer
          </Button>
        </Box>
      </Modal>
    </>
  );
};

export default Order;
