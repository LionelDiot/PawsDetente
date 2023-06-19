import React from "react";
import { NavLink } from "react-router-dom";

export default function PageNotFound() {
    return (
        <>
            <h1>ERREUR 404</h1>
            <NavLink to="/">
                <p>Voici un lien vers la page d'accueil !</p>
            </NavLink>
        </>
    );
}
