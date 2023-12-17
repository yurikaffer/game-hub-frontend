import React, { useEffect, useState } from 'react';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import { Card } from '@mui/material';
import { GameService } from '../../service/GameService';
import { IGame } from '../../Models';

// Constantes para estilos
const carouselItemStyle: React.CSSProperties = {
  textAlign: 'center',
  width: '100%',
  height: '100%',
  backgroundColor: '#000',
};

const carouselImageStyle: React.CSSProperties = {
  width: '100%',
  height: '100%',
  objectFit: 'cover',
};

const GameCarousel: React.FC = () => {
  const [games, setGames] = useState<IGame[]>([]);

  // Efeito para buscar jogos ao montar o componente
  useEffect(() => {
    const fetchGames = async () => {
      try {
        // Obtém dados dos jogos
        const gamesData = await GameService.getGames();
        // Atualiza o estado com os primeiros 5 jogos
        setGames(gamesData.slice(0, 5));
      } catch (error) {
        console.error('Erro ao buscar lista de jogos:', error);
      }
    };

    fetchGames();
  }, []);

  return (
    <Card
      style={{
        justifyContent: 'center',
        alignItems: 'center',
        maxWidth: '50%',
        minWidth: '400px',
        borderRadius: '10px',
        overflow: 'hidden',
        backgroundColor: 'none'
      }}
    >
      {/* Componente Carousel para exibir os jogos */}
      <Carousel showThumbs={false}>
        {games.map((game) => (
          <div key={game.id} style={carouselItemStyle}>
            {/* Imagem do jogo dentro do item do carousel */}
            <img src={game.image} alt={game.name} style={carouselImageStyle} />
          </div>
        ))}
      </Carousel>
    </Card>
  );
};

export default GameCarousel;
