import React from "react";
import {
  TableCell,
  Button,
  Modal,
  Box,
  Typography,
  IconButton,
} from "@mui/material";
import { useState } from "react";
import CloseIcon from "@mui/icons-material/Close";
import userEvent from "@testing-library/user-event";
import { useAtomValue } from "jotai";
import { currentUserAtom } from "../../Atoms/currentuser";

const Order = ({ order }) => {
  const [orderItems, setOrderItems] = useState([]);
  const user = useAtomValue(currentUserAtom);
  const [orderDetails, setOrderDetails] = useState(null);
  const [open, setOpen] = useState(false);
  const handleOrderDetails = async () => {
    try {
      const response = await fetch(
        "https://api-paws-detente-6e0fafb6dbaa.herokuapp.com/order-details",
        {
          method: "POST",
          headers: {
            Authorization: user,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ order_id: order.id }),
        }
      );

      if (response.ok) {
        const data = await response.json();
        setOrderItems(data.order_items);
        setOpen(true);
      } else {
        // Handle the error case
        console.log("Error:", response.statusText);
      }
    } catch (error) {
      // Handle the error case
      console.log("Error:", error);
    }
  };

  return (
    <>
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
          onClick={handleOrderDetails}
        >
          Voir plus ...
        </Button>
      </TableCell>
      <Modal open={open} onClose={() => setOpen(false)}>
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
              onClick={() => setOpen(false)}
              sx={{ position: "absolute", top: 0, right: 0 }}
            >
              <CloseIcon />
            </IconButton>
          </Box>
          <Typography variant="h6" component="h2" gutterBottom>
            Détail de la commande n°{order.id}
          </Typography>

          <table>
            <thead>
              <tr>
                <th>Titre</th>
                <th style={{ paddingLeft: "20px", paddingRight: "20px" }}>
                  Prix
                </th>
                <th style={{ paddingLeft: "20px", paddingRight: "20px" }}>
                  Quantité
                </th>
                <th style={{ paddingLeft: "20px", paddingRight: "20px" }}>
                  Montant payé
                </th>
              </tr>
            </thead>
            <tbody>
              {orderItems.map((item, index) => (
                <tr key={index}>
                  <td>{item.item_title}</td>
                  <td
                    style={{
                      textAlign: "center",
                      paddingLeft: "20px",
                      paddingRight: "20px",
                    }}
                  >
                    {(item.price / 100).toFixed(2)} €
                  </td>
                  <td
                    style={{
                      textAlign: "center",
                      paddingLeft: "20px",
                      paddingRight: "20px",
                    }}
                  >
                    {item.quantity}
                  </td>
                  <td
                    style={{
                      textAlign: "center",
                      paddingLeft: "20px",
                      paddingRight: "20px",
                    }}
                  >
                    {(item.order_item_price / 100).toFixed(2)} €
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          <Typography variant="body1" sx={{ textAlign: "right", mt: 2 }}>
            Total: {(order.total / 100).toFixed(2)} €
          </Typography>
        </Box>
      </Modal>
    </>
  );
};

export default Order;
