import React from 'react';
import { Navigate } from "react-router-dom";
import { useAtomValue } from 'jotai';
import { loggedInAtom } from '../../Atoms/loggedin';
import { showToastError } from "../Style/Notifications";
const LoggedOutRoute = ({ children }) => {
    const loggedIn = useAtomValue(loggedInAtom);
    if (loggedIn) {
        showToastError(`Vous êtes déjà connecté !`);
        return <Navigate to="/" replace />;
    }
    return children;
};
export default LoggedOutRoute;