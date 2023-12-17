import React, { useEffect, useState } from 'react';
import GameComponent from '../Game/GameComponent';
import { IGame } from '../../Models';
import { GameService } from '../../service/GameService';
import { Box } from '@mui/material';
import NewsComponent from './NewsComponent';
import SearchComponent from './SearchComponent';
import SortComponent from './SortComponent';

const ListGameComponent: React.FC = () => {
  const [games, setGames] = useState<IGame[]>([]);
  const [filteredGames, setFilteredGames] = useState<IGame[]>([]);
  const [filterText, setFilterText] = useState<string>('');
  const [sortBy, setSortBy] = useState<string>('name');
  const [isSortHovered, setIsSortHovered] = useState(false);

  useEffect(() => {
    const fetchGames = async () => {
      const gamesData = await GameService.getGames();
      setGames(gamesData);
      setFilteredGames(gamesData);
    };

    fetchGames();
  }, []);

  useEffect(() => {
    // Função de filtro e ordenação
    let filteredList = games.filter((game) =>
      game.name.toLowerCase().includes(filterText.toLowerCase())
    );

    if (sortBy === 'lowerprice' || sortBy === 'higherprice') {
      // Ordenar por preço
      filteredList = filteredList.sort((a, b) =>
        sortBy === 'lowerprice' ? a.price - b.price : b.price - a.price
      );
    } else {
      // Ordenar por nome de A a Z
      filteredList = filteredList.sort((a, b) =>
        a.name.toLowerCase() < b.name.toLowerCase() ? -1 : 1
      );
    }

    setFilteredGames(filteredList);
  }, [games, filterText, sortBy]);

  const handleFilterTextChange = (newFilterText: string) => {
    setFilterText(newFilterText);
  };

  const handleSortChange = (newSortBy: string) => {
    setSortBy(newSortBy);
  };

  return (
    <Box>
      <NewsComponent />
      <Box
        sx={{
          display: 'flex',
          marginBottom: '30px',
          marginTop: '30px',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
        }}
      >
        <SearchComponent onFilterTextChange={handleFilterTextChange} />
        <SortComponent
          sortBy={sortBy}
          isSortHovered={isSortHovered}
          onSortChange={handleSortChange}
          onMouseEnter={() => setIsSortHovered(true)}
          onMouseLeave={() => setIsSortHovered(false)}
        />
      </Box>

      <Box
        sx={{
          display: 'flex',
          flexDirection: 'row',
          flexWrap: 'wrap',
          justifyContent: 'center',
          alignItems: 'center',
          gap: '30px',
        }}
      >
        {filteredGames.map((game) => (
          <GameComponent key={game.id} id={game.id} />
        ))}
      </Box>
    </Box>
  );
};

export default ListGameComponent;
