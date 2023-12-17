import React from 'react';
import { CardMedia, Box } from '@mui/material';

interface GameCardProps {
  link: string;
  image: string;
  isHovered: boolean;
}

const GameCardMedia: React.FC<GameCardProps> = ({ link, image, isHovered }) => {
  return (
    <Box
      sx={{
        width: { xs: '100%', md: '40%' },
        flexShrink: 0,
        overflow: 'hidden',
      }}
    >
      <a href={link} target="_blank" rel="noopener noreferrer">
        <CardMedia
          component="img"
          alt="Game Image"
          image={image}
          sx={{
            width: '100%',
            minHeight: '100%',
            height: '250px',
            maxHeight: { xs: '300px', md: '300px' },
            objectFit: 'cover',
          }}
        />
      </a>
    </Box>
  );
};

export default GameCardMedia;
