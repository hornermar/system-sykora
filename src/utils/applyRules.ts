import { find } from "lodash";
import { rulesItems } from "../lib/formItems";
import { ElementType } from "../types/ElementType";
import { Neighbour } from "../types/Neighbout";
import { getElementsBasedOnProperty } from "./getElementsBasedOnProperty";
import { selectElement } from "./selectElement";

export const applyRules = (
    rule: number,
    neighbours: Neighbour,
    options: ElementType[]
) => {
    const ruleProperties = find(rulesItems, ({ code }) => code === rule);
    if (!ruleProperties) {
        return;
    }

    /* 
    We say that the colors continue if the color along a side
    of an element is the same as that along the adjoining border of
    the neighboring element.
    */

    const elementsBasedOnColor = getElementsBasedOnProperty(
        neighbours,
        "color",
        ruleProperties.colorContinue,
        options
    );

    /* 
    We say that the shapes continue at the side of an element
    if each half circle open to a side joins a half circle of a
    bordering element to form a complete circle or if two patterns
    join, neither of which is a half circle pen to a side
    */

    const elementsBasedOnShape = getElementsBasedOnProperty(
        neighbours,
        "shape",
        ruleProperties.shapeContinue,
        elementsBasedOnColor
    );

    return selectElement(elementsBasedOnColor, elementsBasedOnShape, options);
};
