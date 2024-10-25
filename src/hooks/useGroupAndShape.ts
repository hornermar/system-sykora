import { useMemo } from "react";
import { getColorDensity } from "../utils/getColorDensity";
import { getShape } from "../utils/getShape";
import { size } from "lodash";
import { Cell } from "../types/General";
import { FormValues } from "../types/FormValues";

export const useGroupAndShape = (
  slicedGrid: string[][] | null,
  grid: string[][],
  activeCell: Cell | undefined,
  form: FormValues
) => {
  const group = useMemo(() => {
    if (size(slicedGrid) === 0 || !activeCell) {
      return null;
    }
    return getColorDensity(
      slicedGrid as string[][],
      activeCell.x,
      activeCell.y,
      form.coefficient
    );
  }, [slicedGrid, activeCell, form.coefficient]);

  const shape = useMemo(() => {
    if (size(slicedGrid) === 0 || !group || !activeCell) {
      return null;
    }
    return getShape(grid, activeCell.x, activeCell.y, group.result, form.rule!);
  }, [grid, activeCell, group, form.rule, slicedGrid]);

  return { group, shape };
};
