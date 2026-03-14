import { Slider as MuiSlider } from '@mui/material';
import { IListItem } from '@/shared';

const marks: IListItem<number>[] = [
  { label: '0', value: 0 },
  { label: '', value: 20 },
  { label: '', value: 40 },
  { label: '', value: 60 },
  { label: '', value: 80 },

  { label: '100', value: 100 },
];

interface IProps {
  value: number;
  onChange: (value: number) => void;
  disabled?: boolean;
}

export const Slider = ({ onChange, value, disabled = false }: IProps) => {
  return (
    <MuiSlider
      valueLabelDisplay="on"
      defaultValue={20}
      step={1}
      min={0}
      max={100}
      marks={marks}
      value={value}
      onChange={(_, value) => onChange(value)}
      color={'secondary'}
      size={'small'}
      disabled={disabled}
    />
  );
};
