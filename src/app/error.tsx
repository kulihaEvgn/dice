'use client';

import { Box, Button, Stack, Typography } from '@mui/material';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <Stack
      width="100%"
      height="100%"
      alignItems="center"
      justifyContent="center"
      flex={1}
      spacing={2}
      px={2}
    >
      <Typography variant="h6" color="error" textAlign="center">
        Something went wrong
      </Typography>
      <Typography variant="body2" color="text.secondary" textAlign="center">
        {error.message}
      </Typography>
      <Box>
        <Button variant="contained" color="secondary" onClick={reset}>
          Try again
        </Button>
      </Box>
    </Stack>
  );
}
