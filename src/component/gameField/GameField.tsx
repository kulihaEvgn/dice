'use client';
import { Button, Stack } from '@mui/material';
import { Alert, Counter, Flex, GameTypeButtons, Slider, useDiceGame } from '@/shared';

export const GameField = () => {
  const {
    isRolling,
    alertType,
    alertMessage,
    setAlertType,
    gameType,
    setGameType,
    sliderValue,
    setSliderValue,
    counterValue,
    handlePlay,
    onRollingStart,
    onRollingFinish,
  } = useDiceGame();

  return (
    <>
      <Stack py={2} px={10} spacing={3} className={'slide-in-top-animation'}>
        <Flex alignItems="center" justifyContent="center">
          <Counter
            value={counterValue}
            isRolling={isRolling}
            onRollingStart={onRollingStart}
            onRollingFinish={onRollingFinish}
            width={320}
            height={320}
            typographyVariant={'h1'}
          />
        </Flex>

        <Flex alignItems="center" justifyContent="center">
          <GameTypeButtons
            selectedGameType={gameType}
            setSelectedGameType={setGameType}
            disabled={isRolling}
          />
        </Flex>

        <Slider value={sliderValue} onChange={setSliderValue} disabled={isRolling} />

        <Button
          disabled={isRolling}
          variant="contained"
          sx={({ palette }) => ({ bgcolor: palette.secondary.main })}
          onClick={handlePlay}
        >
          Play
        </Button>
      </Stack>

      <Alert
        message={alertMessage}
        type={alertType}
        open={!!alertType}
        onClose={() => setAlertType(null)}
      />
    </>
  );
};
