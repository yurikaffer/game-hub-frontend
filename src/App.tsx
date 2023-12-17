import './App.css';
import GameCarousel from './components/List/GameCarouselComponent';
import ListGameComponent from './components/List/ListGameComponent';
import { Box } from '@mui/material';
import NavbarComponent from './components/Navbar/NavbarComponent';
import theme from './theme'
import { ThemeProvider } from '@mui/material/styles';

function App() {
  return (
    <ThemeProvider theme={theme}>

      <Box
        display="flex"
        flexDirection="column"
        alignItems="center"
      >
        <NavbarComponent/>
        <GameCarousel/>
        <ListGameComponent/>
      </Box>
    </ThemeProvider>
    );
}

export default App;
