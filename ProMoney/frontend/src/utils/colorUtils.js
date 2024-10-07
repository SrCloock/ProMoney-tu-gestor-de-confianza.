
const generateRandomColor = (minSat, maxSat, minLight, maxLight, hueStart, hueEnd) => {
  const hue = Math.floor(Math.random() * (hueEnd - hueStart + 1)) + hueStart;
  const saturation = Math.floor(Math.random() * (maxSat - minSat + 1)) + minSat;
  const lightness = Math.floor(Math.random() * (maxLight - minLight + 1)) + minLight;
  return `hsl(${hue}, ${saturation}%, ${lightness}%)`;
};

export const generateIncomeColors = () => {
  return [
      generateRandomColor(86, 87, 50, 60, 120, 140),
      generateRandomColor(86, 87, 50, 60, 140, 160),
      generateRandomColor(86, 87, 50, 60, 160, 180),
  ];
};
export const generateExpenseColors = () => {
  return [
      'hsl(0, 100%, 50%)',
      'hsl(20, 100%, 50%)',
      'hsl(30, 100%, 50%)',
  ];
};

export const generateSavingsColors = () => {
  return [
      'hsl(183, 50%, 73%)',
      'hsl(190, 50%, 73%)',
      'hsl(197, 50%, 73%)',
      'hsl(205, 50%, 73%)',
      'hsl(215, 50%, 73%)',
  ];
};
