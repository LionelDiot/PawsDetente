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


    // Simulate an asynchronous operation to update the loading state
    const delay = setTimeout(() => {
      setIsLoading(false);
    }, 500);

    return () => {

      clearTimeout(delay); // Clean up the timeout on component unmount
    };
  }, []);

  useEffect(() => {

  }, [loggedIn]);

  if (isLoading) {

    return <LoadingComponent />; // Render a loading state while the value is being updated
  }

  if (!loggedIn) {


    return <Navigate to="/login" replace />;
  }


  return children;
  // const loggedIn = useAtomValue(loggedInAtom);
  // if (!loggedIn) {
  //     return <Navigate to="/login" replace />;
  // }
  // return children;
};

export default LoggedInRoute;

