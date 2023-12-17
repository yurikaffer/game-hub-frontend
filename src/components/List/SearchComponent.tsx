import { Box } from "@mui/material";
import { useState } from "react";

interface SearchComponentProps {
    onFilterTextChange: (filterText: string) => void;
  }

const SearchComponent: React.FC<SearchComponentProps> = ({ onFilterTextChange }) => {
    const [isSearchHovered, setIsSearchHovered] = useState(false);
    const [filterText, setFilterText] = useState<string>('');

    const handleFilterTextChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newText = e.target.value;
        setFilterText(newText);
        onFilterTextChange(newText); // Notifica o pai sobre a mudança
      };

    return (
        <Box style={{ width: '20%', position: 'relative', paddingLeft: '8%'}}>
            <input
                onMouseEnter={() => setIsSearchHovered(true)}
                onMouseLeave={() => setIsSearchHovered(false)}
                type="text"
                id="searchInput"
                value={filterText}
                onChange={handleFilterTextChange}
                placeholder="Pesquisar"
                style={{
                    width: '100%',
                    minWidth: '100px',
                    height: '40px',
                    paddingLeft: 20,
                    borderRadius: '100px',
                    color: 'white',
                    border: 'none',
                    outline: 'none',
                    fontFamily: 'Noto Sans, sans-serif',
                    fontSize: '15px',
                    backgroundColor: isSearchHovered ? '#2A4D6E' : '#1A3A53',
                    transition: 'background-color 0.5s ease',
                }}
            />
        </Box>
    );
}

export default SearchComponent;