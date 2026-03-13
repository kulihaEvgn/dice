export const getCurrentTime = () => {
  const hours = new Date().getHours();
  const minutes = new Date().getMinutes();
  const seconds = new Date().getSeconds();

  return `${hours}:${minutes}:${seconds}`;
}