export const getCurrentTime = () => {
  const hours = new Date().getHours();
  const minutes = new Date().getMinutes();
  let seconds: string | number = new Date().getSeconds();

  if (seconds.toString().length === 1) {
    seconds = `${seconds}0`;
  }

  return `${hours}:${minutes}:${seconds}`;
};
