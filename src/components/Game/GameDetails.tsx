import React from 'react';
import { Box, Typography, Divider, CardContent } from '@mui/material';

interface GameDetailsProps {
  name: string;
  description: string;
  link: string;
}

const GameDetails: React.FC<GameDetailsProps> = ({ name, description, link }) => {
  return (
    <Box padding={'30px'} sx={{ display: 'flex', flexDirection: 'column', flex: 1 }}>
      <a href={link} target="_blank" rel="noopener noreferrer" style={{ textDecoration: 'none', padding: 0 }}>
        <CardContent sx={{ padding: 0}}>
          <Typography variant="h4" sx={{ color: 'white', mb: 2 }}>
            {name}
          </Typography>
          <Typography variant="body2" sx={{
            color: 'gray',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            display: '-webkit-box',
            WebkitBoxOrient: 'vertical',
            WebkitLineClamp: 3,
            height: '5em',
            paddingBottom: 1,
          }}>
            {description}
          </Typography>
        </CardContent>
      </a>
      <Divider sx={{
        height: '5px',
        backgroundColor: '#214B6B',
        borderRadius: '50px',
        width: '20%',
        marginTop: '10px'
      }} />
    </Box>
  );
};

export default GameDetails;
