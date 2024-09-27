import { map } from "lodash";
import { elementList } from "../lib/elementList";
import { Cell } from "../types/General";
import { getColourDensity } from "./getColorDensity";
import { getShape } from "./getShape";

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
            const { result: colorDensity } = getColourDensity(
                newGrid,
                x,
                y,
                coefficient
            );

            const { result: element } = getShape(
                newGrid,
                x,
                y,
                colorDensity,
                rule
            );

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
    let newGrid = map(grid, (row: string[]) => [...row]);

    // Iterate over the rows
    for (let y = 0; y < grid.length; y++) {
        // If the row is even, iterate from left to right
        if (y % 2 === 0) {
            for (let x = 0; x < grid[y].length; x++) {
                if (endCell && endCell.x === x && endCell.y === y)
                    return newGrid;
                else {
                    processCell(newGrid, x, y, coefficient, rule, isRandom);
                }
            }
        } else {
            // If the row is odd, iterate from right to left
            for (let x = grid[y].length - 1; x >= 0; x--) {
                if (endCell && endCell.x === x && endCell.y === y)
                    return newGrid;
                else processCell(newGrid, x, y, coefficient, rule, isRandom);
            }
        }
    }

    return newGrid;
};
