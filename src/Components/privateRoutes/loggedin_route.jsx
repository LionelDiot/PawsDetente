import React, { useState, useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import { useAtomValue } from 'jotai';
import { loggedInAtom } from '../../Atoms/loggedin';
import { showToastError } from '../Style/Notifications';
import LoadingComponent from '../Loading/loading';
const LoggedInRoute = ({ children }) => {
  const loggedIn = useAtomValue(loggedInAtom);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    console.log('LoggedInRoute - useEffect - Mounting');

    // Simulate an asynchronous operation to update the loading state
    const delay = setTimeout(() => {
      setIsLoading(false);
    }, 500);

    return () => {
      console.log('LoggedInRoute - useEffect - Unmounting');
      clearTimeout(delay); // Clean up the timeout on component unmount
    };
  }, []);

  useEffect(() => {
    console.log('LoggedInRoute - useEffect - loggedIn changed:', loggedIn);
  }, [loggedIn]);

  if (isLoading) {
    console.log('LoggedInRoute - Rendering - Loading...');
    return <LoadingComponent />; // Render a loading state while the value is being updated
  }

  if (!loggedIn) {
    console.log('LoggedInRoute - Rendering - Not logged in');
    showToastError('Vous devez être connecté pour voir cette page.');
    return <Navigate to="/login" replace />;
  }

  console.log('LoggedInRoute - Rendering - Logged in');
  return children;
};

export default LoggedInRoute;

