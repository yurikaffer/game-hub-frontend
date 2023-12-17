import React, { useState, useEffect } from 'react';
import { Card, Box, Typography } from '@mui/material';
import GameDetails from './GameDetails';
import GameEditControls from './GameEditControls';
import { GameService } from '../../service/GameService';
import { IGame } from '../../Models';
import GameCardMedia from './GameCardMedia';

interface GameComponentProps {
  id: string;
}

const GameComponent: React.FC<GameComponentProps> = ({ id }) => {
  const [game, setGame] = useState<IGame | null>(null);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    const fetchGame = async () => {
      try {
        const gameData = await GameService.getGame(id);
        setGame(gameData.data);
      } catch (error) {
        console.error('Erro ao buscar informações do jogo:', error);
      }
    };

    fetchGame();
  }, [id]);

  return (
    <>
      <Card
        sx={{
          display: 'flex',
          flexDirection: { xs: 'column', md: 'row' },
          height: 'auto',
          width: '85%',
          borderRadius: '30px',
          cursor: 'pointer',
          transition: 'transform 0.5s, background-color 0.5s',
          transform: isHovered ? 'scale(1.1)' : 'scale(1)',
          backgroundColor: '#17202D',
          '&:hover': {
            backgroundColor: '#101720',
          },
        }}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {game && (
          <>
            <GameCardMedia link={game.link} image={game.image} isHovered={isHovered} />
            <Box width={'100%'}>
              <GameDetails name={game.name} description={game.description} link={game.link} />
              <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', padding:'5px 30px 20px 20px' }}> 
                <GameEditControls isHovered={isHovered} game={game}/>
                <Typography variant="h4" color="white" sx={{ marginTop: 'auto' }}>$ {game.price}</Typography>
              </Box>
            </Box>
          </>
        )}
      </Card>
    </>
  );
};

export default GameComponent;
