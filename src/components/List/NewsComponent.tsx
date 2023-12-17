import { Box, Divider, Typography } from "@mui/material";

const NewsComponent: React.FC = () => {

    return(
        <Box sx={{display: 'flex', alignItems: 'center', marginTop:'20px'}}>
            <Divider sx={{
                height: '15%',
                backgroundColor: '#214B6B',
                borderRadius: '50px',
                width: '6%',
                mr:3,
                padding: '5px'
            }} />

            <Typography variant="h4" sx={{ color: 'white' }}>
                Novidades
            </Typography>

            <Divider sx={{
                backgroundColor: '#214B6B',
                borderRadius: '50px',
                width: '26%',
                ml:3,
                padding: '5px'
            }} />
        </Box>
    );
}

export default NewsComponent