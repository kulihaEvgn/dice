import { Box, CircularProgress, Stack } from '@mui/material';

export default function Loading() {
  return (
    <Stack width="100%" height="100%" alignItems="center" justifyContent="center" flex={1}>
      <Box>
        <CircularProgress color="secondary" size={48} />
      </Box>
    </Stack>
  );
}
