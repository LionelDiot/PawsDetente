import React, { useState, useEffect } from "react";
import { useAtomValue } from "jotai";
import { currentUserAtom } from "../../Atoms/currentuser";
import { loggedInAtom } from "../../Atoms/loggedin";
import { Typography, Container, Box, Grid } from "@mui/material";
import "./Myprofile.css";

export default function MyProfile() {
  const [monprofil, setMonprofil] = useState("");
  const [responseData, setResponseData] = useState(null);
  const user = useAtomValue(currentUserAtom);
  const loggedIn = useAtomValue(loggedInAtom);

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
          setResponseData(responseData);
          setMonprofil(`email: ${responseData.user.email}
                        id: ${responseData.user.id}
                        username: ${responseData.user.username}
                        créé le: ${JSON.stringify(createdAt)}
                        all my data pas trié ? : ${JSON.stringify(
                          responseData.user
                        )}
                        mon token JOTAI : ${user}`);
          console.log(responseData.orders);
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
                Email: {responseData && responseData.user.email}
              </Typography>
              <Typography variant="h6" component="h3">
                User ID: {responseData && responseData.user.id}
              </Typography>
            </Box>
          </Box>
        </Box>

        <Box my={4}>
          <Box className="boxbg" border={1} borderRadius={2} p={2} my={2}>
            <Typography variant="h5" component="h3">
              Synthèse de vos commandes
            </Typography>
            {responseData &&
              responseData.orders &&
              responseData.orders.map((order) => (
                <Box
                  key={order.id}
                  my={2}
                  display="flex"
                  justifyContent="space-around"
                >
                  <Typography>
                    Date et heure: {new Date(order.created_at).toLocaleString()}
                  </Typography>
                  <Typography>
                    Montant Total: {order.total / 100} € TTC
                  </Typography>
                </Box>
              ))}
          </Box>
        </Box>
      </Container>
    </div>
  );
}
