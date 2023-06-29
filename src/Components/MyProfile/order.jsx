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
import { useAtomValue } from "jotai";
import { currentUserAtom } from "../../Atoms/currentuser";

const Order = ({ order }) => {
  const [open, setOpen] = useState(false);
  const user = useAtomValue(currentUserAtom);
  const [orderDetails, setOrderDetail] = useState(null);

  const handleOpen = async () => {
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
        setOrderDetail(data);
        setOpen(true);

      } else {
        console.log("Error:", response.statusText);
      }

    } catch (error) {
      console.log("Error:", error);
    }
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      <tr>
        <td style={{ textAlign: "center", verticalAlign: "middle" }}>
          {order.id}
        </td>
        <td style={{ textAlign: "center", verticalAlign: "middle" }}>
          {(order.total / 100).toFixed(2)} €
        </td>
        <td style={{ textAlign: "center", verticalAlign: "middle" }}>
          {new Date(order.created_at).toLocaleString([], {
            dateStyle: "short",
            timeStyle: "short",
          })}
        </td>
        <td style={{ textAlign: "center", verticalAlign: "middle" }}>
          <Button
            variant="contained"
            color="primary"
            size="small"
            onClick={handleOpen}
          >
            Voir plus
          </Button>
        </td>
      </tr>

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
          {orderDetails &&
            orderDetails.order_items.map((item, index) => (
              <div key={index}>
                <Typography variant="subtitle1" gutterBottom>
                  Titre de l'article: {item.item_title}
                </Typography>
                <Typography variant="subtitle1" gutterBottom>
                  Quantité: {item.quantity}
                </Typography>
                <Typography variant="subtitle1" gutterBottom>
                  Prix de l'article: {(item.order_item_price / 100).toFixed(2)}{" "}
                  €
                </Typography>
                <hr />
                <Typography variant="subtitle1" gutterBottom>
                  Prix total de la commande: {(order.total / 100).toFixed(2)}€
                </Typography>
              </div>
            ))}
          <Button variant="outlined" color="primary" onClick={handleClose}>
            Fermer
          </Button>
        </Box>
      </Modal>
    </>
  );
};

export default Order;
