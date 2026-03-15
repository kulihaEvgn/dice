import { StateCreator } from 'zustand';
import { GameTypeE, IGameResult } from '../types';
import { createPersistStore } from '@/shared/lib/createPersistStore';

export interface IDiceState {
  guessValue: number;
  setGuessValue: (value: number) => void;

  guessDirection: GameTypeE;
  setGuessDirection: (direction: GameTypeE) => void;

  gameResults: IGameResult[];
  setGameResults: (result: IGameResult) => void;
}

const diceSlice: StateCreator<IDiceState> = (set) => ({
  guessValue: 0,
  setGuessValue: (value) => set({ guessValue: value }),

  guessDirection: GameTypeE.over,
  setGuessDirection: (direction) => set({ guessDirection: direction }),

  gameResults: [],
  setGameResults: (result) =>
    set((state) => {
      return {
        ...state,
        gameResults: state.gameResults.length < 10 ? [...state.gameResults, result] : [result],
      };
    }),
});

export const useDice = createPersistStore(diceSlice, 'dice-state');
