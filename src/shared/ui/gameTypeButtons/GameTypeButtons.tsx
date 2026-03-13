import { FormControl, FormControlLabel, FormLabel, Radio, RadioGroup, Typography } from "@mui/material";
import { GameTypeE, ListItem } from "@/shared/types";

const buttons: ListItem<GameTypeE>[] = [
  {label: 'Under', value: GameTypeE.under},
  {label: 'Over', value: GameTypeE.over},
]

interface IProps {
  selectedGameType: GameTypeE;
  setSelectedGameType: (selectedGameType: GameTypeE) => void;
}


export const GameTypeButtons = ({selectedGameType, setSelectedGameType}: IProps) => {
  return (
    <FormControl>
      <RadioGroup
        row
        value={selectedGameType}
        onChange={(event) => setSelectedGameType(event.target.value as GameTypeE)}
      >
        {buttons.map(({value, label}) => (
          <FormControlLabel
            key={value}
            value={value}
            control={<Radio color={'secondary'} size={'medium'}/>}
            labelPlacement={'start'}
            label={<Typography>{label}</Typography>}
          />
        ))}

      </RadioGroup>
    </FormControl>
  );
};