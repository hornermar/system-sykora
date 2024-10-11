import { find } from "lodash";
import { elementList } from "../lib/elementList";
import { Sides } from "../types/General";
import { Neighbour } from "../types/Neighbour";

const getElementProperties = (elementName: string, side: Sides) => {
  const element = find(elementList, ({ name }) => name === elementName);
  return element && element[side];
};

export const getNeighboursWithSides = (
  x: number,
  y: number,
  grid: string[][]
) => {
  const neighbours: Neighbour = {};
  // top
  if (y > 0) {
    const position = { x, y: y - 1 };
    const name = grid[position.y][position.x];
    const neighbour = getElementProperties(name, "bottom");

    if (neighbour) neighbours.bottom = { ...neighbour, name: name, position };
  }
  // right
  if (x < grid[y].length - 1) {
    const position = { x: x + 1, y };
    const name = grid[position.y][position.x];
    const neighbour = getElementProperties(name, "left");

    if (neighbour) neighbours.left = { ...neighbour, name: name, position };
  }
  // bottom
  if (y < grid.length - 1) {
    const position = { x, y: y + 1 };
    const name = grid[position.y][position.x];
    const neighbour = getElementProperties(name, "top");

    if (neighbour) neighbours.top = { ...neighbour, name: name, position };
  }
  // left
  if (x > 0) {
    const position = { x: x - 1, y };
    const name = grid[position.y][position.x];
    const neighbour = getElementProperties(name, "right");

    if (neighbour) neighbours.right = { ...neighbour, name: name, position };
  }

  return neighbours;
};
