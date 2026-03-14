'use client';
import {
  capitalizeFirstLetter,
  GameTypeE,
  getCurrentTime,
  getRandomNumber,
  IGameResult,
  useDice,
} from '@/shared';
import { AlertColor } from '@mui/material';
import { useCallback, useState } from 'react';

export const checkIsWin = (gameType: GameTypeE, guessNumber: number, result: number): boolean => {
  if (gameType === GameTypeE.over) {
    return result >= guessNumber;
  }
  return result <= guessNumber;
};

const getResult = (gameType: GameTypeE, guessNumber: number, result: number): IGameResult => {
  return {
    guess: `${capitalizeFirstLetter(gameType)} ${guessNumber}`,
    result: result,
    time: getCurrentTime(),
    isWon: checkIsWin(gameType, guessNumber, result),
  };
};

const getAlertFailureMessage = (gameType: GameTypeE) => {
  if (gameType === GameTypeE.over) {
    return 'Number was lower';
  }
  return 'Number was higher';
};

export const useDiceGame = () => {
  const { setGameResults, setGuessDirection, guessDirection, setGuessValue, guessValue } =
    useDice();

  const [alertType, setAlertType] = useState<AlertColor | null>(null);
  const [alertMessage, setAlertMessage] = useState<string>('');
  const [isRolling, setIsRolling] = useState(false);
  const [resultValue, setResultValue] = useState<number>(0);

  const handlePlay = () => {
    const random = getRandomNumber();
    setResultValue(random);
  };

  const onRollingStart = useCallback(() => {
    setIsRolling(true);
    setAlertType(null);
    setAlertMessage('');
  }, []);

  const onRollingFinish = useCallback(() => {
    setIsRolling(false);

    const result = getResult(guessDirection, guessValue, resultValue);

    if (result.isWon) {
      setAlertType('success');
    } else {
      setAlertType('error');
      setAlertMessage(getAlertFailureMessage(guessDirection));
    }

    setGameResults?.(result);
  }, [guessDirection, guessValue, resultValue, setGameResults]);

  return {
    isRolling,
    setIsRolling,
    alertMessage,
    alertType,
    setAlertType,
    guessDirection,
    setGuessDirection,
    guessValue,
    setGuessValue,
    resultValue,
    setResultValue,
    handlePlay,
    onRollingStart,
    onRollingFinish,
  };
};
