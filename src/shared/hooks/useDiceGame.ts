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
  const { setGameResults } = useDice();

  const [alertType, setAlertType] = useState<AlertColor | null>(null);
  const [alertMessage, setAlertMessage] = useState<string>('');
  const [gameType, setGameType] = useState<GameTypeE>(GameTypeE.over);
  const [sliderValue, setSliderValue] = useState<number>(0);
  const [counterValue, setCounterValue] = useState(0);
  const [isRolling, setIsRolling] = useState(false);

  const handlePlay = () => {
    const random = getRandomNumber();
    setCounterValue(random);
  };

  const onRollingStart = useCallback(() => {
    setIsRolling(true);
    setAlertType(null);
    setAlertMessage('');
  }, []);

  const onRollingFinish = useCallback(() => {
    setIsRolling(false);

    const result = getResult(gameType, sliderValue, counterValue);

    if (result.isWon) {
      setAlertType('success');
    } else {
      setAlertType('error');
      setAlertMessage(getAlertFailureMessage(gameType));
    }

    setGameResults?.(result);
  }, [gameType, sliderValue, counterValue, setGameResults]);

  return {
    isRolling,
    setIsRolling,
    alertMessage,
    alertType,
    setAlertType,
    gameType,
    setGameType,
    sliderValue,
    setSliderValue,
    counterValue,
    setCounterValue,
    handlePlay,
    onRollingStart,
    onRollingFinish,
  };
};
