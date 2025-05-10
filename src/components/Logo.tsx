import React from 'react';
import { Box } from '@mui/material';

const Logo: React.FC = () => {
  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'flex-start',
        width: '100%',
        padding: 0,
        margin: 0,
        marginTop: '-70px',
      }}
    >
      <img
        src="https://i.imgur.com/BZB6dQe.png"
        alt="Revoada Logo"
        style={{
          maxWidth: '150px',
          height: 'auto',
        }}
      />
    </Box>
  );
};

export default Logo; 