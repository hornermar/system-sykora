import { Cell } from "../types/General";

// slice grid in position of cell, rest replace with "0"
export const getSlicedGrid = (
    grid: string[][],
    defaultGrid: string[][],
    cell: Cell
) => {
    return grid.map((row, y) => {
        if (y < cell.y) return row;

        return row.map((value, x) => {
            if (y % 2 === 0) {
                return (y === cell.y && x >= cell.x) || y > cell.y
                    ? defaultGrid[y][x]
                    : value;
            } else {
                return (y === cell.y && x <= cell.x) || y > cell.y
                    ? defaultGrid[y][x]
                    : value;
            }
        });
    });
};
