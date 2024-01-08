import Box from '@mui/material/Box';
import CircularProgress from '@mui/material/CircularProgress';

export default function CircularIndeterminate() {
  return (
    <Box sx={{ display: 'flex items-center' }}>
      <CircularProgress  size="1rem" />
    </Box>
  );
}