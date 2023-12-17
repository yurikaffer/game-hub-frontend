import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  typography: {
    fontFamily: 'Noto Sans, sans-serif',
  },
  components: {
    MuiTextField: {
      styleOverrides: {
        root: {
          '& label': {
            color: 'white', // Cor do texto da label
          },
          '& input': {
            color: 'white', // Cor do texto do campo de entrada
            borderColor: 'white', // Cor do contorno
          },
          '& .MuiOutlinedInput-notchedOutline': {
            borderColor: 'white', // Cor do contorno quando o campo não está focado
          },
          '&:hover .MuiOutlinedInput-notchedOutline': {
            borderColor: 'gray', // Cor do contorno ao passar o mouse
          },
          '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
            borderColor: 'white', // Cor do contorno quando o campo está focado
          },
        },
      },
    },
    MuiCardContent: {
      styleOverrides: {
        root: {
          '&:last-child': {
            paddingBottom: 0,
          },
        },
      },
    },
  },
  palette: {
    primary: {
      main: '#214B6B' // ou qualquer outra cor desejada
    }
}});

export default theme;
