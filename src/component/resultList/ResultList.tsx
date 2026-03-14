'use client';
import { Box, Collapse, Stack, Typography } from '@mui/material';
import { Counter, Flex, useDice } from '@/shared';
import { TransitionGroup } from 'react-transition-group';
import { ListItem } from './ListItem';

interface IResultItemProps {
  result: string | number;
  isWon?: boolean;
}
const ResultItem = ({ result, isWon }: IResultItemProps) => {
  const getResultColor = () => {
    if (isWon === true) return 'success';
    return 'error';
  };

  return (
    <Flex alignItems={'center'} justifyContent={'start'} spacing={1}>
      <Counter
        value={+result}
        typographyColor={getResultColor()}
        width={40}
        height={40}
        animationDuration={200}
        animationIterations={1}
      />
      {/*<Box*/}
      {/*  sx={({ palette }) => ({*/}
      {/*    width: 16,*/}
      {/*    height: 16,*/}
      {/*    backgroundColor: palette[getResultColor()].main,*/}
      {/*    borderRadius: '50%',*/}
      {/*  })}*/}
      {/*/>*/}
    </Flex>
  );
};

export const ResultList = () => {
  const { gameResults } = useDice();
  const results = gameResults ?? [];

  return (
    <Stack spacing={1} className={'slide-in-left-animation'} px={2}>
      <ListItem
        time={'Time'}
        guess={'Guess'}
        result={<Typography variant={'h6'}>Result</Typography>}
        isHeader
      />
      <TransitionGroup>
        {results.map(({ time, result, guess, isWon }, idx) => (
          <Collapse key={idx}>
            <ListItem
              time={time}
              guess={guess}
              result={<ResultItem result={result} isWon={isWon} />}
              isWon={isWon}
            />
          </Collapse>
        ))}
      </TransitionGroup>
    </Stack>
  );
};
