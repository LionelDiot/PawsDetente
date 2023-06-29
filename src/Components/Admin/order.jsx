import React from "react";
import { TableCell, Button } from "@mui/material";

const Order = ({ order }) => {
  const handleOrderDetails = () => {};

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
          onClick={() => handleOrderDetails()}
        >
          Voir plus ...
        </Button>
      </TableCell>
    </>
  );
};

export default Order;
