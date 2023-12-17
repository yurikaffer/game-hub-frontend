import React, { useState, useEffect, useMemo } from 'react';
import { ICreateGame, IGame } from '../../Models';
import { GameService } from '../../service/GameService';
import { validateForm } from '../../service/FormServiceValidation';
import {
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Input,
  Box,
  CardMedia,
  Paper,
  Typography,
} from '@mui/material';

// Interface que define as propriedades esperadas pelo componente
interface GameFormProps {
  openModal: boolean; // Indica se o modal está aberto ou fechado
  handleCloseModal: () => void; // Função para fechar o modal
  gameData?: IGame; // Dados do jogo (opcional) para edição
}

const GameFormComponent: React.FC<GameFormProps> = ({ openModal, handleCloseModal, gameData }) => {
  // Estado inicial para os dados do novo jogo e os erros de validação
  const initialGameData: ICreateGame = useMemo(
    () => ({
      name: '',
      description: '',
      price: 0,
      image: '',
      link: '',
      file: null,
    }),
    []
  );

  const [newGameData, setNewGameData] = useState<ICreateGame>(initialGameData);
  const [validationErrors, setValidationErrors] = useState<Record<string, string>>({});

  // Efeito para preencher os dados do jogo ao abrir o modal em modo de edição
  useEffect(() => {
    if (gameData) {
      // Preenche os dados do jogo existente no estado local
      setNewGameData({
        ...initialGameData,
        ...gameData,
        file: null,
      });
    }
  }, [gameData, initialGameData]);

  // Efeito para limpar a URL da imagem ao desmontar o componente
  useEffect(() => {
    return () => {
      if (newGameData.file) {
        // Revoga a URL da imagem ao desmontar o componente
        URL.revokeObjectURL(URL.createObjectURL(newGameData.file));
      }
    };
  }, [newGameData.file]);

  // Função para lidar com o upload de uma nova imagem
  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // Atualiza o estado com a nova imagem
      setNewGameData((prevData) => ({ ...prevData, file }));
    }
  };

  // Função para lidar com as mudanças nos campos de entrada
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    // Atualiza o estado com os dados do formulário
    setNewGameData((prevData) => ({ ...prevData, [name]: value }));
  };

  // Função para lidar com a ação de salvar ou editar um jogo
  const handleAction = async () => {
    // Validação do formulário
    const { isValid, errors } = validateForm(newGameData);

    // Se houver erros de validação, atualiza o estado e interrompe a execução
    if (!isValid) {

      setValidationErrors(errors);
      return;
    }

    try {
      if (gameData) {
        // Modo de edição: Atualiza os dados do jogo existente
        await GameService.update({
          id: gameData.id,
          ...newGameData,
        });
      } else {
        // Modo de criação: Cria um novo jogo
        await GameService.create(newGameData);
      }

      // Recarrega a página e fecha o modal
      window.location.reload();
      handleCloseModal();
    } catch (error) {
      console.error('Erro ao salvar jogo:', error);
    }
  };

  // Função para limpar os dados do formulário e fechar o modal
  const handleClearGameData = () => {
    // Limpa os erros de validação, reseta os dados e fecha o modal
    setValidationErrors({});
    setNewGameData(initialGameData);
    handleCloseModal();
  };

  // Renderização do componente
  return (
    <Dialog open={openModal} onClose={handleClearGameData} PaperComponent={Paper} PaperProps={{ sx: { borderRadius: '15px', backgroundColor: '#1B2837' } }}>
      <Box sx={{ paddingTop: 2, paddingBottom: 2}}>
        <DialogTitle variant="h5" color="white">
          {gameData ? 'Editar Jogo' : 'Cadastrar Novo Jogo'}
        </DialogTitle>
        <DialogContent sx={{ backgroundColor: '#1B2837' }}>
          <TextField
            label="Nome"
            name="name"
            value={newGameData.name}
            onChange={handleInputChange}
            fullWidth
            margin="normal"
            error={!!validationErrors.name}
            helperText={validationErrors.name}
          />
          <TextField
            label="Descrição"
            name="description"
            value={newGameData.description}
            onChange={handleInputChange}
            fullWidth
            margin="normal"
            error={!!validationErrors.description}
            helperText={validationErrors.description}
          />
          <TextField
            label="Link do jogo"
            name="link"
            value={newGameData.link}
            onChange={handleInputChange}
            fullWidth
            margin="normal"
            error={!!validationErrors.link}
            helperText={validationErrors.link}
          />
          <TextField
            label="Preço"
            name="price"
            type="number"
            value={newGameData.price}
            onChange={handleInputChange}
            fullWidth
            margin="normal"
          />
          <Input type="file" inputProps={{ accept: 'image/*' }} onChange={handleImageUpload} style={{ display: 'none' }} id="image-upload" />
          <Box>
            <Box paddingTop={1} display={'flex'} flexDirection={'row'} alignItems={'center'} gap={2}>
              <label htmlFor="image-upload">
                <Button
                  variant="contained"
                  component="span"
                  sx={{
                    backgroundColor: '#1A3A53',
                    borderRadius: '30px',
                    '&:hover': {
                      backgroundColor: '#2A4D6E',
                    },
                  }}
                >
                  Upload de Imagem
                </Button>
              </label>
              <Typography variant="body2" color="error">
                {validationErrors.file}
              </Typography>
            </Box>
            {newGameData.file && (
              <Box>
                <CardMedia
                  component="img"
                  alt={newGameData.name}
                  image={newGameData.file && URL.createObjectURL(newGameData.file)}
                  style={{
                    maxWidth: '550px',
                    maxHeight: '250px',
                    objectFit: 'cover',
                    marginTop: '15px',
                  }}
                />
              </Box>
            )}
            {gameData && !newGameData.file && (
              <Box>
                <CardMedia
                  component="img"
                  alt={gameData.name}
                  image={gameData.image}
                  style={{
                    maxWidth: '550px',
                    maxHeight: '250px',
                    objectFit: 'cover',
                    marginTop: '15px',
                  }}
                />
              </Box>
            )}
          </Box>
        </DialogContent>
        <DialogActions sx={{ backgroundColor: '#1B2837', paddingRight: 3 }}>
          <Button
            variant="contained"
            onClick={handleClearGameData}
            sx={{
              backgroundColor: '#1A3A53',
              borderRadius: '30px',
              '&:hover': {
                backgroundColor: '#2A4D6E',
              },
            }}
          >
            Cancelar
          </Button>
          <Button
            variant="contained"
            color="primary"
            onClick={handleAction}
            sx={{
              backgroundColor: '#1A3A53',
              borderRadius: '30px',
              '&:hover': {
                backgroundColor: '#2A4D6E',
              },
            }}
          >
            {gameData ? 'Editar' : 'Cadastrar'}
          </Button>
        </DialogActions>
      </Box>
    </Dialog>
  );
};

export default GameFormComponent;
