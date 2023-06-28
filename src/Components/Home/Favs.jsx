import React, { useState, useEffect } from "react";
import { useAtomValue } from "jotai";
import { currentUserAtom } from "../../Atoms/currentuser";
import { loggedInAtom } from "../../Atoms/loggedin";
import {
    Typography,
} from "@mui/material";

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
        <Typography fontWeight={700} color="text.secondary">
            {monprofil && (
                <>

                    {responseData && responseData[0].user_id}
                    <br />
                    <Typography
                        variant="body2"
                        color="text.secondary"
                        component="span"
                    >
                        item id:{" "}
                    </Typography>
                    {responseData && responseData[0].item_id}
                </>
            )}
        </Typography>
    )
}