export const mapGrid = (
  grid: string[][],
  processCellCallback: (x: number, y: number) => void,
  timeout: number = 0,
  stopCondition?: (x: number, y: number) => boolean,
  callback?: () => void
) => {
  let currentTimeout = 0;
  let stop = false;

  const processCell = (x: number, y: number) => {
    if (stop) return;

    if (timeout === 0) {
      processCellCallback(x, y);
      if (stopCondition && stopCondition(x, y)) {
        stop = true;
      }
    } else {
      setTimeout(() => {
        if (stop) return;

        processCellCallback(x, y);

        if (stopCondition && stopCondition(x, y)) {
          stop = true;
        }
      }, currentTimeout);

      currentTimeout += timeout;
    }
  };

  // Iterate over the rows
  for (let y = 0; y < grid.length; y++) {
    // If the row is even, iterate from left to right
    if (y % 2 === 0) {
      for (let x = 0; x < grid[y].length; x++) {
        processCell(x, y);
        if (stop) break;
      }
    } else {
      // If the row is odd, iterate from right to left
      for (let x = grid[y].length - 1; x >= 0; x--) {
        processCell(x, y);
        if (stop) break;
      }
    }
  }

  if (callback) {
    setTimeout(() => {
      callback();
    }, currentTimeout);
  }
};
