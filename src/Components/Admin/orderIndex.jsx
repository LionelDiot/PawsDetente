import React, { useEffect, useState } from "react";
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography, Button } from "@mui/material";
import { currentUserAtom } from "../../Atoms/currentuser";
import { useAtomValue } from "jotai";
import Order from "./order";

const OrderIndex = () => {
  const [orders, setOrders] = useState([]);
  const user = useAtomValue(currentUserAtom);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const headers = {
          "Content-Type": "application/json",
          Authorization: user,
        };

        const response = await fetch(
          "https://api-paws-detente-6e0fafb6dbaa.herokuapp.com/admin/dashboard",
          {
            method: "GET",
            headers: headers,
          }
        );

        const data = await response.json();
        setOrders(data);
      } catch (error) {
        console.error("Error fetching orders:", error);
      }
    };

    fetchOrders();
  }, []);

  return (
    <div>
      <Typography variant="h5" component="h2" gutterBottom>
        Liste des commandes effectués sur le site :
      </Typography>
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Prix</TableCell>
              <TableCell>Date de création</TableCell>
              <TableCell>Détails</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {orders.map((order) => (
              <TableRow key={order.id}>
                <Order order={order} />
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default OrderIndex;
