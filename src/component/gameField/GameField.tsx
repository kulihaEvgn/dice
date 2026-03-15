'use client';
import { Button, Stack } from '@mui/material';
import { Alert, Counter, Flex, GameTypeButtons, Slider, useDiceGame } from '@/shared';

export const GameField = () => {
  const {
    isRolling,
    alertType,
    alertMessage,
    setAlertType,
    guessValue,
    resultValue,
    setGuessValue,
    setGuessDirection,
    guessDirection,
    handlePlay,
    onRollingStart,
    onRollingFinish,
  } = useDiceGame();

  return (
    <>
      <Stack py={2} px={10} spacing={3} className={'slide-in-top-animation'}>
        <Flex alignItems="center" justifyContent="center">
          <Counter
            value={resultValue}
            isRolling={isRolling}
            onRollingStart={onRollingStart}
            onRollingFinish={onRollingFinish}
            width={'80%'}
            typographyVariant={'h1'}
          />
        </Flex>

        <Flex alignItems="center" justifyContent="center">
          <GameTypeButtons
            selectedGameType={guessDirection}
            setSelectedGameType={setGuessDirection}
            disabled={isRolling}
          />
        </Flex>

        <Slider value={guessValue} onChange={setGuessValue} disabled={isRolling} />

        <Button
          disabled={isRolling}
          variant="contained"
          sx={({ palette }) => ({ bgcolor: palette.secondary.main })}
          onClick={handlePlay}
        >
          Play
        </Button>
      </Stack>

      {alertType && (
        <Alert
          message={alertMessage}
          type={alertType}
          open={!!alertType}
          onClose={() => setAlertType(null)}
        />
      )}
    </>
  );
};
