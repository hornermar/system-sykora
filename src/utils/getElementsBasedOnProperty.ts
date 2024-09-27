import { ElementType } from "../types/ElementType";
import { Property, Sides } from "../types/General";
import { Neighbour } from "../types/Neighbout";
import { propertyCheck } from "./propertyCheck";

const opositeSides = {
    top: "bottom",
    right: "left",
    bottom: "top",
    left: "right",
};

export const getElementsBasedOnProperty = (
    neighbours: Neighbour,
    property: Property,
    isEqual: boolean,
    options: ElementType[]
) => {
    const elements = Object.entries(opositeSides).map(([direction, opposite]) =>
        propertyCheck(
            neighbours[direction as Sides],
            options,
            opposite as Sides,
            property,
            isEqual
        )
    );

    const intersection = elements.reduce((previousResult, currentResult) =>
        previousResult.filter((element) => currentResult.includes(element))
    );

    return intersection;
};
