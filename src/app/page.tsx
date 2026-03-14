import { Box, Stack } from '@mui/material';
import { GameField, ResultList } from '@/component';

export default function Home() {
  return (
    <Stack width={'100%'} height={'100%'}>
      {/*Counter section */}
      <Box width="100%" flex={1}>
        <GameField />
      </Box>

      {/*Game result section */}
      <Box width="100%" flex={1}>
        <ResultList />
      </Box>
    </Stack>
  );
}
