import React, { useState, useEffect } from "react";
import { useAtomValue } from "jotai";
import { currentUserAtom } from "../../Atoms/currentuser";
import { loggedInAtom } from "../../Atoms/loggedin";
import { Typography, Container, Box, Button, Modal } from "@mui/material";
import "../../App.css";
import Order from "./order";

export default function MyProfile() {
  const [monProfil, setMonprofil] = useState({});
  const [orders, setOrders] = useState([]);
  const user = useAtomValue(currentUserAtom);
  const loggedIn = useAtomValue(loggedInAtom);
  const [selectedOrder, setSelectedOrder] = useState({}); // Update initial value to an empty object



  useEffect(() => {
    if (loggedIn) {
      fetch("https://api-paws-detente-6e0fafb6dbaa.herokuapp.com/member-data", {
        method: "get",
        headers: {
          Authorization: `${user}`,
          "Content-Type": "application/json",
        },
      })
        .then((response) => response.json())
        .then((responseData) => {
          const createdAt = new Date(
            responseData.user.createdAt
          ).toLocaleString();
          setOrders(responseData.orders);
          setMonprofil(responseData.user);
            console.log(responseData.order);
        })
        .catch((error) => {
          console.error("Error:", error);
          setMonprofil(
            "Une erreur s'est produite lors de la récupération des données."
          );
        });
    } else {
      setMonprofil("Vous n'êtes pas connecté. Vous n'avez donc pas de profil.");
    }
  }, [user, loggedIn]);
  
  return (
    <div className="containerbg">
      <Container maxWidth="md">
        <Box textAlign="center">
          <Typography variant="h4" marginTop={4}>
            Bienvenue sur la page profil
          </Typography>
        </Box>
        <Box my={4}>
          <Box className="boxbg" border={1} borderRadius={2} p={2} my={2}>
            <Typography variant="h5" component="h3">
              Informations utilisateurs
            </Typography>
            <Box my={2}>
              <Typography variant="h6" component="h3">
                Email: {monProfil.email}
              </Typography>
              <Typography variant="h6" component="h3">
                User ID: {monProfil.id}
              </Typography>
            </Box>
          </Box>
        </Box>

        <Box my={4}>
          <Box className="boxbg" border={1} borderRadius={2} p={2} my={2}>
            <Typography variant="h5" component="h3">
              Synthèse de vos commandes
            </Typography>
          
            {orders &&
              orders.map((order) => (
                <Order
                  order={order}
                  selectedOrder={selectedOrder}
                  setSelectedOrder={setSelectedOrder}
                />
              ))}{" "}
          </Box>
        </Box>
      </Container>
    
    </div>
  );
}
