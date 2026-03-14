import { Grid, Typography, TypographyProps } from '@mui/material';
import { ReactNode } from 'react';

interface IProps {
  time: string;
  guess: string | number;
  result: ReactNode;
  isWon?: boolean;

  isHeader?: boolean;
}

export const ListItem = ({ guess, result, time, isHeader }: IProps) => {
  const commonTextProps: Partial<TypographyProps> = {
    variant: isHeader ? 'h6' : 'body2',
  };

  return (
    <Grid
      container
      spacing={2}
      columns={10}
      p={1}
      alignItems={'center'}
      justifyContent={'center'}
      sx={({ palette }) => ({ borderBottom: `1px solid ${palette.divider}` })}
    >
      <Grid size={3}>
        <Typography align={'center'} {...commonTextProps}>
          {time}
        </Typography>
      </Grid>
      <Grid size={4}>
        <Typography align={'center'} {...commonTextProps}>
          {guess}
        </Typography>
      </Grid>
      <Grid size={3}>{result}</Grid>
    </Grid>
  );
};
