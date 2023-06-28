import React, { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import { useAtomValue } from 'jotai';
import computeIsAdmin from '../../Tools/isAdmin';
import { UserIdAtom } from '../../Atoms/userid';
import { showToastError } from '../Style/Notifications';
import LoadingComponent from '../Loading/loading';
const AdminRoute = ({ children }) => {
  const userId = useAtomValue(UserIdAtom);
  const [isAdmin, setIsAdmin] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchIsAdmin = async () => {
      const isAdmin = await computeIsAdmin(userId);
      setIsAdmin(isAdmin);
      setIsLoading(false);
    };

    // Simulate a timeout of 1.5 seconds
    const timeoutId = setTimeout(fetchIsAdmin, 1200);

    return () => clearTimeout(timeoutId);
  }, [userId]);

  if (isLoading) {
    // Render a loading state or placeholder while waiting for the isAdmin value
    return <LoadingComponent />;
  }

  if (!isAdmin) {
    showToastError('Vous devez être administrateur pour voir cette page.');
    return <Navigate to="/" replace />;
  }

  return children;
};

export default AdminRoute;
