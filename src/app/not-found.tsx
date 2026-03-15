import Link from 'next/link';
import { Button, Stack, Typography } from '@mui/material';

export default function NotFound() {
  return (
    <Stack justifyContent="center" alignItems="center" width={'100%'} height={'100%'} spacing={2}>
      <Typography variant="h1">Not Found</Typography>
      <Typography variant="body1">Could not find requested resource</Typography>
      <Button variant="contained">
        <Link href="/dice">Back to game</Link>
      </Button>
    </Stack>
  );
}
