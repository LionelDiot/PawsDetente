import React from "react";
import { useNavigate } from 'react-router-dom';

const HomeButton = () => {
    const navigate = useNavigate();

    const retournerAccueil = () => {
        navigate('/'); // Rediriger vers la page d'accueil
    };

    return (
        <button onClick={retournerAccueil}>Retour accueil</button>
    );
};

const DeleteButton = ({ handleClick }) => {
    return (
        <button onClick={handleClick}>
            Delete
        </button>
    );
};

const EditButton = ({ handleClick }) => {
    return (
        <button onClick={handleClick}>
            Edit
        </button>
    );
};

const ShowButton = ({ handleClick }) => {
    return (
        <button onClick={handleClick}>
            Show
        </button>
    );
};

export { HomeButton, DeleteButton, EditButton, ShowButton };
