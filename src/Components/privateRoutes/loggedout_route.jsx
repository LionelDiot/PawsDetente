import React, { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import { useAtomValue } from 'jotai';
import { loggedInAtom } from '../../Atoms/loggedin';
import LoadingComponent from '../Loading/loading';
const LoggedOutRoute = ({ children }) => {
  const loggedIn = useAtomValue(loggedInAtom);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate a timeout of 1.5 seconds
    const timeoutId = setTimeout(() => setIsLoading(false), 500);

    return () => clearTimeout(timeoutId);
  }, []);

  if (isLoading) {
    // Render a loading state or placeholder while waiting for the timeout
    return <LoadingComponent />;
  }

  if (loggedIn) {
    
    return <Navigate to="/" replace />;
  }

  return children;
  // const loggedIn = useAtomValue(loggedInAtom);
  // if (loggedIn) {

  //     return <Navigate to="/" replace />;
  // }
  // return children;
};

export default LoggedOutRoute;
