import { useCallback } from "react";
import { useLocalStorage } from "./useLocalStorage";
import { createEmptyGrid } from "../utils/createEmptyGrid";

export const useDefaultGrid = () => {
  const [defaultGrid, setDefaultGrid] = useLocalStorage<string[][]>(
    "defaultGrid",
    [[]]
  );

  const onDefaultGridChange = useCallback(
    (newDefaultGrid: string[][]) => {
      setDefaultGrid(newDefaultGrid);
    },
    [setDefaultGrid]
  );

  const clearGrid = useCallback(
    (rows: number, columns: number) => {
      onDefaultGridChange(createEmptyGrid(rows, columns));
    },
    [onDefaultGridChange]
  );

  return {
    defaultGrid,
    onDefaultGridChange,
    clearGrid,
  };
};
