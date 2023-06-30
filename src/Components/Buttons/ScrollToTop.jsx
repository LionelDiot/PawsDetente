import React, { useState, useEffect } from 'react';
import { Fab, useScrollTrigger, Zoom } from '@mui/material';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';

const ScrollToTopButton = () => {
  const [isVisible, setIsVisible] = useState(false);

  const trigger = useScrollTrigger({
    disableHysteresis: true,
    threshold: 200, // Show the button when scrolling down 200px or more
  });

  const handleClick = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  useEffect(() => {
    setIsVisible(trigger);
  }, [trigger]);

  return (
    <Zoom in={isVisible}>
      <Fab
        style={{
          position: 'fixed',
          bottom: 16,
          right: 16,
          zIndex: 9999,
        }}
        onClick={handleClick}
      >
        <KeyboardArrowUpIcon />
      </Fab>
    </Zoom>
  );
};

export default ScrollToTopButton;
