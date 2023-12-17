import React, { useState } from 'react';
import { Box, Tooltip, IconButton } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import GameDeleteDialog from './GameDeleteDialog';
import { GameService } from '../../service/GameService';
import GameFormComponent from '../Form/GameFormComponent';
import { IGame } from '../../Models';

interface GameEditControlsProps {
  isHovered: boolean;
  game: IGame
}

const GameEditControls: React.FC<GameEditControlsProps> = ({ isHovered, game }) => {
  const [deleteConfirmationOpen, setDeleteConfirmationOpen] = useState(false);
  const [editGameModalOpen, setEditGameModalOpen] = useState(false);

  const handleEditClick = () => {
    setEditGameModalOpen(true);
  };

  const handleCloseModal = () => {
    setEditGameModalOpen(false);
  };

  const handleDeleteClick = () => {
    setDeleteConfirmationOpen(true);
  };

  const handleDeleteConfirmationClose = () => {
    setDeleteConfirmationOpen(false);
  };

  const handleDeleteConfirmationConfirm = () => {
    handleDeleteConfirmationClose();
    GameService.delete(game.id);
    window.location.reload();
  };

  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'flex-end',
        paddingTop: 2,
        opacity: isHovered ? 1 : 0,
        transition: 'opacity 0.5s ease',
        flexDirection: 'row',
        marginTop: 'auto'
      }}
    >
      <div>
        <Tooltip placement="bottom" title="Editar" arrow>
          <IconButton 
            onClick={handleEditClick}
            style={{
              background: 'none',
              border: 'none',
              padding: 0,
              cursor: 'pointer',
              marginRight: 7,
              color: isHovered ? 'gray' : 'transparent',
            }}>
            <EditIcon/>
          </IconButton>
        </Tooltip>
        <Tooltip placement="bottom" title="Excluir" arrow>
          <IconButton 
              sx={{ cursor: 'pointer', color: isHovered ? 'gray' : 'transparent' }}
              onClick={handleDeleteClick}>
            <DeleteIcon/>
          </IconButton>
        </Tooltip>
      </div>

      <GameFormComponent 
        openModal={editGameModalOpen} 
        gameData={game} 
        handleCloseModal={handleCloseModal} 
      />
      
      <GameDeleteDialog
        open={deleteConfirmationOpen}
        onClose={handleDeleteConfirmationClose}
        onConfirm={handleDeleteConfirmationConfirm}
      />
    </Box>
  );
};

export default GameEditControls;
