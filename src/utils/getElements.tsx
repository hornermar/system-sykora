import { map } from "lodash";
import { elementList } from "../lib/elementList";
import { Cell } from "../types/General";
import { getColorDensity } from "./getColorDensity";
import { getShape } from "./getShape";
import { mapGrid } from "./mapGrid";

export const cellsToProcess = ["0", "+", "-"];

const processCell = (
  newGrid: string[][],
  x: number,
  y: number,
  coefficient: number,
  rule: number,
  isRandom?: boolean
) => {
  // If the cell is in the cellsToGenerate array
  if (cellsToProcess.includes(newGrid[y][x])) {
    if (isRandom) {
      const randomElement =
        elementList[Math.floor(Math.random() * elementList.length)];
      newGrid[y][x] = randomElement.name;
    } else {
      const { result: colorDensity } = getColorDensity(
        newGrid,
        x,
        y,
        coefficient
      );

      const { result: element } = getShape(newGrid, x, y, colorDensity, rule);

      newGrid[y][x] = element ?? "0";
    }
  }
};

export const getElements = (
  rule: number,
  coefficient: number,
  grid: string[][],
  endCell?: Cell,
  isRandom?: boolean
) => {
  // Create a copy of the grid
  const newGrid = map(grid, (row: string[]) => [...row]);

  mapGrid(newGrid, (x, y) => {
    if (endCell && endCell.x === x && endCell.y === y) return newGrid;
    else {
      processCell(newGrid, x, y, coefficient, rule, isRandom);
    }
  });

  return newGrid;
};
