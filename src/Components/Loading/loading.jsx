import React from 'react';
import { CircularProgress, Typography } from '@mui/material';

const LoadingComponent = () => {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', height: '100%', marginTop: '30px' }}>
      <CircularProgress size={80} thickness={4} />
      <Typography variant="h6" style={{ marginTop: '30px' }}>
        Chargement...
      </Typography>
    </div>
  );
};

export default LoadingComponent;
