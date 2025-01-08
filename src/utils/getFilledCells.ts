export const getFilledCells = (grid: string[][]): number => {
  let count = 0;
  for (const row of grid) {
    for (const cell of row) {
      if (cell !== "0") {
        count++;
      }
    }
  }
  return count;
};
