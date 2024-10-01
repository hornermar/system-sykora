import { useState, useCallback, useEffect } from "react";
import { getEmptyGrid } from "../utils/getEmptyGrid";

export const useGrid = (rows: number, columns: number) => {
  const [grid, setGrid] = useState<string[][]>(getEmptyGrid(rows, columns));

  const setEmptyGrid = useCallback(() => {
    setGrid(getEmptyGrid(rows, columns));
  }, [rows, columns]);

  useEffect(() => {
    setEmptyGrid();
  }, [rows, columns, setEmptyGrid]);

  return { grid, setGrid, setEmptyGrid };
};
