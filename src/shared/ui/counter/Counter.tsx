import { Stack, Typography, TypographyProps } from '@mui/material';
import NumberFlow from '@number-flow/react';

interface IProps {
  value: number;

  isRolling?: boolean;

  onRollingStart?: () => void;
  onRollingFinish?: () => void;

  width?: number | string;
  height?: number | string;
  typographyColor?: TypographyProps['color'];
  typographyVariant?: TypographyProps['variant'];

  animationDuration?: number;
  animationIterations?: number;
}

export const Counter = ({
  value,
  isRolling,
  onRollingStart,
  onRollingFinish,
  width,
  height,
  typographyVariant,
  typographyColor,

  animationDuration = 200,
  animationIterations = 10,
}: IProps) => {
  return (
    <Stack
      bgcolor={'rgba(0, 0, 0, 0.02)'}
      alignItems="center"
      justifyContent="center"
      borderRadius={'10px'}
      boxShadow={'inset -10px -10px 5px -5px #00000030'}
      // maxWidth={width}
      width={width}
      // maxHeight={height}
      height={height}
      className={isRolling ? 'cube-animation' : ''}
      sx={{ aspectRatio: '1 / 1' }}
      overflow={'hidden'}
    >
      <Typography variant={typographyVariant} color={typographyColor}>
        <NumberFlow
          defaultValue={100}
          value={value}
          spinTiming={{ duration: animationDuration, iterations: animationIterations }}
          // trend={10}
          onAnimationsStart={onRollingStart}
          onAnimationsFinish={onRollingFinish}
        />
      </Typography>
    </Stack>
  );
};
