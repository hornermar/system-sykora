export const createEmptyGrid = (rows: number, columns: number) => {
  const emptyGrrid: string[][] = [];
  for (let iy = 0; iy < rows; iy++) {
    const row = [];
    for (let ix = 0; ix < columns; ix++) {
      row.push("0");
    }
    emptyGrrid.push(row);
  }
  return emptyGrrid;
};
