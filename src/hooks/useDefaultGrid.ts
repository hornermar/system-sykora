import { useState, useCallback, useEffect } from "react";

const createEmptyGrid = (rows: number, columns: number) => {
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

export const useDefaultGrid = (rows: number, columns: number) => {
  const [defaultGrid, setDefaultGrid] = useState<string[][]>(
    createEmptyGrid(rows, columns)
  );

  const getEmptyGrid = useCallback(() => {
    return createEmptyGrid(rows, columns);
  }, [rows, columns]);

  const setEmptyGrid = useCallback(() => {
    setDefaultGrid(createEmptyGrid(rows, columns));
  }, [rows, columns]);

  useEffect(() => {
    setEmptyGrid();
  }, [rows, columns, setEmptyGrid]);

  return { defaultGrid, getEmptyGrid, setDefaultGrid, setEmptyGrid };
};
