import React from 'react';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import Button from '@mui/material/Button';
import { Box, Paper } from '@mui/material';

interface GameDeleteDialogProps {
  open: boolean;
  onClose: () => void;
  onConfirm: () => void;
}

const GameDeleteDialog: React.FC<GameDeleteDialogProps> = ({ open, onClose, onConfirm }) => {
  return (
    <Dialog open={open} onClose={onClose} PaperComponent={Paper} PaperProps={{ sx: { borderRadius: '15px', backgroundColor: '#1B2837' } }}>
        <Box paddingBottom={1} paddingRight={1}>
            <DialogTitle color="white">Excluir</DialogTitle>
            <DialogContent >
                <p style={{color:'white'}}>Tem certeza que deseja excluir?</p>
            </DialogContent>
            <DialogActions>
                <Button
                    variant="contained"
                    color="primary"
                    onClick={onClose}
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
                    onClick={onConfirm}
                    sx={{
                    backgroundColor: '#1A3A53',
                    borderRadius: '30px',
                    '&:hover': {
                        backgroundColor: '#2A4D6E',
                    },
                    }}
                >
                Confirmar
                </Button>
            </DialogActions>
        </Box> 
    </Dialog>
  );
};

export default GameDeleteDialog;
