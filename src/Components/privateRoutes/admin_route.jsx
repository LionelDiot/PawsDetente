import React from 'react';
import { Navigate } from "react-router-dom";
import { useAtomValue } from 'jotai';
import { adminAtom } from '../../Atoms/admin';
import { UserIdAtom } from '../../Atoms/userid';
import { showToastError } from "../Style/Notifications";
const AdminRoute = ({ children }) => {
  const admin = useAtomValue(adminAtom);
    if (!admin) {
        showToastError(`Vous devez être administrateur pour voir cette page.`);
        return <Navigate to="/" replace />;
    }
    return children;
};
export default AdminRoute;