import React from 'react';
import { Navigate } from "react-router-dom";
import { useAtomValue } from 'jotai';
import { loggedInAtom } from '../../Atoms/loggedin';

const LoggedOutRoute = ({ children }) => {
    const loggedIn = useAtomValue(loggedInAtom);
    if (loggedIn) {
        return <Navigate to="/" replace />;
    }
    return children;
};
export default LoggedOutRoute;