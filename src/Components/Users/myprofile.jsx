import React, { useState, useEffect } from "react";
import { useAtomValue } from "jotai";
import { currentUserAtom } from "../../Atoms/currentuser";
import { loggedInAtom } from "../../Atoms/loggedin";

export default function MyProfile() {
    const [monprofil, setMonprofil] = useState("");
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
                    const createdAt = new Date(responseData.user.createdAt).toLocaleString();
                    setMonprofil(`email: ${responseData.user.email}
                        id: ${responseData.user.id}
                        
                        créé le: ${JSON.stringify(createdAt)}
                        all my data pas trié ? : ${JSON.stringify(responseData.user)}
                        mon token JOTAI : ${user}`);
                })
                .catch((error) => {
                    console.error("Error:", error);
                    setMonprofil("Une erreur s'est produite lors de la récupération des données.");
                });
        } else {
            setMonprofil("Vous n'êtes pas connecté. Vous n'avez donc pas de profil.");
        }
    }, [user, loggedIn]);

    return (
        <>
            <h1>Coucou de Mon profil !</h1>
            <p>{monprofil}</p>
        </>
    );
}
