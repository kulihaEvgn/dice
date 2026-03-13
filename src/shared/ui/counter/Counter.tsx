import { Stack, Typography } from "@mui/material";
import NumberFlow from '@number-flow/react'


interface IProps {
  value: number;

  isRolling?: boolean;

  onRollingStart?: () => void;
  onRollingFinish?: () => void;
}

export const Counter = ({ value, isRolling, onRollingStart, onRollingFinish }: IProps) => {
  return (
    <Stack
      bgcolor={'rgba(0, 0, 0, 0.02)'}
      alignItems="center"
      justifyContent="center"
      borderRadius={'20px'}
      boxShadow={'inset -10px -10px 5px -5px #00000030'}
      width="320px"
      height="320px"
      className={isRolling ? 'cube-animation' : ''}
    >
      <Typography variant={'h1'}>
        <NumberFlow
          defaultValue={100}
          value={value}
          spinTiming={{ duration: 200, iterations: 10 }}
          trend={10}
          onAnimationsStart={onRollingStart}
          onAnimationsFinish={onRollingFinish}

        />
      </Typography>

    </Stack>
  );
};