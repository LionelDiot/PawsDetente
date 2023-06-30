import React, { useState, useEffect } from "react";
import { useAtomValue } from "jotai";
import { currentUserAtom } from "../../Atoms/currentuser";
import { loggedInAtom } from "../../Atoms/loggedin";
import { Typography } from "@mui/material";
import CardItem from "../Style/Card";
import { Grid, Box } from "@mui/material";
import Container from "@mui/material/Container";

export default function MyProfile() {
  const [monprofil, setMonprofil] = useState("");
  const [responseData, setResponseData] = useState(null);
  const [userData, setUserData] = useState(null);

  const [favorites, setFavorites] = useState(null);
  const user = useAtomValue(currentUserAtom);
  const loggedIn = useAtomValue(loggedInAtom);

  useEffect(() => {
    if (loggedIn) {
      fetch("https://api-paws-detente-6e0fafb6dbaa.herokuapp.com/favorites", {
        method: "get",
        headers: {
          Authorization: `${user}`,
          "Content-Type": "application/json",
        },
      })
        .then((response) => response.json()) // Handle the response properly
        .then((responseData) => {
          setFavorites(responseData); // Separate state for favorites data
          console.log(responseData);
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
    <Box textAlign="center" marginTop={4}>
      <Typography variant="h4">Bienvenue sur la page des favoris</Typography>
      <Container sx={{ py: 4 }}>
        <Grid container spacing={0} >
          {favorites ? (
            favorites.map((item) => (
              <Grid item key={item} xs={12} sm={6} md={4} lg={3}>
                <Box display="flex" justifyContent="center">
                  <CardItem item={item} />
                </Box>
              </Grid>
            ))
          ) : (
            <Grid item xs={12}>
              <Typography variant="body1">
                Votre liste de favoris est vide.
              </Typography>
            </Grid>
          )}
        </Grid>
      </Container>
    </Box>
  );
}
