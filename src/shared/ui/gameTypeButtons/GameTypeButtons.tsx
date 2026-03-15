import { FormControl, FormControlLabel, Radio, RadioGroup, Typography } from '@mui/material';
import { GameTypeE, IListItem } from '@/shared/types';

const buttons: IListItem<GameTypeE>[] = [
  { label: 'Under', value: GameTypeE.under },
  { label: 'Over', value: GameTypeE.over },
];

interface IProps {
  selectedGameType: GameTypeE;
  setSelectedGameType: (selectedGameType: GameTypeE) => void;

  disabled?: boolean;
  disabledDirection?: GameTypeE | null;
}

export const GameTypeButtons = ({
  selectedGameType,
  setSelectedGameType,
  disabled = false,
  disabledDirection = null,
}: IProps) => {
  return (
    <FormControl>
      <RadioGroup
        row
        value={selectedGameType}
        onChange={(event) => setSelectedGameType(event.target.value as GameTypeE)}
      >
        {buttons.map(({ value, label }) => (
          <FormControlLabel
            key={value}
            value={value}
            control={
              <Radio
                color={'secondary'}
                size={'medium'}
                disabled={disabled || value === disabledDirection}
              />
            }
            labelPlacement={'start'}
            label={<Typography>{label}</Typography>}
          />
        ))}
      </RadioGroup>
    </FormControl>
  );
};
