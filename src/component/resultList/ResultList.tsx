'use client'
import { Collapse, Grid, Stack, Typography } from "@mui/material";
import { useDice } from "@/shared";
import { TransitionGroup } from "react-transition-group";


interface IListRowProps {
  time: string;
  guess: string | number;
  result: string | number;
  isWon?: boolean;
}

const ListRow = ({guess, result, time, isWon}: IListRowProps) => {
  console.log('time', time)
  return (
    <Grid
      container
      spacing={2}
      columns={10}
      p={1}
      sx={({palette}) => ({borderBottom: `1px solid ${palette.divider}`})}>
      <Grid size={3}><Typography variant='body2'>{time}</Typography></Grid>
      <Grid size={4}><Typography variant='body2'>{guess}</Typography></Grid>
      <Grid size={3}>
        <Typography variant='body2' color={isWon === undefined ? 'inherit' : isWon ? 'success' : 'error'}>
          {result}
        </Typography></Grid>
    </Grid>
  )
}


export const ResultList = () => {
  const {gameResults} = useDice();
  const results = gameResults ?? [];

  return (
    <Stack spacing={1} className={"slide-in-left-animation"} px={2}>
      <ListRow time={'Time'} guess={'Guess'} result={'Result'}/>
      <TransitionGroup>
        {results.map(({time, result, guess, isWon}, idx) => (
          <Collapse key={idx}>
            <ListRow time={time} guess={guess} result={result} isWon={isWon}/>
          </Collapse>
        ))}
      </TransitionGroup>
    </Stack>
  );
};