import React, { useState, useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import { useAtomValue } from 'jotai';
import { loggedInAtom } from '../../Atoms/loggedin';
import { showToastError } from '../Style/Notifications';

const LoggedInRoute = ({ children }) => {
  const loggedIn = useAtomValue(loggedInAtom);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate an asynchronous operation to update the loading state
    const delay = setTimeout(() => {
      setIsLoading(false);
    }, 1000);

    return () => clearTimeout(delay); // Clean up the timeout on component unmount
  }, []);

  if (isLoading) {
    return <div>Loading...</div>; // Render a loading state while the value is being updated
  }

  if (!loggedIn) {
    showToastError('Vous devez être connecté pour voir cette page.');
    return <Navigate to="/login" replace />;
  }

  return children;
};

export default LoggedInRoute;
