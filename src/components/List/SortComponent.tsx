import React from 'react';
import { Box, Select, MenuItem } from '@mui/material';

interface SortComponentProps {
  sortBy: string;
  isSortHovered: boolean;
  onSortChange: (newSortBy: string) => void;
  onMouseEnter: () => void;
  onMouseLeave: () => void;
}

const SortComponent: React.FC<SortComponentProps> = ({
  sortBy,
  isSortHovered,
  onSortChange,
  onMouseEnter,
  onMouseLeave,
}) => {
  const handleChange = (e: React.ChangeEvent<{ value: unknown }>) => {
    onSortChange(e.target.value as string);
  };

  return (
    <Box style={{ display: 'flex', alignItems: 'center', paddingRight: '8%' }}>
        <label style={{ color: 'white', fontFamily: 'Noto Sans, sans-serif', marginRight: '8px' }}>Ordenar:</label>
        <Box style={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
        <select
            onMouseEnter={onMouseEnter}
            onMouseLeave={onMouseLeave}
            value={sortBy}
            onChange={handleChange}
            style={{
            width: '150px',
            minWidth: '100px',
            height: '40px',
            paddingLeft: 20,
            borderRadius: '100px',
            color: 'white',
            border: 'none',
            outline: 'none',
            fontFamily: 'Noto Sans, sans-serif',
            fontSize: '15px',
            appearance: 'none',
            backgroundColor: isSortHovered ? '#2A4D6E' : '#1A3A53',
            transition: 'background-color 0.5s ease',
            }}
        >
            <option value="lowerprice">Preço Menor</option>
            <option value="higherprice">Preço Maior</option>
            <option value="name">Nome</option>
        </select>
        </Box>
    </Box>
  );
};

export default SortComponent;
