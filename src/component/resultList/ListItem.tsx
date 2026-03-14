import { Grid, Typography, TypographyProps } from '@mui/material';
import { Counter, Flex } from '@/shared';

interface IResultItemProps {
  result: string | number;
}
const ResultItem = ({ result }: IResultItemProps) => {
  return (
    <Flex alignItems={'center'} justifyContent={'center'} spacing={1}>
      <Counter
        value={+result}
        width={35}
        height={35}
        animationDuration={100}
        animationIterations={1}
      />
    </Flex>
  );
};

interface IProps {
  time: string;
  guess: string | number;
  result: string | number;
  isWon?: boolean;

  isHeader?: boolean;
}

export const ListItem = ({ guess, result, time, isHeader, isWon }: IProps) => {
  const getResultColor = () => {
    if (isWon === true) return 'success';
    return 'error';
  };
  const commonTextProps: Partial<TypographyProps> = {
    variant: isHeader ? 'h6' : 'body2',
    align: 'center',
  };
  return (
    <Grid
      container
      spacing={2}
      columns={10}
      p={0.5}
      alignItems={'center'}
      justifyContent={'center'}
      sx={({ palette, alpha }) => ({
        borderRadius: '10px',
        borderBottom: `1px solid ${palette.divider}`,
        backgroundColor: isHeader ? 'inherit' : alpha(palette[getResultColor()].main, 0.1),
      })}
    >
      <Grid size={3}>
        <Typography {...commonTextProps}>{time}</Typography>
      </Grid>
      <Grid size={4}>
        <Typography {...commonTextProps}>{guess}</Typography>
      </Grid>
      <Grid size={3}>
        {isHeader ? (
          <Typography {...commonTextProps}>{result}</Typography>
        ) : (
          <ResultItem result={result} />
        )}
      </Grid>
    </Grid>
  );
};
