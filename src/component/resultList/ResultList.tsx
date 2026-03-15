'use client';
import { Collapse, Stack } from '@mui/material';
import { useDice } from '@/shared';
import { TransitionGroup } from 'react-transition-group';
import { ListItem } from './ListItem';

export const ResultList = () => {
  const gameResults = useDice((state) => state.gameResults);

  return (
    <Stack
      className={'slide-in-left-animation'}
      spacing={1}
      p={2}
      sx={{ boxShadow: '0 0 10px 0 rgba(0, 0, 0, 0.1)', borderRadius: '10px' }}
    >
      <ListItem time={'Time'} guess={'Guess'} result={'Result'} isHeader />
      <TransitionGroup style={{ display: 'flex', flexDirection: 'column', gap: '5px' }}>
        {gameResults.map(({ time, result, guess, isWon }, idx) => (
          <Collapse orientation="vertical" key={`${time}-${idx}-${isWon}`}>
            <ListItem time={time} guess={guess} result={result} isWon={isWon} />
          </Collapse>
        ))}
      </TransitionGroup>
    </Stack>
  );
};
