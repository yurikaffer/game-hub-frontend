import React, { useState } from 'react';
import { AppBar, Toolbar, Typography, Button } from '@mui/material';
import GameFormComponent from '../Form/GameFormComponent';

const NavbarComponent: React.FC = () => {
  const [openModal, setOpenModal] = useState(false);

  // Método para alternar entre abrir e fechar o modal
  const handleToggleModal = () => {
    setOpenModal((prev) => !prev);
  };

  return (
    <>
      <AppBar position="static" sx={{ backgroundColor: '#1B2837', boxShadow: 'none' }}>
        <Toolbar sx={{ margin: 2, border: 'none' }}>
          <Typography variant="h4" component="div" sx={{ flexGrow: 1 }}>
            GameHub
          </Typography>
          <Button
            color="inherit"
            onClick={handleToggleModal}
            sx={{
              padding: '5px 15px',
              backgroundColor: '#1A3A53',
              borderRadius: '30px',
              '&:hover': {
                backgroundColor: '#2A4D6E',
              },
            }}
          >
            Novo Jogo
          </Button>
        </Toolbar>
      </AppBar>

      <GameFormComponent openModal={openModal} handleCloseModal={handleToggleModal} />
    </>
  );
};

export default NavbarComponent;