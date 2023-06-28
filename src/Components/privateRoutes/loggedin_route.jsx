import React from 'react';
import { Navigate } from "react-router-dom";
import { useAtomValue } from 'jotai';
import { loggedInAtom } from '../../Atoms/loggedin';
import { showToastError } from "../Style/Notifications";
const LoggedInRoute = ({ children }) => {
    const loggedIn = useAtomValue(loggedInAtom);
    if (!loggedIn) {
        return <Navigate to="/login" replace />;
    }
    return children;
};
export default LoggedInRoute;