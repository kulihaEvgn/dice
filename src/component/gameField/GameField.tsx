'use client'
import { useCallback, useRef, useState } from "react";
import { AlertColor, Button, Stack } from "@mui/material";
import {
  Alert,
  Counter,
  Flex,
  GameTypeButtons,
  GameTypeE,
  getCurrentTime,
  getRandomNumber,
  IGameResult,
  Slider,
  useDice,
} from "@/shared";


export const checkIsWin = (gameType: GameTypeE, guessNumber: number, result: number): boolean => {
  switch (gameType) {
    case GameTypeE.over:
      return result >= guessNumber;
    case GameTypeE.under:
      return result <= guessNumber;
    default:
      return false;
  }
}


const getResult = (gameType: GameTypeE, guessNumber: number, result: number): IGameResult => {
  return {
    guess: `${gameType} ${guessNumber}`,
    result: result,
    time: getCurrentTime(),
    isWon: checkIsWin(gameType, guessNumber, result),
  }
}

export const GameField = () => {
  const {setGameResults} = useDice();

  const [alertType, setAlertType] = useState<AlertColor | null>(null);
  const [gameType, setGameType] = useState<GameTypeE>(GameTypeE.over);
  const [sliderValue, setSliderValue] = useState<number>(0);
  const [counterValue, setCounterValue] = useState(5);
  const [isRolling, setIsRolling] = useState(false);


  const handlePlay = () => {
    const random = getRandomNumber();
    setCounterValue(random);
  }

  const onRollingStart = useCallback(() => {
    setIsRolling(true);
  }, []);

  const onRollingFinish = useCallback(() => {
    setIsRolling(false);

    const result = getResult(gameType, sliderValue, counterValue);

    if (result.isWon) {
      setAlertType('success');
    } else {
      setAlertType('warning');
    }

    console.log('result', result)

    setGameResults?.(result);

  }, [gameType, sliderValue, counterValue]);


  return (
    <>
      <Stack p={5} className={'slide-in-top-animation'}>

        <Flex alignItems="center" justifyContent="center">
          <Counter
            value={counterValue}
            isRolling={isRolling}
            onRollingStart={onRollingStart}
            onRollingFinish={onRollingFinish}
          />
        </Flex>

        <Flex alignItems='center' justifyContent='center'>
          <GameTypeButtons selectedGameType={gameType} setSelectedGameType={setGameType}/>
        </Flex>

        <Slider value={sliderValue} onChange={setSliderValue}/>

        <Button
          disabled={isRolling}
          variant="contained"
          sx={({palette}) => ({bgcolor: palette.secondary.main})}
          onClick={handlePlay}
        >
          Play
        </Button>

      </Stack>

      <Alert
        type={alertType}
        open={!!alertType}
        onClose={() => setAlertType(null)}
        message="lorem ipsum dolor lorem ipsum dolor  lorem ipsum dolor"
      />
    </>
  );
};