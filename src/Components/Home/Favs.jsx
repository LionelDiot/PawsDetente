import React, { useState, useEffect } from "react";
import { useAtomValue } from "jotai";
import { currentUserAtom } from "../../Atoms/currentuser";
import { loggedInAtom } from "../../Atoms/loggedin";
import {
    Typography,
} from "@mui/material";
import CardItem from "../Style/Card"; 
import { Grid } from "@mui/material";
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
            setMonprofil(
                "Vous n'êtes pas connecté. Vous n'avez donc pas de profil."
            );
        }
    }, [user, loggedIn]);

    return (
      <Container
        sx={{
          width: "1200px",
          py: 8,
          display: "flex",
          flexDirection: "column",
        }}
        maxWidth="lg"
      >
        {" "}
        <h3 style={{ textAlign: "center" }}>VOTRE SELECTION</h3>
        <Grid container spacing={2} columns={{ xs: 4, sm: 8, md: 12 }}>
          {favorites ? (
            favorites.map((item) => (
              <Grid item xs={2} sm={4} md={3} key={item.id}>
                <CardItem item={item} />
              </Grid>
            ))
          ) : (
            <p>Votre liste de favoris est vide.</p>
          )}
        </Grid>
      </Container>
    );
}