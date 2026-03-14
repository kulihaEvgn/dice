export const getRandomNumber = (min: number = 0, max: number = 101) => {
  return Math.floor(Math.random() * (max - min)) + min;
};
