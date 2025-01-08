import { useMemo } from "react";

import { getElements } from "../utils/getElements";
import { getSlicedGrid } from "../utils/getSlicedGrid";
import { size } from "lodash";
import { Cell } from "../types/General";

export const useGrid = (
  defaultGrid: string[][],
  grid: string[][],
  activeCell: Cell | undefined
) => {
  const randomGrid = useMemo(() => {
    return getElements(0, 0, defaultGrid, undefined, true);
  }, [defaultGrid]);

  const slicedGrid = useMemo(() => {
    if (size(defaultGrid) === 0 || size(grid) === 0 || !activeCell) {
      return [];
    }
    return getSlicedGrid(grid, defaultGrid, activeCell);
  }, [grid, defaultGrid, activeCell]);

  return { randomGrid, slicedGrid };
};
