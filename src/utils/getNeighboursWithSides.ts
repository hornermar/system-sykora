import { find } from "lodash";
import { elementList } from "../lib/elementList";
import { Sides } from "../types/General";
import { Neighbour } from "../types/Neighbout";

const getElementProperties = (elementName: string, side: Sides) => {
    const element = find(elementList, ({ name }) => name === elementName);
    return element && element[side];
};

export const getNeighboursWithSides = (
    x: number,
    y: number,
    grid: string[][]
) => {
    let neighbours: Neighbour = {};
    // top
    if (y > 0) {
        const name = grid[y - 1][x];
        const neighbour = getElementProperties(name, "bottom");

        if (neighbour) neighbours.bottom = { ...neighbour, name: name };
    }
    // right
    if (x < grid[y].length - 1) {
        const name = grid[y][x + 1];
        const neighbour = getElementProperties(name, "left");

        if (neighbour) neighbours.left = { ...neighbour, name: name };
    }
    // bottom
    if (y < grid.length - 1) {
        const name = grid[y + 1][x];
        const neighbour = getElementProperties(name, "top");

        if (neighbour) neighbours.top = { ...neighbour, name: name };
    }
    // left
    if (x > 0) {
        const name = grid[y][x - 1];
        const neighbour = getElementProperties(name, "right");

        if (neighbour) neighbours.right = { ...neighbour, name: name };
    }

    return neighbours;
};
