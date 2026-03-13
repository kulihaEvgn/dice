import { IGameResult } from "@/shared";

export interface IDiceState {
  gameResults: IGameResult[];
  setGameResults?: (result: IGameResult) => void;
}