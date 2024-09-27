import { filter } from "lodash";
import { elementList } from "../lib/elementList";
import { Shape } from "../types/Shape";
import { applyRules } from "./applyRules";
import { getNeighboursWithSides } from "./getNeighboursWithSides";

export const getShape = (
    grid: string[][],
    x: number,
    y: number,
    density: number,
    rule: number
): Shape => {
    const options = filter(
        elementList,
        ({ colorDensity }) => colorDensity === density
    );

    const neighbours = getNeighboursWithSides(x, y, grid);
    const element = applyRules(rule, neighbours, options);

    return {
        result: element?.result.name,
        description: {
            neighbours,
            options,
            reason: element?.reason,
            finalOptions: element?.finalOptions,
        },
    };
};
