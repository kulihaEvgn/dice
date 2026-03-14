import { IGameResult } from './gameResult.interface';

export interface IDiceState {
  gameResults: IGameResult[];
  setGameResults?: (result: IGameResult) => void;
}
